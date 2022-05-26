import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import streamUserVaultAssets from './streamUserVaultAssets';

const fetchAllUserVaultAssets = ({
  network = config.network,
  userAddress,
  vaultId,
}: {
  network?: number;
  userAddress: string;
  vaultId?: string;
}) => {
  return new Promise<Asset[]>((res, rej) => {
    const allAssets: Asset[] = [];
    const stream = streamUserVaultAssets({ userAddress, network, vaultId });

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
