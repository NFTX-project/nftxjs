import type { Address, Asset } from '@nftx/types';
import config from '@nftx/config';
import { queryApi } from '../utils';

export type UserAssetsArgs = {
  network?: number;
  cursor?: string;
  userAddress: Address;
  /** If set, only assets that can be minted into this vault will be returned. */
  vaultId?: string;
  /** If true, only assets that can be minted into a vault will be returned. Otherwise, all assets are returend. */
  mintable?: boolean;
  /** If true, only assets from this collection will be returned */
  assetAddress?: Address;
};
export type VaultAssetsArgs = {
  network?: number;
  cursor?: string;
  vaultId: string;
};
export type CollectionAssetsArgs = {
  network?: number;
  cursor?: string;
  assetAddress: Address;
};

type FetchAssetsResult = { assets: Asset[]; cursor: string | undefined };

function fetchAssets(args: UserAssetsArgs): Promise<FetchAssetsResult>;
function fetchAssets(args: VaultAssetsArgs): Promise<FetchAssetsResult>;
function fetchAssets(args: CollectionAssetsArgs): Promise<FetchAssetsResult>;
function fetchAssets({
  assetAddress,
  userAddress,
  vaultId,
  mintable,
  network = config.network,
  cursor,
}: {
  network?: number;
  userAddress?: Address;
  vaultId?: string;
  assetAddress?: Address;
  mintable?: boolean;
  cursor?: string;
}): Promise<FetchAssetsResult> {
  const url = `/${network}/assets`;
  const query = { cursor, userAddress, vaultId, mintable, assetAddress };

  return queryApi<FetchAssetsResult>({ url, query });
}

export default fetchAssets;
