import type {
  createPublicClient,
  createWalletClient,
  TransactionReceipt,
  ExtractResultFromAbi,
  ExtractArgsFromAbi,
} from 'viem';
import type { Abi, ExtractAbiFunctionNames } from 'abitype';

export type Provider = ReturnType<typeof createPublicClient>;
export type Signer = ReturnType<typeof createWalletClient>;

export type Address = `0x${string}`;

export type BigIntString = `${number}`;

export type BigIntish = bigint | BigIntString | number;

export type TokenId = BigIntString;

export type Transaction = {
  hash: Address;
  wait: () => Promise<TransactionReceipt>;
};

type ContractRead<T extends Abi> = {
  [K in ExtractAbiFunctionNames<T>]: (
    args: ExtractArgsFromAbi<T, K>
  ) => Promise<ExtractResultFromAbi<T, K>>;
};
type WriteOpts = {
  value?: bigint;
  gas?: bigint;
  gasPrice?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
};

type ContractWrite<T extends Abi> = {
  [K in ExtractAbiFunctionNames<T>]: (
    args: ExtractArgsFromAbi<T, K> & WriteOpts
  ) => Promise<Transaction>;
};
type ContractEstimate<T extends Abi> = {
  [K in ExtractAbiFunctionNames<T>]: (
    args: ExtractArgsFromAbi<T, K> & WriteOpts
  ) => Promise<{ gasEstimate: bigint }>;
};

export type Contract<T extends Abi> = {
  read: ContractRead<T>;
  write: ContractWrite<T>;
  estimate: ContractEstimate<T>;
};
