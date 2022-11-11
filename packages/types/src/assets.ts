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
