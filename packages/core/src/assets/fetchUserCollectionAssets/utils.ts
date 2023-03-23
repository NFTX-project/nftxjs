import type { Asset } from '@nftx/types';

type Item = Pick<Asset, 'assetAddress' | 'tokenId' | 'quantity'>;

export const processAssetItems = async ({
  items,
  network,
}: {
  items: Item[];
  network: number;
}) => {
  return items.map((item) => {
    const asset: Asset = {
      id: `${item.assetAddress}/${item.tokenId}`,
      assetAddress: item.assetAddress,
      tokenId: item.tokenId,
      metaUrl: `https://api.nftx.xyz/asset/${item.assetAddress}/${item.tokenId}?chainId=${network}`,
      quantity: item.quantity,
    };

    return asset;
  });
};
