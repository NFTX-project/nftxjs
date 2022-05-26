import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import { queryApi } from '../../utils';
import Stream, { type IStream } from '../Stream';

type Response = { assets: Asset[]; cursor: string };

const getUrl = ({
  network,
  userAddress,
  vaultId,
}: {
  vaultId: string;
  network: number;
  userAddress: string;
}) => {
  if (vaultId) {
    return `/${network}/users/${userAddress}/vaults/${vaultId}/assets`;
  }
  return `/${network}/users/${userAddress}/assets`;
};

const streamUserVaultAssets = ({
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
      const url = getUrl({ network, userAddress, vaultId });

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

export default streamUserVaultAssets;
