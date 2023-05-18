import type { Token } from './tokens';

/** A price object returned by all pricing methods (@nftx/trade) */
export type Price = {
  price: bigint;
  estimatedGas?: bigint;
  gasPrice?: bigint;
  /**
   * A list of sources providing liquidity for the given price
   */
  sources?: Array<{ name: string; proportion: string }>;
  route?: Array<{
    type: string;
    proportion: string;
    amountIn: bigint;
    amountOut: bigint;
    tokenIn: Token;
    tokenOut: Token;
    path: Array<{
      tokenIn: Token;
      tokenOut: Token;
      amount: bigint;
    }>;
  }>;
  priceImpact?: number;
};
