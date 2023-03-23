import config from '@nftx/config';
import type { Address, Asset } from '@nftx/types';
import streamUserCollectionAssets from './streamUserCollectionAssets';

type Result = {
  assets: Asset[];
  next?: () => Promise<Result>;
};

/**
 * Get a list of a user's assets for a given collection.
 * Returns assets plus a next function to fetch the next set of assets.
 * @example
 * let { assets, next } = await fetchUserCollectionAssets({ userAddress, assetAddress });
 * // Do something with assets
 *
 * while (next) {
 *   const result = await next();
 *   const moreAssets = result.assets;
 *   // Do something with moreAssets
 *   next = results.next;
 * }
 */
const fetchUserCollectionAssets = async ({
  network = config.network,
  userAddress,
  assetAddress,
}: {
  network?: number;
  userAddress: Address;
  assetAddress: Address;
}) => {
  const stream = streamUserCollectionAssets({
    userAddress,
    network,
    assetAddress,
  });

  const run = async (): Promise<Result> => {
    const assets = await stream.read();
    const next = stream.ended ? undefined : run;

    return { assets, next };
  };

  return run();
};

export default fetchUserCollectionAssets;
