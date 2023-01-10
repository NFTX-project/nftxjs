# Config

[api](api/variables/nftx_js.config)

Nftx.js is fairly configurable out of the box:

- set the default network for all requests
- set custom urls for 3rd party resources
- enable and disable multicall contracts and 0x pricing
- set api keys

## Configure

Most settings come with sensible defaults but you can override them as required:

```ts
import { config } from 'nftx.js';

config.configure({
  network: 1,
  subgraph: {
    ERC721_SUBGRAPH: 'custom-subgraph-endpoint',
  },
  urls: {
    ALCHEMY_URL: 'custom-alchemy-url',
  },
  contracts: {
    multicall: false,
    use0xApi: false,
  },
});
```
