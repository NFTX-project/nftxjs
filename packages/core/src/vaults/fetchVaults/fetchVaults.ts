import { OPENSEA_COLLECTION } from '@nftx/constants';
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
import type { Address, Collection, Provider, Vault } from '@nftx/types';
import populateVaultPrices from './populateVaultPrices';
import { fetchCollection } from '../../collections';

type FetchSubgraphVaults = typeof fetchSubgraphVaults;
type FetchVaultHoldings = typeof fetchVaultHoldings;
type FetchMerkleReference = typeof fetchMerkleReference;
type FetchVTokenToEth = typeof fetchVTokenToEth;
type FetchCollection = typeof fetchCollection;
type PopulateVaultPrices = typeof populateVaultPrices;

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

export const makeFetchVaults =
  ({
    fetchCollection,
    fetchMerkleReference,
    fetchSubgraphVaults,
    fetchVTokenToEth,
    fetchVaultHoldings,
    populateVaultPrices,
  }: {
    fetchSubgraphVaults: FetchSubgraphVaults;
    fetchVaultHoldings: FetchVaultHoldings;
    fetchMerkleReference: FetchMerkleReference;
    fetchVTokenToEth: FetchVTokenToEth;
    fetchCollection: FetchCollection;
    populateVaultPrices: PopulateVaultPrices;
  }) =>
  async ({
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
        const merkleData = {
          eligibilityModule: x.eligibilityModule
            ? { ...x.eligibilityModule, id: x.eligibilityModule.id as Address }
            : undefined,
        };

        const merkleReference =
          (isMerkleVault(merkleData)
            ? await fetchMerkleReference({ provider, vault: merkleData })
            : null) ?? undefined;

        const vTokenToEth = await fetchVTokenToEth({
          provider,
          vaultAddress: x.id as Address,
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

const fetchVaults = makeFetchVaults({
  fetchCollection,
  fetchMerkleReference,
  fetchSubgraphVaults,
  fetchVaultHoldings,
  fetchVTokenToEth,
  populateVaultPrices,
});

export default fetchVaults;
