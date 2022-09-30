import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import streamUserAssets from './streamUserAssets';

type Result = {
  assets: Asset[];
  next: () => Promise<Result>;
};

const fetchUserAssets = async ({
  network = config.network,
  userAddress,
  vaultId,
}: {
  network?: number;
  userAddress: string;
  vaultId?: string;
}) => {
  const stream = streamUserAssets({ userAddress, network, vaultId });

  const run = async (): Promise<Result> => {
    const assets = await stream.read();
    const next = stream.ended ? undefined : run;

    return { assets, next };
  };

  return run();
};

export default fetchUserAssets;
