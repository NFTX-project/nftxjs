import type { BigNumber } from '@ethersproject/bignumber';

export type Asset = {
  id: string;
  tokenId: string;
  assetAddress: string;
  metaUrl: string;
  quantity?: BigNumber;
  vaultId?: string;
};

export type AssetMetadata = {
  name: string;
  traits: Record<string, string | string[]>;
  api: 'covalent' | 'opensea';
  tokenId: string;
  assetName: string;
  openseaSlug: string;
  openseaBlocked: boolean;
  imageUrl: string;
  imagePreviewUrl: string;
  detailUrl: string;
  animationUrl: string;
  backgroundColor: string;
};

export type Collection = {
  address: string;
  totalBalance: number;
  numDistinctTokensOwned: number;
  isSpam: boolean;
  tokenId: string;
  name: string;
  symbol: string;
  tokenType: 'ERC721' | 'ERC1155';
};
