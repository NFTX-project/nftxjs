import type { Address } from '@nftx/types';

export type CumulativeFee = {
  vaultId: string;
  vaultAddress: Address;
  txnId: string;
  symbol: string;
  timestamp: number;
  type: string;
  amount: bigint;
  toDate: bigint;
};
