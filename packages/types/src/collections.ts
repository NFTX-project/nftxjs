import type { Address } from './web3';

/** Metadata sbouy an ERC collection */
export type Collection = {
  address: Address;
  image: string;
  name: string;
  symbol: string;
  slug: string;
  banner: string;
  discordUrl: string;
  externalUrl: string;
  twitterUsername: string;
  floorPrice: bigint;
  standard: 'ERC721' | 'ERC1155';
};
