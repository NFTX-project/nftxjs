import { UnknownError } from './genericErrors';
import { SlippageError } from './quoteErrors';
import { ErrorCode, ErrorHttpResponse } from './types';

abstract class TransactionError extends UnknownError {
  network: number;
  error: any;

  constructor(network: number, baseError: any) {
    // Handle some common errors
    if (baseError?.code === 4001 || baseError?.code === 'ACTION_REJECTED') {
      throw new TransactionCancelledError(network);
    }
    switch (baseError?.reason?.toLowerCase()) {
      case 'price slippage check':
        throw new SlippageError();
      default:
        break;
    }

    const message =
      baseError?.error?.message ??
      baseError?.reason ??
      baseError?.data?.message ??
      baseError?.message;
    super(message);
    this.network = network;
    this.error = baseError;
  }

  toHttpResponse(): ErrorHttpResponse {
    const base = super.toHttpResponse();

    return { ...base, body: { ...base.body, network: this.network } };
  }
}

export class TransactionExceptionError extends TransactionError {
  code: ErrorCode = 'TRANSACTION_EXCEPTION';

  constructor(error: any, network: number) {
    super(network, error);
  }
}

type Transaction = Record<string, any>;
type Receipt = Record<string, any>;

export class TransactionFailedError extends TransactionError {
  code: ErrorCode = 'TRANSACTION_FAILED';
  transaction: Transaction;
  receipt: Receipt;

  constructor(
    network: number,
    error: any,
    transaction: Transaction,
    receipt: Receipt
  ) {
    super(network, error);
    this.transaction = transaction;
    this.receipt = receipt;
  }
}

export class TransactionCancelledError extends TransactionError {
  code: ErrorCode = 'TRANSACTION_CANCELLED';

  constructor(network: number) {
    super(network, { message: 'Cancelled' });
  }
}
