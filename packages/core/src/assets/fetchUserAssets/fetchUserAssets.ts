import config from '@nftx/config';
import type { Address, Asset, Provider, Vault } from '@nftx/types';
import { fetchVaults } from '../../vaults';
import fetchAssetsFromReservoir from './fetchAssetsFromReservoir';

type FetchVaults = typeof fetchVaults;
type FetchAssetsFromReservoir = typeof fetchAssetsFromReservoir;

const isDefined = <T>(x: T | undefined): x is T => x != null;

const makeFetchUserAssets = ({
  fetchAssetsFromReservoir,
  fetchVaults,
}: {
  fetchVaults: FetchVaults;
  fetchAssetsFromReservoir: FetchAssetsFromReservoir;
}) => {
  /** Fetch a user's assets from reservoir */
  async function fetchUserAssets({
    assetAddresses,
    userAddress,
    network = config.network,
    vaultIds,
    cursor,
    provider,
    vaults: givenVaults,
  }: {
    network?: number;
    assetAddresses?: Address[];
    vaultIds?: string[];
    userAddress: Address;
    cursor?: string;
    provider: Provider;
    vaults?: Pick<
      Vault,
      'asset' | 'features' | 'eligibilityModule' | 'vaultId'
    >[];
  }): Promise<{
    assets: Asset[];
    cursor?: string;
  }> {
    const vaults = givenVaults ?? (await fetchVaults({ provider, network }));

    if (vaultIds) {
      assetAddresses = vaultIds
        .map((vaultId) => vaults.find((v) => v.vaultId === vaultId)?.asset.id)
        .filter(isDefined);
    }

    if (assetAddresses) {
      assetAddresses = assetAddresses.map((x) => x.toLowerCase() as Address);
    }

    if (assetAddresses && assetAddresses.length === 0) {
      return { assets: [] };
    }

    const { assets: assets, cursor: newCursor } =
      await fetchAssetsFromReservoir({
        assetAddresses,
        cursor,
        network,
        userAddress,
        provider,
        vaults,
      });

    return { assets, cursor: newCursor };
  }

  return fetchUserAssets;
};

export default makeFetchUserAssets({
  fetchAssetsFromReservoir,
  fetchVaults,
});
