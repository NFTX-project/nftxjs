import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import { queryApi } from '../../utils';
import Stream, { type IStream } from '../Stream';

type Response = { assets: Asset[]; cursor: string };

const getUrl = ({
  network,
  userAddress,
  assetAddress,
}: {
  assetAddress: string;
  network: number;
  userAddress: string;
}) => {
  return `/${network}/users/${userAddress}/assets/${assetAddress}`;
};

/**
 * Get a list of a user's NFTs for a given collection.
 * Returns a stream that should be consumed by either subscribing to data or manually reading.
 * @example
 * const stream = streamUserCollectionAssets({ userAddress, assetAddress });
 * while (!stream.ended) {
 *   const moreAssets = await stream.read();
 *   // Do something with assets
 * }
 * @example
 * const stream = streamUserCollectionAssets({ userAddress, assetAddress });
 * stream.on('data', (moreAssets) => {
 *   // Do something with assets
 * });
 * stream.on('end', () => {
 *   // Done
 * });
 */
const streamUserCollectionAssets = ({
  network = config.network,
  userAddress,
  assetAddress,
}: {
  network?: number;
  userAddress: string;
  assetAddress: string;
}): IStream<Asset[]> => {
  let cursor: string;

  const stream = new Stream<Asset[]>();

  stream.on('read', async () => {
    try {
      const url = getUrl({ network, userAddress, assetAddress });

      const result = await queryApi<Response>({
        url,
        query: { cursor },
      });
      cursor = result.cursor;
      if (cursor) {
        stream.write(result.assets);
      } else {
        stream.end(result.assets);
      }
    } catch (e) {
      stream.error(e);
    }
  });

  return stream;
};

export default streamUserCollectionAssets;
