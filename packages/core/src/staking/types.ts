import type { BigNumber } from '@ethersproject/bignumber';

export type CumulativeFee = {
  vaultId: string;
  vaultAddress: string;
  txnId: string;
  symbol: string;
  timestamp: number;
  type: string;
  amount: BigNumber;
  toDate: BigNumber;
};
