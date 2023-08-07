import { OPENSEA_COLLECTION, Zero } from '@nftx/constants';
import fetchSubgraphVaults, { Response } from '../fetchSubgraphVaults';
import transformVault from './transformVault';
import fetchVaultHoldings from '../fetchVaultHoldings';
import config from '@nftx/config';
import { addressEqual, fetchMerkleReference, isMerkleVault } from '@nftx/utils';
import type { Address, MarketplacePrice, Provider, Vault } from '@nftx/types';
import fetchVTokenToEth from './fetchVTokenToEth';
import { priceVaultBuy, priceVaultSell, priceVaultSwap } from '../../prices';
import transformVaultHolding from '../fetchVaultHoldings/transformVaultHolding';

const isVaultEnabled = (vault: Response['vaults'][0]) => {
  // finalized or DAO vaults only
  if (!vault.isFinalized) {
    return false;
  }
  // otherwise has to have following features enabled
  if (!vault.features.enableMint || !vault.features.enableRedeem) {
    return false;
  }
  // if we have a finalised vault, make sure that if it's using OpenSea Collection it has some form of eligibilities set
  if (
    addressEqual(vault.asset.id, OPENSEA_COLLECTION) &&
    !vault.eligibilityModule?.id
  ) {
    return false;
  }
  return true;
};

const fetchMoreHoldings = async ({
  vault,
  network,
}: {
  network: number;
  vault: {
    id: Address;
    holdings: Array<{ tokenId: string }>;
  };
}) => {
  if (vault.holdings.length === 1000) {
    const lastId = vault.holdings[vault.holdings.length - 1].tokenId;
    return fetchVaultHoldings({
      network,
      vaultAddress: vault.id,
      lastId,
    });
  }

  return [];
};

const fetchVaults = async ({
  network = config.network,
  provider,
  vaultAddresses,
  vaultIds,
  manager,
  finalisedOnly = true,
  enabledOnly = true,
  includeEmptyVaults = false,
  lastId = 0,
  retryCount = 0,
}: {
  network?: number;
  provider: Provider;
  vaultAddresses?: Address[];
  vaultIds?: string[];
  includeEmptyVaults?: boolean;
  finalisedOnly?: boolean;
  enabledOnly?: boolean;
  manager?: Address;
  lastId?: number;
  retryCount?: number;
}): Promise<Vault[]> => {
  const data = await fetchSubgraphVaults({
    network,
    finalisedOnly,
    lastId,
    manager,
    includeEmptyVaults,
    retryCount,
    vaultAddresses,
    vaultIds,
  });

  let vaultData = data?.vaults ?? [];
  const globalFees = data?.globals?.[0]?.fees;

  // Filter out any vaults that aren't set up for use
  if (enabledOnly) {
    vaultData = vaultData.filter(isVaultEnabled);
  }

  const vaultPromises =
    vaultData.map(async (x) => {
      const moreHoldings = await fetchMoreHoldings({ network, vault: x });
      const holdings = x.holdings
        .map((holding) => transformVaultHolding(holding))
        .concat(moreHoldings);

      const merkleReference =
        (isMerkleVault(x)
          ? await fetchMerkleReference({ provider, vault: x })
          : null) ?? undefined;

      const vTokenToEth = await fetchVTokenToEth({
        provider,
        vaultAddress: x.id,
      });

      const vault = transformVault({
        globalFees,
        vault: x,
        holdings,
        merkleReference,
        vTokenToEth,
      });

      const pricePromises = new Array(5)
        .fill(null)
        .map(async (_, i): Promise<Vault['prices'][0]> => {
          let buyPrice: MarketplacePrice = {
              feePrice: Zero,
              premiumPrice: Zero,
              price: Zero,
              type: 'buy',
              vTokenPrice: Zero,
            },
            sellPrice: MarketplacePrice = {
              feePrice: Zero,
              premiumPrice: Zero,
              price: Zero,
              type: 'sell',
              vTokenPrice: Zero,
            },
            swapPrice: MarketplacePrice = {
              feePrice: Zero,
              premiumPrice: Zero,
              price: Zero,
              type: 'swap',
              vTokenPrice: Zero,
            };
          const tokenIds = new Array(i + 1)
            .fill(null)
            .map((_, i) => `${i}` as `${number}`);

          try {
            buyPrice = await priceVaultBuy({
              network,
              vault,
              holdings,
              bypassIndexedPrice: true,
              tokenIds,
            });
          } catch {
            console.warn(`Couldn't get buy price for vault ${vault.vaultId}`);
          }

          try {
            sellPrice = await priceVaultSell({
              network,
              vault,
              tokenIds,
              bypassIndexedPrice: true,
            });
          } catch {
            console.warn(`Couldn't get sell price for vault ${vault.vaultId}`);
          }

          try {
            swapPrice = await priceVaultSwap({
              vault,
              buyTokenIds: tokenIds,
              holdings,
              sellTokenIds: tokenIds,
              bypassIndexedPrice: true,
            });
          } catch {
            console.warn(`Couldn't get swap price for vault ${vault.vaultId}`);
          }

          const prices = {
            redeem: buyPrice,
            mint: sellPrice,
            swap: swapPrice,
          };

          return prices;
        });

      const prices = (await Promise.all(pricePromises)) as Vault['prices'];

      return { ...vault, prices };
    }) ?? [];

  const vaults = await Promise.all(vaultPromises);

  // We only want to filter/sort once we've got all the vaults fetched
  // if lastId > 0 that means we're recursively fetching _more_ vaults
  if (lastId > 0) {
    return vaults;
  }

  return vaults;
};

export default fetchVaults;
