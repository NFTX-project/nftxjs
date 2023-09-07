import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { RESERVOIR_URL } from '@nftx/constants';
import fetchUserCollectionsReservoir from './reservoir';

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
  }: {
    network?: number;
    userAddress: Address;
  }) => {
    if (
      getChainConstant(RESERVOIR_URL, network, null) &&
      getChainConstant(config.keys.RESERVOIR, network, null)
    ) {
      console.debug('fetching collections from reservoir');
      return fetchUserCollectionsReservoir({ network, offset: 0, userAddress });
    }

    return [];
  };

export default makeFetchUserCollections({ fetchUserCollectionsReservoir });
