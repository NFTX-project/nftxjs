# @nftx/subgraph

This library contains a few helpers for querying and fetching from the subgraph

> Our subgraph urls can be found at @nftx/constants

## Usage

## API

### gql

```ts
(s: string) => string;
```

"Processes" a graphql string. Under the hood this function does _nothing_ :D but most IDEs and editors like VSCode recognize and provide syntax highlighting when they see `gql` calls.

```ts
const query = gql`
  {
    vaults {
      id
      vaultId
    }
  }
`;
```

### querySubgraph

```ts
<T>({
  url: string,
  query: string,
  variables?: object
}): Promise<T>
```

Sends a graphql request to the subgraph.

> This uses the global fetch api under the hood so if you're running in a non-browser environment (or aupporting older browsers), you'll need to polyfill fetch

When writing queries for `querySubgraph` you can pass variables in by prefixing a name with `$`.

For example:

```ts
const query = gql`{
  vaults(
    first: ${LIMIT}
    where: {
      createdAt_gt: $timestamp
    }
  ) {
    id
  }
}`;
```

For this string, `LIMIT` is inserted immediately, like a regular string interpoaltion. However `$timestamp` will later be passed in as a variable into `querySubgraph`:

```ts
querySubgraph({
  url,
  query,
  variables: { timestamp },
});
```

Variables are all stringified so if you pass in a string, you don't need to wrap it in quotes:

```ts
const query = gql`
  {
    vault(id: $id) {
      id
    }
  }
`;
querySubgraph({ url, query, variables: { id: '0x' } });
```

This would send a request with this query:

```ts
{
  vault(id: "0x") {
    id
  }
}
```

### buildWhere

```ts
(obj: object) => string;
```

This helper function lets you build a where clause string. Where a value is null, it filters it out.

```ts
const query = gql`{
  vault(where: ${buildWhere({
    id: idOrNull,
    vaultId: vaultIdOrNull,
  })}) {
    id
  }
}`;
```
