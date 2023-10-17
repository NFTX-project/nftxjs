type ErrorCode =
  // Generic
  | 'UNKNOWN'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'NOT_AUTHORIZED'
  | 'NOT_AUTHENTICATED'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'VALIDATION'
  | 'NOT_FOUND'
  // Pricing
  | 'QUOTE_FAILED'
  | 'PRICE_FAILED'
  | 'INSUFFICIENT_LIQUIDITY'
  | 'QUOTE_SLIPPAGE'
  // Transactions
  | 'TRANSACTION_EXCEPTION'
  | 'TRANSACTION_FAILED'
  | 'TRANSACTION_CANCELLED';

export type ErrorPojo = { code: string; message: string } & Record<string, any>;

export interface ErrorHttpResponse {
  status: number;
  body: ErrorPojo;
}

export interface ErrorType {
  code: ErrorCode;
  message: string;

  toHttpResponse(): ErrorHttpResponse;
}

export abstract class NftxError extends Error implements ErrorType {
  code: ErrorCode = 'UNKNOWN';
  status = 500;

  constructor(message?: string) {
    super(message);
  }

  toHttpResponse(): ErrorHttpResponse {
    return {
      status: this.status,
      body: {
        code: this.code,
        message: this.message,
      },
    };
  }
}

export class UnknownError extends NftxError {
  code: ErrorCode = 'UNKNOWN';
  status = 500;
}

export class NotFoundError extends NftxError {
  code: ErrorCode = 'NOT_FOUND';
  status = 404;
  entity: string | undefined;
  id: string | undefined;

  constructor(entity?: string, id?: string) {
    let message;
    if (id && entity) {
      message = `Could not find ${entity} "${id}"`;
    } else if (entity) {
      message = `Could not find ${entity}`;
    } else {
      message = 'Could not find resource';
    }
    super(message);
    this.entity = entity;
    this.id = id;
  }

  toHttpResponse(): ErrorHttpResponse {
    const base = super.toHttpResponse();
    return {
      ...base,
      body: {
        ...base.body,
        entity: this.entity,
        id: this.id,
      },
    };
  }
}

export class NotAuthenticatedError extends NftxError {
  code: ErrorCode = 'NOT_AUTHENTICATED';
  status = 401;
}

export class NotAuthorizedError extends NftxError {
  code: ErrorCode = 'NOT_AUTHORIZED';
  status = 403;
}

export class ConflictError extends NftxError {
  code: ErrorCode = 'CONFLICT';
  status = 409;
}

export class BadRequestError extends NftxError {
  code: ErrorCode = 'BAD_REQUEST';
  status = 400;
}

export class RateLimitedError extends NftxError {
  code: ErrorCode = 'RATE_LIMITED';
  status = 429;
}

export class ValidationError extends BadRequestError {
  code: ErrorCode = 'VALIDATION';
  errors: Record<string, string>;

  constructor(errors: Record<string, string>) {
    const message = Object.entries(errors)
      .slice(0, 1)
      .map(([key, message]) => `${key}: ${message}`)[0];
    super(message);
    this.errors = errors;
  }

  toHttpResponse(): ErrorHttpResponse {
    const base = super.toHttpResponse();
    return { ...base, body: { ...base.body, errors: this.errors } };
  }

  static validate(
    rules: Record<string, () => string | true | null | undefined>
  ) {
    const errors: Record<string, string> = {};
    Object.entries(rules).forEach(([key, cb]) => {
      const result = cb();
      if (typeof result === 'string' && result) {
        errors[key] = result;
      }
    });
    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }
  }
}

export class InsufficientLiquidityError extends BadRequestError {
  code: ErrorCode = 'INSUFFICIENT_LIQUIDITY';

  constructor() {
    super(
      'There is insufficient liquidity to get a quote for this transaction'
    );
  }
}

export class QuoteSlippageError extends BadRequestError {
  code: ErrorCode = 'QUOTE_SLIPPAGE';

  constructor() {
    super(
      'Price impact is high, you may need to increase slippage tolerance for this transaction to succeed.'
    );
  }
}

export class QuoteFailedError extends UnknownError {
  code: ErrorCode = 'QUOTE_FAILED';

  constructor(e: any) {
    if (typeof e === 'object' && e && e.errorCode) {
      switch (e.errorCode) {
        case 'NO_ROUTE':
          return new InsufficientLiquidityError();
        default:
          break;
      }
    }

    let message = 'Failed to fetch a quote for this transaction.';
    if (typeof e === 'string') {
      message = e;
    } else if (e?.message) {
      message = e.message;
    } else if (e?.errorCode) {
      const detail = e.detail ?? 'Unknown';
      const code = e.errorCode;
      message = `Failed to fetch a quote for this transaction. The router failed with reason "${detail}" and code ${code}`;
    }
    super(message);
  }
}

export class PriceFailedError extends QuoteFailedError {
  code: ErrorCode = 'PRICE_FAILED';
}

abstract class TransactionError extends UnknownError {
  network: number;
  error: any;

  constructor(network: number, baseError: any) {
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

/** Return an error class from a plain object */
export const hydrate = (obj: Record<string, any>) => {
  if (obj instanceof NftxError) {
    return obj;
  }

  const code = obj?.code as ErrorCode;

  switch (code) {
    case 'UNKNOWN':
      return new UnknownError(obj.message);
    case 'BAD_REQUEST':
      return new BadRequestError(obj.message);
    case 'CONFLICT':
      return new ConflictError(obj.message);
    case 'NOT_AUTHENTICATED':
      return new NotAuthenticatedError(obj.message);
    case 'NOT_AUTHORIZED':
      return new NotAuthorizedError(obj.message);
    case 'NOT_FOUND':
      return new NotFoundError(obj.entity, obj.id);
    case 'RATE_LIMITED':
      return new RateLimitedError(obj.message);
    case 'VALIDATION':
      return new ValidationError(obj.errors);
    case 'QUOTE_FAILED':
      return new QuoteFailedError(obj.message);
    case 'PRICE_FAILED':
      return new PriceFailedError(obj.message);
    case 'INSUFFICIENT_LIQUIDITY':
      return new InsufficientLiquidityError();
    case 'QUOTE_SLIPPAGE':
      return new QuoteSlippageError();
    // Transaction errors _shouldn't_ ever need hydrating
    case 'TRANSACTION_CANCELLED':
    case 'TRANSACTION_EXCEPTION':
    case 'TRANSACTION_FAILED':
    default:
      return new UnknownError(obj?.message);
  }
};

/** Return an error class from a http response object */
export const hydrateResponse = (response: {
  status: number;
  body: Record<string, any>;
}) => {
  const err = hydrate(response.body);

  if (err.constructor === UnknownError) {
    switch (response.status) {
      case 400:
        return new BadRequestError();
      case 401:
        return new NotAuthenticatedError();
      case 403:
        return new NotAuthorizedError();
      case 404:
        return new NotFoundError();
      case 409:
        return new ConflictError();
      case 429:
        return new RateLimitedError();
      default:
        break;
    }
  }

  return err;
};
