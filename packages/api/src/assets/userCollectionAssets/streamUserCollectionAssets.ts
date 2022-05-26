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
