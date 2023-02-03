import config from '@nftx/config';
import { getChainConstant } from '@nftx/utils';
import fetchAssetsAlchemy from './fetchAssetsAlchemy';
import fetchAssetsSubgraph from './fetchAssetsSubgraph';

const fetchUserCollectionAssets = async ({
  network,
  assetAddresses,
  userAddress,
  cursor,
}: {
  network: number;
  userAddress: string;
  cursor?: string;
  assetAddresses: string[];
}) => {
  if (
    getChainConstant(config.urls.ALCHEMY_URL, network, null) &&
    getChainConstant(config.keys.ALCHEMY, network, null)
  ) {
    console.debug('fetching assets from alchemy');
    try {
      return await fetchAssetsAlchemy({
        assetAddresses,
        cursor,
        network,
        userAddress,
      });
    } catch (e) {
      if (e.message?.includes?.('falling back to subgraph')) {
        console.info(e.message);
      } else if (cursor == null) {
        console.info('Alchemy failed, falling back to subgraph');
      } else {
        throw e;
      }
    }
  }

  console.debug('fetching assets from subgraph');
  return fetchAssetsSubgraph({
    assetAddresses,
    network,
    userAddress,
    cursor,
  });
};

export default fetchUserCollectionAssets;
