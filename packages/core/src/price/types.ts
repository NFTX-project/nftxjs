import type { BigNumber } from '@ethersproject/bignumber';

export type Price = {
  price: BigNumber;
  estimatedGas?: BigNumber;
  gasPrice?: BigNumber;
  sources?: Array<{ name: string; proportion: string }>;
};
