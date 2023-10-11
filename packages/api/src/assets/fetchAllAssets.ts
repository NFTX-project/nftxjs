import type { Address, Asset } from '@nftx/types';
import { BadRequestError } from '@nftx/errors';
import streamAssets from './streamAssets';
import type {
  CollectionAssetsArgs,
  UserAssetsArgs,
  VaultAssetsArgs,
} from './fetchAssets';

type Result = Asset[];

function fetchAllAssets(args: Omit<UserAssetsArgs, 'cursor'>): Promise<Result>;
function fetchAllAssets(args: Omit<VaultAssetsArgs, 'cursor'>): Promise<Result>;
function fetchAllAssets(
  args: Omit<CollectionAssetsArgs, 'cursor'>
): Promise<Result>;
function fetchAllAssets({
  assetAddress,
  userAddress,
  vaultId,
  mintable,
  network,
}: {
  network?: number;
  userAddress?: Address;
  vaultId?: string;
  assetAddress?: Address;
  mintable?: boolean;
}): Promise<Result> {
  return new Promise<Result>((res, rej) => {
    const allAssets: Asset[] = [];

    const stream = (() => {
      if (userAddress) {
        return streamAssets({
          userAddress,
          assetAddress,
          mintable,
          network,
          vaultId,
        });
      }
      if (vaultId) {
        return streamAssets({ vaultId, network });
      }
      if (assetAddress) {
        return streamAssets({ assetAddress, network });
      }
      throw new BadRequestError(
        'Must provide userAddress, vaultId, or assetAddress'
      );
    })();

    stream.on('error', rej);
    stream.on('end', () => res(allAssets));
    stream.on('data', (data) => {
      allAssets.push(...data);
    });
  });
}

export default fetchAllAssets;
