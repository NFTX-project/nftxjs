import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import { queryApi } from '../utils';
import Stream, { type IStream } from './Stream';

type Response = { assets: Asset[]; cursor: string };

const streamUserAssets = ({
  network = config.network,
  userAddress,
  vaultId,
}: {
  network?: number;
  userAddress: string;
  vaultId?: string;
}): IStream<Asset[]> => {
  let cursor: string;

  const stream = new Stream<Asset[]>();

  stream.on('read', async () => {
    try {
      const url = vaultId
        ? `/${network}/users/${userAddress}/vaults/${vaultId}/assets`
        : `/${network}/users/${userAddress}/assets`;

      const result = await queryApi<Response>({
        url,
        query: { cursor },
      });
      stream.write(result.assets);
      if (result.cursor) {
        cursor = result.cursor;
      } else {
        stream.end();
      }
    } catch (e) {
      stream.error(e);
    }
  });

  return stream;
};

export default streamUserAssets;
