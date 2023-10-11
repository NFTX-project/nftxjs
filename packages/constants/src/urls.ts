import { Network } from './networks';

export const NFTX_ROUTER_URL = {
  [Network.Goerli]:
    'https://lmw8qdcm7e.execute-api.eu-central-1.amazonaws.com/prod/quote',
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

export const RESERVOIR_URL = {
  [Network.Mainnet]: 'https://api.reservoir.tools',
  [Network.Goerli]: 'https://api-goerli.reservoir.tools',
  [Network.Arbitrum]: 'https://api-arbitrum.reservoir.tools',
};
