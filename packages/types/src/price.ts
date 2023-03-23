/** A price object returned by all pricing methods (@nftx/trade) */
export type Price = {
  price: bigint;
  estimatedGas?: bigint;
  gasPrice?: bigint;
  /**
   * A list of sources providing liquidity for the given price
   * This will only be provided if 0x pricing is enabled
   */
  sources?: Array<{ name: string; proportion: string }>;
  priceImpact?: number;
};
