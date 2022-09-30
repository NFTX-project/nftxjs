import config from '@nftx/config';
import type { Asset, AssetMetadata } from '@nftx/types';
import { queryApi } from '../utils';

const fetchAsset = ({
  network = config.network,
  assetAddress,
  tokenId,
}: {
  network?: number;
  assetAddress: string;
  tokenId: string;
}) => {
  return queryApi<Asset & AssetMetadata>({
    url: `/${network}/assets/${assetAddress}/${tokenId}`,
  });
};

export default fetchAsset;
