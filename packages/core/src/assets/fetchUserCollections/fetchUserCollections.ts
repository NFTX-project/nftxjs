import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { RESERVOIR_URL } from '@nftx/constants';
import fetchUserCollectionsReservoir from './reservoir';

const fetchUserCollections = async ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: Address;
}) => {
  if (
    getChainConstant(RESERVOIR_URL, network, null) &&
    getChainConstant(config.keys.ALCHEMY, network, null)
  ) {
    console.debug('fetching collections from reservoir');
    return fetchUserCollectionsReservoir({ network, offset: 0, userAddress });
  }
  // @TODO do we need a painful and difficult opensea fallback?
  console.debug('no alchemy, no bueno');
  return [];
};

export default fetchUserCollections;
