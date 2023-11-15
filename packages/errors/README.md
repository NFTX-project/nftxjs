# `@nftx/errors`

This package contains error classes for common usecases.

Under the hood, the NFTX API will throw serialised versions of these errors, and nftx.js will automatically parse them back into errors.

Each error class includes a unique `code`, a human-readable `message`, and a `toHttpResponse` method that serialises the error.

The package also includes a `hydrate` function that parses a json object and returns an error, and `hydrateResponse` that will hydrate a `toHttpResponse` object.

## Usage

```ts
import { BadRequestError } from '@nftx/errors';

const e = new BadRequestError('This is bad');

console.log(e.code, e.message);

throw e;
```

```ts
const e = new UnknownError('An unknown error happened');

const { status, body } = e.toHttpResponse();

const e2 = hydrateResponse({ status, body });
```
