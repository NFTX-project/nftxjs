import type { Address, LiquidityPool } from '@nftx/types';

type FeeType = LiquidityPool['fees'][0]['feeType'];

export type LiquidityPoolsResponse = {
  liquidityPools: {
    id: Address;
    name: string;
    fees: { id: Address; feeType: FeeType; percentage: `${number}` }[];
    tick: string;
    totalLiquidity: `${number}`;
    activeLiquidity: `${number}`;
    inputTokens: {
      name: string;
      id: Address;
      symbol: string;
    }[];
  }[];
};
