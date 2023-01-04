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

/**
 * Get a list of a user's NFTs for a given vault
 * Returns a stream that should be consumed by either subscribing to data or manually reading.
 * @example
 * const stream = streamUserVaultAssets({ userAddress, vaultId });
 * while (!stream.ended) {
 *   const assets = await stream.read();
 *   // Do something with assets
 * }
 * @example
 * const stream = streamUserVaultAssets({ userAddress, vaultId });
 * stream.on('data', (assets) => {
 *   // Do something with assets
 * });
 * stream.on('end', () => {
 *   // Done
 * });
 */
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
