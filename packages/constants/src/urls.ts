import { Network } from './networks';

export const ZEROX_PRICE_URL = {
  [Network.Mainnet]: 'https://0x.nftx.xyz',
  [Network.Arbitrum]: 'https://arbitrum.api.0x.org',
  [Network.Goerli]: 'https://goerli.api.0x.org',
};

export const ZEROX_QUOTE_URL = {
  [Network.Mainnet]: 'https://api.0x.org',
  [Network.Arbitrum]: 'https://arbitrum.api.0x.org',
  [Network.Goerli]: 'https://goerli.api.0x.org',
};

export const NFTX_ROUTER_URL = {
  [Network.Goerli]:
    'https://tj3x3kfbo3.execute-api.eu-west-1.amazonaws.com/prod/quote',
};

export const NFTX_APR_URL = {
  [Network.Mainnet]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Rinkeby]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Arbitrum]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Goerli]: 'https://data.nftx.xyz/vaultaprs',
};

export const ALCHEMY_URL = {
  [Network.Mainnet]: 'https://eth-mainnet.g.alchemy.com',
  [Network.Goerli]: 'https://eth-goerli.g.alchemy.com',
  [Network.Arbitrum]: 'https://arb-mainnet.g.alchemy.com',
};

export const NFTX_API_URL = 'https://api-v3.nftx.xyz';
