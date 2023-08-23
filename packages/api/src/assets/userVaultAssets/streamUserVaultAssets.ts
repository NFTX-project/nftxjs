import config from '@nftx/config';
import type { Address, Asset } from '@nftx/types';
import { queryApi } from '../../utils';
import Stream, { type IStream } from '../Stream';

type Response = { assets: Asset[]; cursor: string };

const getUrl = ({ network }: { network: number }) => {
  return `/${network}/assets`;
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
  mintable = true,
}: {
  network?: number;
  userAddress: Address;
  vaultId?: string;
  mintable?: boolean;
}): IStream<Asset[]> => {
  let cursor: string;

  const stream = new Stream<Asset[]>();

  stream.on('read', async () => {
    try {
      const url = getUrl({ network });

      const result = await queryApi<Response>({
        url,
        query: { cursor, userAddress, vaultId, mintable },
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
