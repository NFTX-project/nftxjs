import config from '@nftx/config';
import type { Address, Asset } from '@nftx/types';
import streamUserVaultAssets from './streamUserVaultAssets';

/**
 * Get a list of a user's assets for a given vault.
 * Returns a promise that resolves once all assets have been fetched.
 * @example
 * const assets = await fetchAllUserVaultAssets({ userAddress, vaultId });
 */
const fetchAllUserVaultAssets = ({
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
  return new Promise<Asset[]>((res, rej) => {
    const allAssets: Asset[] = [];
    const stream = streamUserVaultAssets({
      userAddress,
      network,
      vaultId,
      mintable,
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

export default fetchAllUserVaultAssets;
