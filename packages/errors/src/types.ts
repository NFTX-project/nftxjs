export type ErrorCode =
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
  | 'MINT_FEE_EXCEEDS_VALUE'
  // Transactions
  | 'SLIPPAGE'
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
