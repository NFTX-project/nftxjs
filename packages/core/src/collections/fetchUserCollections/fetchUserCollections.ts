import config from '@nftx/config';
import type { Address, Vault } from '@nftx/types';
import { addressEqual, getChainConstant } from '@nftx/utils';
import { RESERVOIR_URL } from '@nftx/constants';
import fetchUserCollectionsReservoir from './reservoir';
import fetchSubgraphVaults from '../../vaults/fetchSubgraphVaults';

type FetchUserCollectionsReservoir = typeof fetchUserCollectionsReservoir;

export const makeFetchUserCollections =
  ({
    fetchUserCollectionsReservoir,
  }: {
    fetchUserCollectionsReservoir: FetchUserCollectionsReservoir;
  }) =>
  async ({
    network = config.network,
    userAddress,
    mintable,
    vaults: givenVaults,
  }: {
    network?: number;
    mintable?: boolean;
    userAddress: Address;
    vaults?: Pick<Vault, 'asset'>[];
  }) => {
    if (
      !getChainConstant(RESERVOIR_URL, network, null) ||
      !getChainConstant(config.keys.RESERVOIR, network, null)
    ) {
      return [];
    }

    const allCollections = await fetchUserCollectionsReservoir({
      network,
      offset: 0,
      userAddress,
    });

    if (mintable) {
      const vaults =
        givenVaults ?? (await fetchSubgraphVaults({ network })).vaults;

      return allCollections.filter((collection) => {
        const hasVault = vaults.some((vault) => {
          return addressEqual(vault.asset.id, collection.address);
        });

        return hasVault;
      });
    }

    return allCollections;
  };

export default makeFetchUserCollections({ fetchUserCollectionsReservoir });
