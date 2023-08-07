import type { NftxV3Uniswap } from '@nftx/types';

export type LiquidityPoolsResponse = Pick<
  NftxV3Uniswap.Query,
  'liquidityPools'
>;
