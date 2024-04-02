import config from '@nftx/config';
import type { Address, Vault } from '@nftx/types';
import { addressEqual, getChainConstant } from '@nftx/utils';
import { RESERVOIR_URL } from '@nftx/constants';
import fetchUserCollectionsReservoir from './reservoir';
import fetchSubgraphVaults from '../../vaults/fetchSubgraphVaults';
import { Collection } from '@nftx/types';
import { Addresses } from '../utils/phishing/json/Addresses';
import { Domains } from '../utils/phishing/json/Domains';

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

    const unfilteredCollections = await fetchUserCollectionsReservoir({
      network,
      offset: 0,
      userAddress,
    });

    // Filter out phishing addresses and names as per: https://github.com/scamsniffer/scam-database/
    const allCollections = unfilteredCollections.filter((c: Collection) => 
      !Addresses.includes(c.address) &&
      !Domains.includes(c.name))

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
