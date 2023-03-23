import type { Provider, Signer, Transaction } from 'nftx.js';
import type { TransactionReceipt } from 'viem';

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
  transaction?: Transaction;
  receipt?: TransactionReceipt;
  error?: any;
};

type TxnArgs = {
  network?: number;
  provider: Provider;
  signer: Signer;
};
type TxnFn<A extends TxnArgs> = (args: A) => any;
/** Takes a transaction function, removes the network and signer, and returns the remaining args */
export type TxnArgsOnly<T extends TxnFn<any>> = Omit<
  Parameters<T>[0],
  'network' | 'signer' | 'provider'
>;
