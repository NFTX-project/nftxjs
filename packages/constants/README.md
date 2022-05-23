# `@nftx/constants`

This library contains constants used throughout NFTX including:

- Contract Addresses
- Subgraph URLs
- API URLs
- Network/Chain IDs

All of these constants are grouped by network:

```ts
const usdcAddress = USDC[network];
```

we advise on using `getChainConstant` from `@nftx/core`:

```ts
const usdcAddress = getChainConstant(USDC, network);
```
