import type { Address, BigIntString, TokenId } from './web3';

/**
 * An ERC721 or ERC1155 asset
 */
export type Asset = {
  id: string;
  tokenId: TokenId;
  assetAddress: Address;
  /**
   * URL path to fetch the asset's metadata
   * {@link AssetMetadata}
   */
  metaUrl: string;
  vaultId?: string;
  quantity?: bigint;
};

/**
 * Metadata about an ERC asset pulled from covalent or opensea
 */
export type AssetMetadata = Asset & {
  name?: string;
  traits: Record<string, string | string[]>;
  api: 'covalent' | 'opensea';
  assetName: string;
  openseaSlug: string;
  openseaBlocked: boolean;
  imageUrl: string;
  imagePreviewUrl: string;
  detailUrl: string;
  animationUrl?: string;
  backgroundColor?: string;
};

/** Metadata bouat an ERC collection */
export type Collection = {
  address: Address;
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
  tokenId: TokenId;
  tokenType: 'ERC721' | 'ERC1155' | 'UNKNOWN';
  totalBalance: number;
  totalSupply: BigIntString;
};
