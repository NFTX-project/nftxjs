import { OPENSEA_COLLECTION, Zero } from '@nftx/constants';
import fetchSubgraphVaults, { Response } from '../fetchSubgraphVaults';
import transformVault from './transformVault';
import fetchVaultHoldings from '../fetchVaultHoldings';
import config from '@nftx/config';
import {
  addressEqual,
  fetchMerkleReference,
  isMerkleVault,
  fetchVTokenToEth,
} from '@nftx/utils';
import type {
  Address,
  MarketplacePrice,
  Provider,
  Vault,
  VaultHolding,
} from '@nftx/types';
import { priceVaultBuy, priceVaultSell, priceVaultSwap } from '../../prices';
import populateVaultPrices from './populateVaultPrices';

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

const fetchVaults = async ({
  network = config.network,
  provider,
  vaultAddresses,
  vaultIds,
  manager,
  enabledOnly = true,
}: {
  network?: number;
  provider: Provider;
  vaultAddresses?: Address[];
  vaultIds?: string[];
  enabledOnly?: boolean;
  manager?: Address;
}): Promise<Vault[]> => {
  const data = await fetchSubgraphVaults({
    network,
    manager,
    vaultAddresses,
    vaultIds,
  });

  let vaultData = data?.vaults ?? [];
  const globalFees = data?.globals?.[0]?.fees;

  // Filter out any vaults that aren't set up for use
  if (enabledOnly) {
    vaultData = vaultData.filter(isVaultEnabled);
  }

  const allHoldings = await fetchVaultHoldings({
    network,
    vaultIds: vaultData.map((v) => v.vaultId),
  });

  const vaultPromises =
    vaultData.map(async (x) => {
      const y = {
        id: x.id as Address,
        holdings: x.holdings.map((h) => ({ ...h, tokenId: `${h.tokenId}` })),
        eligibilityModule: x.eligibilityModule
          ? { ...x.eligibilityModule, id: x.eligibilityModule.id as Address }
          : undefined,
      };

      const merkleReference =
        (isMerkleVault(y)
          ? await fetchMerkleReference({ provider, vault: y })
          : null) ?? undefined;

      const vTokenToEth = await fetchVTokenToEth({
        provider,
        vaultAddress: y.id,
      });

      const vault = transformVault({
        globalFees,
        vault: x,
        merkleReference,
        vTokenToEth,
      });

      const holdings = allHoldings.filter((h) => h.vaultId === x.vaultId);

      await populateVaultPrices(vault, network, holdings, provider);

      return vault;
    }) ?? [];

  const vaults = await Promise.all(vaultPromises);

  return vaults;
};

export default fetchVaults;
