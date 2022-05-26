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
  isSpam: boolean;
  media: [
    {
      raw: string;
      gateway: string;
      thumbnail: string;
      format: string;
      bytes: number;
    }
  ];
  name: string;
  numDistinctTokensOwned: number;
  opensea?: {
    floorPrice: number;
    collectionName: string;
    safelistRequestStatus: string;
    imageUrl: string;
    description: string;
    lastIngestedAt: string;
  };
  symbol: string;
  tokenId: string;
  tokenType: 'ERC721' | 'ERC1155' | 'UNKNOWN';
  totalBalance: number;
  totalSupply: string;
};
