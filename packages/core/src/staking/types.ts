import type { BigNumber } from '@ethersproject/bignumber';
import type { VaultAddress, VaultId } from '../vaults';

export type CumulativeFee = {
  vaultId: VaultId;
  vaultAddress: VaultAddress;
  txnId: string;
  symbol: string;
  timestamp: number;
  type: string;
  amount: BigNumber;
  toDate: BigNumber;
};
