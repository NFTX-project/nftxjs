import { Network } from './networks';

const SHARED_PATH = 'subgraphs/name';
const INDEXER_PATH = 'subgraphs/id';
const GATEWAY_PATH = `api/690cf8d6987a151008c2536454bd3d7a/subgraphs/id`;

const SHARED_HOST = 'https://api.thegraph.com';
const INDEXER_HOST = 'https://query.graph.nftx.xyz';
const GATEWAY_HOST = 'https://gateway.thegraph.com';
const PROXY_HOST = 'https://graph-proxy.nftx.xyz';
const CACHE_PROXY_HOST = `${PROXY_HOST}/c`;

const SHARED_PROXY_NAME = 'shared';
const INDEXER_PROXY_NAME = 'nftx-indexer';
const GATEWAY_PROXY_NAME = 'gateway';

const SHARED_ROOT = `${SHARED_HOST}/${SHARED_PATH}`;
const INDEXER_ROOT = `${INDEXER_HOST}/${INDEXER_PATH}`;
const GATEWAY_ROOT = `${GATEWAY_HOST}/${GATEWAY_PATH}`;

const SHARED_PROXY_ROOT = `${PROXY_HOST}/${SHARED_PROXY_NAME}/${SHARED_PATH}`;

const INDEXER_PROXY_ROOT = `${PROXY_HOST}/${INDEXER_PROXY_NAME}/${INDEXER_PATH}`;
const GATEWAY_PROXY_ROOT = `${PROXY_HOST}/${GATEWAY_PROXY_NAME}/${GATEWAY_PATH}`;

const GATEWAY_CACHE_PROXY_ROOT = `${CACHE_PROXY_HOST}/${GATEWAY_PROXY_NAME}/${GATEWAY_PATH}`;

export const NON_STANDARD_SUBGRAPH = {
  [Network.Mainnet]: `${SHARED_PROXY_ROOT}/0xorg/non-standard-nfts`,
};

export const ERC721_SUBGRAPH = {
  [Network.Mainnet]: [
    // Gateway + Proxy + Cache
    `${GATEWAY_PROXY_ROOT}/AVZ1dGwmRGKsbDAbwvxNmXzeEkD48voB3LfGqj5w7FUS`,
    // Indexer + Proxy
    `${INDEXER_PROXY_ROOT}/QmaaDA7XVVktfxCLMgfwG1z3KM8DSMoLkbemkTt9mQT8Qf`,
    // Gateway
    `${GATEWAY_ROOT}/AVZ1dGwmRGKsbDAbwvxNmXzeEkD48voB3LfGqj5w7FUS`,
    // Indexer
    `${INDEXER_ROOT}/QmaaDA7XVVktfxCLMgfwG1z3KM8DSMoLkbemkTt9mQT8Qf`,
    // Shared + Proxy
    `${SHARED_PROXY_ROOT}/amxx/eip721-subgraph`,
    // Shared
    `${SHARED_ROOT}/amxx/eip721-subgraph`,
  ],
  [Network.Arbitrum]: `${SHARED_PROXY_ROOT}/quantumlyy/eip721-subgraph-arbitrum`,
  [Network.Goerli]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/eip721-looksrare-goerli',
};

export const ERC1155_SUBGRAPH = {
  [Network.Mainnet]: `${GATEWAY_PROXY_ROOT}/GCQVLurkeZrdMf4t5v5NyeWJY8pHhfE9sinjFMjLYd9C`,
  [Network.Arbitrum]: `${SHARED_PROXY_ROOT}/quantumlyy/eip1155-subgraph-arbitrum`,
  [Network.Goerli]:
    'https://api.thegraph.com/subgraphs/name/nftx-project/eip1155-looksrare-goerli',
};

export const NFTX_SUBGRAPH_MAINNET_URLS = {
  GATEWAY_PROXY: `${GATEWAY_CACHE_PROXY_ROOT}/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
  GATEWAY: `${GATEWAY_ROOT}/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
  INDEXER_PROXY: `${INDEXER_PROXY_ROOT}/QmXa6ChLJzAVu1imQ5YCMTzgPGVCCRdhVgVKWpkXEyKtGQ`,
  INDEXER: `${INDEXER_ROOT}/QmXa6ChLJzAVu1imQ5YCMTzgPGVCCRdhVgVKWpkXEyKtGQ`,
  SHARED_PROXY: `${SHARED_PROXY_ROOT}/nftx-project/nftx-v2-1-mainnet`,
  SHARED: `${SHARED_ROOT}/nftx-project/nftx-v2-1-mainnet`,
};
export const NFTX_SUBGRAPH = {
  [Network.Mainnet]: [
    // Gateway + Proxy + Cache
    NFTX_SUBGRAPH_MAINNET_URLS.GATEWAY_PROXY,
    // Indexer + Proxy
    NFTX_SUBGRAPH_MAINNET_URLS.INDEXER_PROXY,
    // Gateway
    NFTX_SUBGRAPH_MAINNET_URLS.GATEWAY,
    // Indexer
    NFTX_SUBGRAPH_MAINNET_URLS.INDEXER,
    // Shared + Proxy
    NFTX_SUBGRAPH_MAINNET_URLS.SHARED_PROXY,
    // Shared
    NFTX_SUBGRAPH_MAINNET_URLS.SHARED,
  ],
  [Network.Arbitrum]: `${SHARED_ROOT}/nftx-project/nftx-v2-arbitrum`,
  // [Network.Goerli]: `${SHARED_ROOT}/nftx-project/nftx-v2-1-goerli`,
  [Network.Goerli]:
    'https://api.thegraph.com/subgraphs/name/gundamdweeb/nftx-v3-vaults',
};

export const NFTX_UNISWAP_SUBGRAPH = {
  [Network.Goerli]: `https://api.thegraph.com/subgraphs/name/gundamdweeb/nftx-amm`,
};
