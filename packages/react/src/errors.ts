import type {
  ContractReceipt,
  ContractTransaction,
} from '@ethersproject/contracts';

export class TransactionExceptionError extends Error {
  status = 'Exception';

  constructor(public error: any, public network: number) {
    super(
      error?.error?.message ??
        error?.reason ??
        error?.data?.message ??
        error?.message
    );
  }
}

export class TransactionFailedError extends Error {
  status = 'Fail';

  constructor(
    public error: any,
    public network: number,
    public transaction: ContractTransaction,
    public receipt: ContractReceipt
  ) {
    super(
      error?.error?.message ??
        error?.reason ??
        error?.data?.message ??
        error?.message
    );
  }
}

export class TransactionCancelledError extends Error {
  status = 'Cancel';

  constructor(error: any, public network: number) {
    super(
      error?.error?.message ??
        error?.reason ??
        error?.data?.message ??
        error?.message
    );
  }
}
