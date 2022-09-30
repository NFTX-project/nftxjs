import type { BigNumber } from 'ethers';

export type Asset = {
  id: string;
  tokenId: string;
  assetAddress: string;
  metaUrl: string;
  vaultId: string;
  quantity?: BigNumber;
};

export type AssetMetadata = Asset & {
  name: string;
  traits: Record<string, string | string[]>;
  api: 'covalent' | 'opensea';
  assetName: string;
  openseaSlug: string;
  openseaBlocked: boolean;
  imageUrl: string;
  imagePreviewUrl: string;
  detailUrl: string;
  animationUrl: string;
  backgroundColor: string;
};
