import type { ContractReceipt, ContractTransaction } from 'ethers';

export type TransactionState =
  | 'None'
  | 'PendingSignature'
  | 'Mining'
  | 'Success'
  | 'Fail'
  | 'Exception';

export type TransactionEvent = {
  type: TransactionState;
  description: string;
  createdAt: number;
  network: number;
  transaction?: ContractTransaction;
  receipt?: ContractReceipt;
  error?: any;
};
