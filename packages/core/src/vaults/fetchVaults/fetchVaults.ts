import { fetchReservesForTokens } from '../../tokens';
import type { Address } from '../../web3/types';
import type { Vault, VaultAddress, VaultId } from '../types';
import { OPENSEA_COLLECTION } from '@nftx/constants';
import fetchSubgraphVaults, { Response } from '../fetchSubgraphVaults';
import transformVault from './transformVault';
import { addressEqual } from '../../web3';
import fetchVaultHoldings from '../fetchVaultHoldings';

const isVaultEnabled = (vault: Response['vaults'][0]) => {
  // finalized or DAO vaults only
  if (!vault.isFinalized) {
    return false;
  }
  // otherwise has to have following features enabled
  if (
    !vault.features.enableMint ||
    (!vault.features.enableRandomRedeem && !vault.features.enableTargetRedeem)
  ) {
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
  vault: { id: VaultAddress; holdings: Array<{ tokenId: string }> };
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

const fetchMoreVaults = async ({
  vaults,
  network,
  finalised,
  manager,
  vaultAddresses,
  vaultIds,
}: {
  vaults: Vault[];
  network: number;
  finalised: boolean;
  manager: Address;
  vaultAddresses: VaultAddress[];
  vaultIds: VaultId[];
}) => {
  if (vaults.length === 1000) {
    const lastId = Number(vaults[vaults.length - 1].vaultId) + 1;

    return fetchVaults({
      network,
      finalised,
      manager,
      vaultAddresses,
      vaultIds,
      retryCount: 0,
      lastId,
    });
  }

  return [];
};

const fetchVaults = async ({
  network,
  vaultAddresses,
  vaultIds,
  manager,
  finalised,
  enabled,
  minimumHoldings,
  lastId = 0,
  retryCount = 0,
}: {
  network: number;
  vaultAddresses?: VaultAddress[];
  vaultIds?: VaultId[];
  minimumHoldings?: number;
  finalised?: boolean;
  enabled?: boolean;
  manager?: Address;
  lastId?: number;
  retryCount?: number;
}): Promise<Vault[]> => {
  const data = await fetchSubgraphVaults({
    network,
    finalised,
    lastId,
    manager,
    minimumHoldings,
    retryCount,
    vaultAddresses,
    vaultIds,
  });

  let vaultData = data?.vaults ?? [];
  const globalFees = data?.globals?.[0]?.fees;

  // Filter out any vaults that aren't set up for use
  if (enabled) {
    vaultData = vaultData.filter(isVaultEnabled);
  }

  const reserves = await fetchReservesForTokens({
    network,
    tokenAddresses: vaultData.map(({ id }) => id),
  });

  const vaultPromises =
    vaultData.map(async (x) => {
      const moreHoldings = await fetchMoreHoldings({ network, vault: x });

      return transformVault({ globalFees, reserves, vault: x, moreHoldings });
    }) ?? [];

  let vaults = await Promise.all(vaultPromises);

  vaults = [
    ...vaults,
    ...(await fetchMoreVaults({
      vaults,
      finalised,
      manager,
      network,
      vaultAddresses,
      vaultIds,
    })),
  ];

  // We only want to filter/sort once we've got all the vaults fetched
  // if lastId > 0 that means we're recursively fetching _more_ vaults
  if (lastId > 0) {
    return vaults;
  }

  vaults.sort((a, b) => {
    const tvlB = Number(b.derivedETH) * b.totalHoldings;
    const tvlA = Number(a.derivedETH) * a.totalHoldings;
    return tvlB - tvlA;
  });

  return vaults;
};

export default fetchVaults;
