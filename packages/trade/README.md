# `@nftx/trade`

This package contains methods for trading with the NFTX protocol:

- buy
- sell
- swap
- mint
- redeem

You can also trade with the NFTX AMM:

```ts
const quote = await fetchTokenBuyPrice({
  tokenAddress,
  amount: 1000000000000000000n,
  userAddress,
});

const transaction = await tradeErc20({ provider, signer, quote });
```
