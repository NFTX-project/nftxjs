import { BadRequestError, UnknownError } from './genericErrors';
import { ErrorCode } from './types';

export class InsufficientLiquidityError extends BadRequestError {
  code: ErrorCode = 'INSUFFICIENT_LIQUIDITY';

  constructor() {
    super(
      'There is insufficient liquidity to get a quote for this transaction'
    );
  }
}

export class SlippageError extends BadRequestError {
  code: ErrorCode = 'SLIPPAGE';

  constructor() {
    super(
      'Price impact is high, you may need to increase slippage tolerance for this transaction to succeed.'
    );
  }
}

export class QuoteSlippageError extends SlippageError {
  code: ErrorCode = 'QUOTE_SLIPPAGE';
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

export class MintFeeExceedsValueError extends BadRequestError {
  code: ErrorCode = 'MINT_FEE_EXCEEDS_VALUE';

  constructor() {
    super(
      'The vault fee for this swap is more than the amount of ETH you would receive'
    );
  }
}

export class PriceFailedError extends QuoteFailedError {
  code: ErrorCode = 'PRICE_FAILED';
}
