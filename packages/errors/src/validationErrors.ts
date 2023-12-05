import { BadRequestError } from './genericErrors';
import { ErrorCode, ErrorHttpResponse } from './types';

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
