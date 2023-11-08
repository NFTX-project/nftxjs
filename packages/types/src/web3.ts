import type {
  createPublicClient,
  createWalletClient,
  TransactionReceipt as ViemTrasnsactionReceipt,
  GetFunctionArgs,
  ContractFunctionResult,
} from 'viem';
import type { Abi, ExtractAbiFunctionNames } from 'abitype';

export type Provider = ReturnType<typeof createPublicClient>;
export type Signer = ReturnType<typeof createWalletClient>;

export type Address = `0x${string}`;

export type BigIntString = `${number}`;

export type BigIntish = bigint | BigIntString | number;

export type TokenId = BigIntString;

export type TransactionReceipt = ViemTrasnsactionReceipt & {
  permit2Signature?: {
    signature: Address;
    amount: bigint;
    expiration: bigint;
    sigDeadline: bigint;
    nonce: number;
  };
};

export type Transaction = {
  hash: Address;
  wait: () => Promise<TransactionReceipt>;
};

type ContractRead<T extends Abi> = {
  [K in ExtractAbiFunctionNames<T>]: (
    args: GetFunctionArgs<T, K>
  ) => Promise<ContractFunctionResult<T, K>>;
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
    args: GetFunctionArgs<T, K> & WriteOpts
  ) => Promise<Transaction>;
};
type ContractEstimate<T extends Abi> = {
  [K in ExtractAbiFunctionNames<T>]: (
    args: GetFunctionArgs<T, K> & WriteOpts
  ) => Promise<{ gasEstimate: bigint }>;
};

export type Contract<T extends Abi> = {
  read: ContractRead<T>;
  write: ContractWrite<T>;
  estimate: ContractEstimate<T>;
};
