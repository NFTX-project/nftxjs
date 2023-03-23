import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import fetchUserCollectionsAlchemy from './alchemy';

const fetchUserCollections = async ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: Address;
}) => {
  if (
    getChainConstant(config.urls.ALCHEMY_URL, network, null) &&
    getChainConstant(config.keys.ALCHEMY, network, null)
  ) {
    console.debug('fetching collections from alchemy');
    return fetchUserCollectionsAlchemy({ network, userAddress });
  }
  // @TODO do we need a painful and difficult opensea fallback?
  console.debug('no alchemy, no bueno');
  return [];
};

export default fetchUserCollections;
