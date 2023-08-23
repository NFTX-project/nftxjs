import config from '@nftx/config';
import type { Address, Asset } from '@nftx/types';
import streamUserVaultAssets from './streamUserVaultAssets';

type Result = {
  assets: Asset[];
  next?: () => Promise<Result>;
};

/**
 * Get a list of a user's NFTs for a given vault
 * Returns assets plus a next function to fetch the next set of assets.
 * @example
 * let { assets, next } = await fetchUserVaultAssets({ userAddress, vaultId });
 * // Do something with assets
 *
 * while (next) {
 *   const result = await next();
 *   const moreAssets = result.assets;
 *   // Do something with moreAssets
 *   next = results.next;
 * }
 */
const fetchUserVaultAssets = async ({
  network = config.network,
  userAddress,
  vaultId,
  mintable,
}: {
  network?: number;
  userAddress: Address;
  vaultId?: string;
  mintable?: boolean;
}) => {
  const stream = streamUserVaultAssets({
    userAddress,
    network,
    vaultId,
    mintable,
  });

  const run = async (): Promise<Result> => {
    const assets = await stream.read();
    const next = stream.ended ? undefined : run;

    return { assets, next };
  };

  return run();
};

export default fetchUserVaultAssets;
