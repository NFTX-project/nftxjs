# `@nftx/query`

This library offers some simple, standalone, methods for querying both restful endpoints (or any endpoints, actually) as well as constructing and querying graphql endpoints.

## query

```ts
<T>(args: {
  url: string,
  data?: Record<string, any> | string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}): Promise<T>
```

`query` is a very simple wrapper around the native `fetch` api. It will handle serializing post data, creating query params, parsing response data, and handling failed responses.

```ts
const data = await query<{ items: Item[] }>({
  url: '/api/items',
  data: { myQueryParam: 'foo' },
  method: 'GET',
});
```

In addition to the base arguments, you can also pass additional arguments:

```ts
<T>(args: {
  ...baseArgs,
  maxAttempts?: number,
  fetch?: Fetch,
  parse?: (text:string, reviver?: (key: string, value: any) => any): any,
  stringify?: (value: any, replacer?: (key: string, value: any) => any, space?: number): string
}): Promise<T>
```

`maxAttempts` determines how many times a failed response will be retried. (Only repsonses with a 5xx status are considered retryable)

`fetch`, `parse`, and `stringify` allow you to pass in a custom implementation of `fetch`, `JSON.parse`, and `JSON.stringify` respectively.

Finally, you can also pass in any additional arguments available in the `RequestInit` type, such as `headers` or `credentials`.

If a non-2xx response is received, a special error will be thrown that contains the `response` object and the parsed response data.

```ts
try {
  await query({ url: '/api/will-fail' });
} catch (e) {
  if (e.response.status === 400) {
    // do something
  }
  if (e.data.someContextInfo) {
    // do something
  }
}
```

## gql

```ts
(query: string): string
```

Accepts and returns a graphql string. In reality this method does absolutely nothing except flags to various syntax highlighters that the string is a graphql query!

## queryGraph

```ts
<T>(args: {
  url: string | string[],
  query: string | Query,
  variables?: Record<string, any>
}): Promise<T>
```

Sends a graphql query and returns the resulting data. This is mostly just a wrapper around the `query` method with a few extras:

- `url` can be an array of urls. If the first url fails, it will attempt the next until all have been tried. This means you can have "backup" graphs to fall back on.
- `data` is replaced by `query` which can either be a string containing your graphql query, or the result of calling `createQuery`
- `variables` argument can be used to inject variables into your query string
- you can still pass in all `RequestInit` args, a custom `fetch`, `stringify`, and `parse`, as well as `sendQuery` which lets you pass in a custom implementation of the `query` method.

## createQuery

```ts
<QuerySchema>(): Query
```

returns an interface for creating a graphql query string, inspired by `LINQ` style syntax. The most useful feature of `createQuery` is its ability to infer fields, filters, and data types.

> createQuery was created with a specific schema format in mind. Single entities expect an `id` arg. List entities accept `first`, `orderBy`, `orderDirection`, and `where` args.

The resulting query contains the possible entities to query:

```ts
createQuery<Query>().pools;
```

and each entitiy has the following properies:

```ts
{
  // for single entity
  id(id: string): Query,
  // for lists
  first(limit: number): Query,
  orderBy(field: string): Query,
  orderDirection(direction: 'asc' | 'desc'): Query,
  where(fn: (w: W) => W[]): Query,

  // common
  as(name: string): Query, // alias the entity
  select(fn: (s: S) => S[]): Query
}
```

where and select work by passing in a callback function and returning a list of fields:

```ts
where((w) => [
  w.fieldA('value'),
  w.fieldB.gt(100),
  w.childEntity((c) => [c.childField.is('x')]),
]);
```

```ts
select((s) => [
  s.fieldA,
  s.fieldB.as('alias'),
  s.childEntity((c) => [c.childField]),
]);
```
