import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import streamUserCollectionAssets from './streamUserCollectionAssets';

type Result = {
  assets: Asset[];
  next: () => Promise<Result>;
};

const fetchUserCollectionAssets = async ({
  network = config.network,
  userAddress,
  assetAddress,
}: {
  network?: number;
  userAddress: string;
  assetAddress: string;
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
