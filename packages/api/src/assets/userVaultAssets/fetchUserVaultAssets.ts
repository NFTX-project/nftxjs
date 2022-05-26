import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import streamUserVaultAssets from './streamUserVaultAssets';

type Result = {
  assets: Asset[];
  next: () => Promise<Result>;
};

const fetchUserVaultAssets = async ({
  network = config.network,
  userAddress,
  vaultId,
}: {
  network?: number;
  userAddress: string;
  vaultId?: string;
}) => {
  const stream = streamUserVaultAssets({ userAddress, network, vaultId });

  const run = async (): Promise<Result> => {
    const assets = await stream.read();
    const next = stream.ended ? undefined : run;

    return { assets, next };
  };

  return run();
};

export default fetchUserVaultAssets;
