import type { Address, Asset } from '@nftx/types';
import { queryApi } from '../utils';

const fetchAsset = ({
  assetAddress,
  network,
  tokenId,
}: {
  network: number;
  assetAddress: Address;
  tokenId: `${number}`;
}) => {
  return queryApi<Asset>({
    url: `/${network}/assets/${assetAddress}/${tokenId}`,
  });
};

export default fetchAsset;
