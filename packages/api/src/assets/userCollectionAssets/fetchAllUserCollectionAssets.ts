import config from '@nftx/config';
import type { Address, Asset } from '@nftx/types';
import streamUserCollectionAssets from './streamUserCollectionAssets';

/**
 * Get a list of a user's assets for a given collection.
 * Returns a promise that resolves once all assets have been fetched.
 * @example
 * const assets = await fetchAllUserCollectionAssets({ userAddress, assetAddress });
 */
const fetchAllUserCollectionAssets = ({
  network = config.network,
  userAddress,
  assetAddress,
}: {
  network?: number;
  userAddress: Address;
  assetAddress: Address;
}) => {
  return new Promise<Asset[]>((res, rej) => {
    const allAssets: Asset[] = [];
    const stream = streamUserCollectionAssets({
      userAddress,
      network,
      assetAddress,
    });

    stream.on('data', (data) => {
      allAssets.push(...data);
    });
    stream.on('error', rej);
    stream.on('end', () => {
      res(allAssets);
    });
  });
};

export default fetchAllUserCollectionAssets;
