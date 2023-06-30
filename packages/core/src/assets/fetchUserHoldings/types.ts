import type { Address } from '@nftx/types';

export type Holding = {
  assetAddress: Address;
  tokenId: string;
  quantity?: bigint;
};
