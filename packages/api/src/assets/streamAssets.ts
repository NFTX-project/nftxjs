import config from '@nftx/config';
import Stream, { type IStream } from './Stream';
import type { Address, Asset } from '@nftx/types';
import fetchAssets, {
  CollectionAssetsArgs,
  UserAssetsArgs,
  VaultAssetsArgs,
} from './fetchAssets';

/** Stream assets owned by a user */
function streamAssets(args: Omit<UserAssetsArgs, 'cursor'>): IStream<Asset[]>;
/** Stream assets for a specific vault */
function streamAssets(args: Omit<VaultAssetsArgs, 'cursor'>): IStream<Asset[]>;
/** Stream assets for all vaults for a specific collection */
function streamAssets(
  args: Omit<CollectionAssetsArgs, 'cursor'>
): IStream<Asset[]>;
function streamAssets({
  network = config.network,
  assetAddress,
  mintable,
  userAddress,
  vaultId,
}: {
  network?: number;
  userAddress?: Address;
  vaultId?: string;
  mintable?: boolean;
  assetAddress?: Address;
}): IStream<Asset[]> {
  let cursor: string | undefined;

  const stream = new Stream<Asset[]>();

  stream.on('read', async () => {
    try {
      const result = await (() => {
        if (userAddress) {
          return fetchAssets({
            userAddress,
            assetAddress,
            cursor,
            mintable,
            network,
            vaultId,
          });
        }
        if (vaultId) {
          return fetchAssets({ vaultId, cursor, network });
        }
        if (assetAddress) {
          return fetchAssets({ assetAddress, cursor, network });
        }
        throw new Error();
      })();

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
}

export default streamAssets;
