// import { Network } from './networks';

import { Network } from './networks';

export const ZEROX_URL = {
  // TODO: only enable this once contracts support the 0x api, otherwise we'll end up with conflicting prices
  // [Network.Mainnet]: 'https://api.0x.org',
};

export const NFTX_APR_URL = {
  [Network.Mainnet]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Rinkeby]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Arbitrum]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Goerli]: 'https://data.nftx.xyz/vaultaprs',
};
