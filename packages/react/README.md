# `@nftx/react`

Helpers and react hooks for using NFTX with React.

## NftxProvider

```tsx
<NftxProvider network={myChainId} provider={myProvider}>
  {children}
</NftxProvider>
```

This provier should wrap your application and accept the current network and your ethers provider.

If you don't wrap your app in the provider, it will default to mainnet ethers' default provider.

> The NftxContext is also exposed so you can use it directly if you need to.

## useNftx

```ts
() => NftxContext;
```

Returns the Nftx context, this contains the network, provider, and a `web3` property which is the entirety of `@nftx/web3`.

## useTransaction

```ts
(
  fn: (args: any) => Promise<ContractTransaction>,
  options?: {
    onSuccess?: (data: ContractTransactions, args: any) => any,
    onError?: (error: any) => any
  }
): [
  muatate: typeof fn,
  meta: {
    status: 'None' | 'PendingSignature' | 'Mining' | 'Success' | 'Fail' | 'Exception',
    reset: () => void,
    isIdle: boolean,
    isPending: boolean,
    isException: boolean,
    isFail: boolean,
    isMining: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    isError
  }
]
```

Wraps a transaction function and provides additional status meta.

Under the hood it handles an assortment of edge cases, such as if you speed up a transaction.

This function will also be responsible for triggering notifications and transaction data.

> isLoading is a culmination of isMining and isPending
> isError is a culmination of isException and isFail

## useApprove

## useBuyFromVault

## useMintIntoVault

## useRedeemFromVault

## useSellIntoVault

## useSwapWithVault
