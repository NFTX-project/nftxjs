import type { Address, TokenId } from './web3';

/**
 * An ERC721 or ERC1155 asset
 */
export type Asset = {
  id: string;
  tokenId: TokenId;
  assetAddress: Address;
  vaultId?: string;
  quantity?: bigint;
  name: string;
  traits: Record<string, string>;
  isFlagged: boolean;
  imageUrl: string;
  imagePreviewUrl: string;
  animationUrl?: string;
  backgroundColor?: string;
};

/** Metadata bouat an ERC collection */
export type Collection = {
  address: Address;
  image: string;
  name: string;
  numDistinctTokensOwned: number;
  symbol: string;
};
