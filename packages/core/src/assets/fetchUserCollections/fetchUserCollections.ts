import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';
import fetchUserCollectionsAlchemy from './alchemy';

const fetchUserCollections = async ({
  network,
  userAddress,
}: {
  network: number;
  userAddress: string;
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
