import type {
  createWalletClient,
  TransactionReceipt as ViemTrasnsactionReceipt,
  GetFunctionArgs,
  ContractFunctionResult,
  PublicClient,
} from 'viem';
import type { Abi, ExtractAbiFunctionNames } from 'abitype';
import { Permit2Quote } from './price';

export type Provider = PublicClient<any, any>;
export type Signer = ReturnType<typeof createWalletClient>;

export type Address = `0x${string}`;

export type BigIntString = `${number}`;

export type BigIntish = bigint | BigIntString | number;

export type TokenId = BigIntString;

export type TokenIds = TokenId[] | [TokenId, number][];

export type TransactionReceipt = ViemTrasnsactionReceipt & {
  permit2Signature?: Permit2Quote;
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
    args: GetFunctionArgs<T, K> & WriteOpts & { account: Address }
  ) => Promise<{ gasEstimate: bigint }>;
};

export type Contract<T extends Abi> = {
  read: ContractRead<T>;
  write: ContractWrite<T>;
  estimate: ContractEstimate<T>;
};
