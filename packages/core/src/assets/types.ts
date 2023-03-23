import type { Address } from '@nftx/types';

export type Asset = {
  id: string;
  tokenId: `${number}`;
  assetAddress: Address;
  metaUrl: string;
  quantity?: bigint;
  vaultId?: string;
};

export type AssetMetadata = {
  name: string;
  traits: Record<string, string | string[]>;
  api: 'covalent' | 'opensea';
  tokenId: `${number}`;
  assetName: string;
  openseaSlug: string;
  openseaBlocked: boolean;
  imageUrl: string;
  imagePreviewUrl: string;
  detailUrl: string;
  animationUrl: string;
  backgroundColor: string;
};
