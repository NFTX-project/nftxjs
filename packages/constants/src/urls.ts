import { Network } from './networks';

export const NFTX_ROUTER_URL = {
  [Network.Mainnet]: 'https://api.nftx.xyz/v3/eth-mainnet/quote',
  [Network.Goerli]: 'https://api.nftx.xyz/v3/eth-goerli/quote',
  [Network.Sepolia]: 'https://api.nftx.xyz/v3/eth-sepolia/quote',
  [Network.Arbitrum]: 'https://api.nftx.xyz/v3/arbitrum-one/quote',
};

export const NFTX_APR_URL = {
  [Network.Mainnet]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Arbitrum]: 'https://data.nftx.xyz/vaultaprs',
  [Network.Goerli]: 'https://data.nftx.xyz/vaultaprs',
};

export const NFTX_API_URL = 'https://api-v3.nftx.xyz';

export const RESERVOIR_URL = {
  [Network.Mainnet]: 'https://api.reservoir.tools',
  [Network.Goerli]: 'https://api-goerli.reservoir.tools',
  [Network.Arbitrum]: 'https://api-arbitrum.reservoir.tools',
  [Network.Sepolia]: 'https://api-sepolia.reservoir.tools',
};
