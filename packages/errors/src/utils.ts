import {
  BadRequestError,
  ConflictError,
  NftxError,
  NotAuthenticatedError,
  NotAuthorizedError,
  NotFoundError,
  RateLimitedError,
  UnknownError,
} from './genericErrors';
import {
  InsufficientLiquidityError,
  PriceFailedError,
  QuoteFailedError,
  QuoteSlippageError,
} from './quoteErrors';
import { ErrorCode } from './types';
import { ValidationError } from './validationErrors';

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
