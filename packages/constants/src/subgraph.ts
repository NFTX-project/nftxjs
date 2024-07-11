import { Network } from './networks';

const ROOT = 'https://g.nftx.xyz';
const CHAINS = {
  [Network.Mainnet]: 'eth-mainnet',
  [Network.Arbitrum]: 'arbitrum-mainnet',
  [Network.Sepolia]: 'eth-sepolia',
  [Network.Base]: 'base-mainnet',
};

const createNftxGraphs = (name: string) => {
  return {
    [Network.Mainnet]: `${ROOT}/${name}/${CHAINS[Network.Mainnet]}`,
    [Network.Arbitrum]: `${ROOT}/${name}/${CHAINS[Network.Arbitrum]}`,
    [Network.Sepolia]: `${ROOT}/${name}/${CHAINS[Network.Sepolia]}`,
    [Network.Base]: `${ROOT}/${name}/${CHAINS[Network.Base]}`,
    '84532': `${ROOT}/${name}/base-sepolia`,
  };
};

export const NON_STANDARD_SUBGRAPH = {
  [Network.Mainnet]: 'https://g.nftx.xyz/non-standard-nfts/eth-mainnet',
};

export const ERC721_SUBGRAPH = createNftxGraphs('erc721');
export const ERC1155_SUBGRAPH = createNftxGraphs('erc1155');
export const NFTX_SUBGRAPH = createNftxGraphs('nftx-v3-vaults');
export const NFTX_UNISWAP_SUBGRAPH = createNftxGraphs('nftx-v3-amm');
