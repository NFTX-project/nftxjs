# `@nftx/react`

This package contains utils for nftx.js that are specific to the React ecosystem. It is not included in the main nftx.js package.

## NftxProvider

```tsx
const provider = createPublicClient();
const signer = createWalletClient();

return (
  <NftxProvider network={1} provider={provider} signer={signer}>
    <App />
  </NftxProvider>
);
```

## useNftx

`useNftx` will return the provider-based details for you to use throughout your react application.

```ts
const { network, provider, signer } = useNftx();

const onSubmit = () => {
  increaseLiquidity({
    ...params,
    network,
    provider,
    signer,
  });
};
```

## useTransaction

This is similar to react-query's `useMutation` and wagmi's `useTransaction` hooks. It takes a function that then returns an nftx.js-compatible transaction object.

```ts
const [
  write,
  {
    status,
    error,
    data: { transaction, receipt },
  },
] = useTransaction((args) => {
  return increaseLiquidity(args);
});
```
