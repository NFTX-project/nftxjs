import { fetchReservesForTokens } from '../../tokens';
import type { Address } from '../../web3/types';
import type { Vault, VaultAddress, VaultHolding, VaultId } from '../types';
import { OPENSEA_COLLECTION } from '@nftx/constants';
import fetchSubgraphVaults from '../fetchSubgraphVaults';
import transformVault from './transformVault';
import { addressEqual } from '../../web3';
import fetchVaultHoldings from '../fetchVaultHoldings';

const isVaultEnabled = (vault: Vault) => {
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

  const reserves = await fetchReservesForTokens({
    network,
    tokenAddresses: data?.vaults?.map(({ id }) => id) ?? [],
  });

  const globalFees = data?.globals?.[0]?.fees;

  let vaults: Vault[] = await Promise.all(
    data?.vaults?.map(async (x): Promise<Vault> => {
      let moreHoldings: VaultHolding[];
      if (x.holdings.length === 1000) {
        const lastId = x.holdings[x.holdings.length - 1].tokenId;
        moreHoldings = await fetchVaultHoldings({
          network,
          vaultAddress: x.id,
          lastId,
        });
      }

      return transformVault({
        globalFees,
        reserves,
        vault: x,
        moreHoldings,
      });
    }) ?? []
  );

  if (vaults.length === 1000) {
    const moreVaults = await fetchVaults({
      network,
      finalised,
      manager,
      vaultAddresses,
      vaultIds,
      retryCount: 0,
      lastId: Number(vaults[vaults.length - 1].vaultId) + 1,
    });
    vaults = [...vaults, ...moreVaults];
  }

  // We only want to filter/sort once we've got all the vaults fetched
  // if lastId > 0 that means we're recursively fetching _more_ vaults
  if (lastId > 0) {
    return vaults;
  }

  // Filter out any vaults that aren't set up for use
  if (enabled) {
    vaults = vaults.filter(isVaultEnabled);
  }

  vaults.sort((a, b) => {
    const tvlB = Number(b.derivedETH) * b.totalHoldings;
    const tvlA = Number(a.derivedETH) * a.totalHoldings;
    return tvlB - tvlA;
  });

  return vaults;
};

export default fetchVaults;
