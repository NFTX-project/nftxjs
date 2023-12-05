import { ErrorCode, ErrorHttpResponse, ErrorType } from './types';

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
