import type { Address, TokenId } from './web3';

/**
 * An ERC721 or ERC1155 asset
 */
export type Asset = {
  id: string;
  tokenId: TokenId;
  assetAddress: Address;
  vaultIds: string[];
  quantity?: bigint;
  name: string;
  traits: Record<string, string>;
  isFlagged: boolean;
  imageUrl: string;
  imagePreviewUrl: string;
  rarity: number;
  rarityRank: number;
  mintable: boolean;
  animationUrl?: string;
  backgroundColor?: string;
};
