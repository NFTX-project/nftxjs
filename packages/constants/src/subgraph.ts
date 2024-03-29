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
    'https://gateway-arbitrum.network.thegraph.com/api/49f332ad234c93d2f07d2c085f1ca6d6/subgraphs/id/5A1TN7amJEcStLt1UtYZfNhUhDTNL7qkMMRmokZvvLgW',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/721-sepolia-data-nexus',
};

export const ERC1155_SUBGRAPH = {
  [Network.Mainnet]:
    'https://gateway-arbitrum.network.thegraph.com/api/49f332ad234c93d2f07d2c085f1ca6d6/subgraphs/id/5C6JRVzKcE9AVbT7S71EycV8eEGcfkJB9gGsyTbHMVmN',
  [Network.Arbitrum]:
    'https://gateway-arbitrum.network.thegraph.com/api/49f332ad234c93d2f07d2c085f1ca6d6/subgraphs/id/Gtkb9LdjxZR99YfaxHtZDi6j5fbCho1gypSKuN4zEWym',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/1155-sepolia-data-nexus',
};

export const NFTX_SUBGRAPH = {
  [Network.Mainnet]:
    'https://graph-proxy.nftx.xyz/nftx-indexer/subgraphs/id/QmTzyQKcTsLq1jLXM4gcEyu9XkRLX7wbJJ5mY4SCHRXgii',
  [Network.Arbitrum]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-vaults-arbitrum',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-vaults-sepolia',
};

export const NFTX_UNISWAP_SUBGRAPH = {
  [Network.Mainnet]:
    'https://graph-proxy.nftx.xyz/nftx-indexer/subgraphs/id/QmTqJsUzqsmSzkvDeSGDmGYCcVu8v3Tr3j3MqNsTZvVCMm',
  [Network.Sepolia]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-amm-sepolia',
  [Network.Arbitrum]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/nftx-v3-amm-arbitrum',
};
