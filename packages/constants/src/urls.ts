import { Network } from './networks';

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

export const NFTX_API_URL = 'https://api-v4.nftx.xyz';
