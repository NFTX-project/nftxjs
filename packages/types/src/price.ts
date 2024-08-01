import type { BigNumber } from '@ethersproject/bignumber';

/** A price object returned by all pricing methods (@nftx/trade) */
export type Price = {
  price: BigNumber;
  estimatedGas?: BigNumber;
  gasPrice?: BigNumber;
  /**
   * A list of sources providing liquidity for the given price
   */
  sources?: Array<{ name: string; proportion: string }>;
  priceImpact?: number;
};
