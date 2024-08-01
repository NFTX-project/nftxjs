import config from '@nftx/config';
import type { AssetMetadata } from '@nftx/types';

export type Response = {
  animation_url: null | string;
  api_response: 'covalent' | 'opensea';
  asset_contract: {
    address: string;
    name: string;
  };
  background_color?: null | string;
  collection: {
    slug: string;
    description?: null | string;
  };
  id: number;
  image_preview_url: string;
  image_url: string;
  name: string | null;
  objectID: string;
  permalink: string;
  supports_wyvern?: boolean;
  token_id: string;
  traits: { [key: string]: string | [] };
};

/**
 * Fetches metadata for a given {@link @nftx/types!Asset} meta url.
 * You can get the meta url from asset.metaUrl
 * @returns Promise<{@link @nftx/types!AssetMetadata}>
 */
const fetchAssetMetadata = async (args: {
  assetAddress: string;
  tokenId: string;
  network?: number;
}) => {
  const { assetAddress, tokenId, network = config.network } = args;
  const metaUrl = `https://metadata-api.nftx.xyz/asset/${assetAddress}/${tokenId}?chainId=${network}`;
  const response = await fetch(metaUrl);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const data: Response = await response.json();
  if (!data?.id) {
    throw new Error(JSON.stringify(data));
  }

  const meta: AssetMetadata = {
    id: `${assetAddress}/${tokenId}`,
    assetAddress,
    metaUrl,
    vaultId: null,
    quantity: null,
    name: data.name,
    api: data.api_response,
    traits: data.traits,
    tokenId: data.token_id,
    assetName: data.asset_contract.name,
    openseaSlug: data.collection?.slug,
    imageUrl: data.image_url,
    imagePreviewUrl: data.image_preview_url,
    openseaBlocked: data.supports_wyvern === false,
    animationUrl: data.animation_url?.includes('.mp4')
      ? data.animation_url
      : null,
    backgroundColor: data.background_color ? `#${data.background_color}` : null,
    detailUrl:
      data.api_response === 'covalent'
        ? `https://looksrare.org/collections/${data.asset_contract.address.toLowerCase()}/${
            data.token_id
          }`
        : `https://opensea.io/assets/${data.asset_contract.address}/${data.token_id}`,
  };

  return meta;
};

export default fetchAssetMetadata;