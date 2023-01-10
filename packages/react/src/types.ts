import type { ContractReceipt, ContractTransaction, Signer } from 'ethers';

export type TransactionState =
  | 'None'
  | 'PendingSignature'
  | 'Mining'
  | 'Success'
  | 'Fail'
  | 'Exception';

export type TransactionEvent = {
  id: string;
  type: TransactionState;
  description: string;
  createdAt: number;
  network: number;
  transaction?: ContractTransaction;
  receipt?: ContractReceipt;
  error?: any;
};

type TxnFn = (args: { network?: number; signer: Signer }) => any;
/** Takes a transaction function, removes the network and signer, and returns the remaining args */
export type TxnArgsOnly<T extends TxnFn> = Omit<
  Parameters<T>[0],
  'network' | 'signer'
>;
