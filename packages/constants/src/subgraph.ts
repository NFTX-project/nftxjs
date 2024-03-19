import { Network } from './networks';

const SHARED_PATH = 'subgraphs/name';

const SHARED_HOST = 'https://api.thegraph.com';
const PROXY_HOST = 'https://graph-proxy.nftx.xyz';

const SHARED_PROXY_NAME = 'shared';

const SHARED_ROOT = `${SHARED_HOST}/${SHARED_PATH}`;

const SHARED_PROXY_ROOT = `${PROXY_HOST}/${SHARED_PROXY_NAME}/${SHARED_PATH}`;

export const NON_STANDARD_SUBGRAPH = {
  [Network.Mainnet]: `${SHARED_PROXY_ROOT}/0xorg/non-standard-nfts`,
};

export const ERC721_SUBGRAPH = {
  [Network.Mainnet]:
    'https://gateway-arbitrum.network.thegraph.com/api/49f332ad234c93d2f07d2c085f1ca6d6/subgraphs/id/CBf1FtUKFnipwKVm36mHyeMtkuhjmh4KHzY3uWNNq5ow',
  [Network.Arbitrum]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/721-arbitrum-data-nexus',
  [Network.Goerli]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/eip721-looksrare-goerli',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/721-sepolia-data-nexus',
};

export const ERC1155_SUBGRAPH = {
  [Network.Mainnet]:
    'https://gateway-arbitrum.network.thegraph.com/api/49f332ad234c93d2f07d2c085f1ca6d6/subgraphs/id/5C6JRVzKcE9AVbT7S71EycV8eEGcfkJB9gGsyTbHMVmN',
  [Network.Arbitrum]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/1155-arbitrum-data-nexus',
  [Network.Goerli]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/eip1155-looksrare-goerli',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/1155-sepolia-data-nexus',
};

export const NFTX_SUBGRAPH = {
  [Network.Mainnet]:
    'https://graph-proxy.nftx.xyz/nftx-indexer/subgraphs/id/QmTzyQKcTsLq1jLXM4gcEyu9XkRLX7wbJJ5mY4SCHRXgii',
  [Network.Arbitrum]: `${SHARED_ROOT}/nftx-project/nftx-v2-arbitrum`,
  [Network.Goerli]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-vaults-goerli',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-vaults-sepolia',
};

export const NFTX_UNISWAP_SUBGRAPH = {
  [Network.Mainnet]:
    'https://graph-proxy.nftx.xyz/nftx-indexer/subgraphs/id/QmTqJsUzqsmSzkvDeSGDmGYCcVu8v3Tr3j3MqNsTZvVCMm',
  [Network.Goerli]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-amm-goerli',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-amm-sepolia',
};
