import config from '@nftx/config';
import type { Asset } from '@nftx/types';
import streamUserCollectionAssets from './streamUserCollectionAssets';

const fetchAllUserCollectionAssets = ({
  network = config.network,
  userAddress,
  assetAddress,
}: {
  network?: number;
  userAddress: string;
  assetAddress: string;
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
