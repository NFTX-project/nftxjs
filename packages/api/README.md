# `@nftx/api`

This package contains methods for fetching various data via the nftx API

# Usage

```ts
import { fetchVaults, fetchVaultBuyPrice } from '@nftx/api';

const vaults = await fetchVaults();
const price = await fetchVaultBuyPrice({ vaultId: 0, tokenIds: ['1'] });
```

Many of the api responses are intended to be used with other @nftx libraries:

```ts
import { createPublicClient, createWalletClient } from 'viem';
import { fetchVaultBuyQuote } from '@nftx/api';
import { buy } from '@nftx/trade';

const quote = await fetchVaultBuyQuote({
  vaultId: 0,
  tokenIds: ['1'],
  userAddress,
});

const provider = createPublicClient();
const signer = createWalletClient();

const transaction = await buy({ quote, provider, signer });
```
