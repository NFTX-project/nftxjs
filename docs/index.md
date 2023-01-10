# NFTX.js

[api](api/modules/nftx_js.html) | [github](https://github.com/NFTX-project/nftxjs) | [npm](https://www.npmjs.com/package/nftx.js)

This is an SDK that covers all of the core functionality of NFTX.

Our aim is to be as technology-agnostic as possible. We're not tightly coupled with any view framework or environment. You can integrate with React, useDapp, Wagmi, Vue, Nodejs. Our only dependency is on [ethers.js](https://docs.ethers.org/ethers.js/v3.0/html/)

- Buy
- Sell
- Swap
- Stake
- Search vaults
- Fetch detailed vault and pool info
- Fetch a user or vault's positions
- Get price quotes

## Getting started

### Installation

```
npm install nftx.js
```

### Usage example

```ts
import { buy, configure, fetchVault } from 'nftx.js';

// Set up global nftx.js settings and provide your API key
configure({
  network: 1,
  keys: {
    NFTX_API: '<<your-api-key>>',
  },
});

// Fetch a specific vault. The vault contains tonnes of useful meta data.
const vault = await fetchVault({ vaultId: '0' });

// Create and run a buy transaction. This returns an ethers.js transaction.
const transaction = await buy({
  signer,
  userAddress: '0x0000',
  vault,
  tokenIds: ['2712'],
  randomBuys: 1,
});

// Wait for the transaction to be confirmed.
const receipt = await transaction.wait();
```

## Core features

- [config](config)
- [vaults and pools](vaults)
- [positions](positions)
- [buy/sell/swap/stake](trading)
- [@nftx/react](react)

## Integrate with React

We also have a number of React-specific tools to make UI development easier:

```tsx
import { fetchVault } from 'nftx.js';
import { NftxProvider, useBuy, Vault } from '@nftx/react';

const App = () => {
  // Wrap your app in the NFTX provider
  return (
    <NftxProvider network={1} provider={provider} signer={signer}>
      <Core />
    </NftxProvider>
  );
};

const Core = () => {
  const [vault, setVault] = useState<Vault>();
  // Most write operations available in nftx.js are included in hook form
  const [buy, { status }] = useBuy();

  // Fetch data however you want. We recommend react-query or wagmi's useQuery hook.
  useEffect(() => {
    fetchVault({ vaultId: '0' }).then((vault) => {
      setVault(vault);
    });
  }, []);

  const onClick = async () => {
    // Trigger a buy transaction
    // @nftx/react automatically takes care of signing and mining
    // It will also handle api invalidation logic
    await buy({
      userAddress: '0x0000',
      vault,
      tokenIds: ['2712'],
      randomBuys: 1,
    });
  };

  return (
    <div>
      <!-- None | PendingSignature | Minin | Exception | Fail | Success -->
      <div>{status}</div>
      <button onClick={onClick}>Buy a PUNK</button>
    </div>
  );
};
```
