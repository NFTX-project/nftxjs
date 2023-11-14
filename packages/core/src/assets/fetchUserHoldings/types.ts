import type { Address } from '@nftx/types';

export type Holding = {
  assetAddress: Address;
  tokenId: `${number}`;
  quantity?: bigint;
};
