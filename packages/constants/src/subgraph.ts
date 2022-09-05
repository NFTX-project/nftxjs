import { Network } from './networks';

// TODO: create a public api key as well as a dev api key
export const PUBLIC_GRAPH_API_KEY = '690cf8d6987a151008c2536454bd3d7a';
// Locked down to nftx.io
export const NFTX_GRAPH_API_KEY = '690cf8d6987a151008c2536454bd3d7a';

const SHARED_PATH = 'subgraphs/name';
const INDEXER_PATH = 'subgraphs/id';
const GATEWAY_PATH = `api/${PUBLIC_GRAPH_API_KEY}/subgraphs/id`;

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
  [Network.Rinkeby]: `${SHARED_PROXY_ROOT}/0xorg/non-standard-nfts-rinkeby`,
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
  [Network.Rinkeby]: `${SHARED_PROXY_ROOT}/0xorg/eip721-subgraph-rinkeby`,
  [Network.Goerli]: `${SHARED_PROXY_ROOT}/nftx-project/eip721-goerli`,
};

export const ERC1155_SUBGRAPH = {
  [Network.Mainnet]: `${GATEWAY_PROXY_ROOT}/GCQVLurkeZrdMf4t5v5NyeWJY8pHhfE9sinjFMjLYd9C`,
  [Network.Arbitrum]: `${SHARED_PROXY_ROOT}/quantumlyy/eip1155-subgraph-arbitrum`,
  [Network.Rinkeby]: `${SHARED_PROXY_ROOT}/0xorg/eip1155-subgraph-rinkeby`,
  [Network.Goerli]: `${SHARED_PROXY_ROOT}/odyssy-automaton/erc1155-goerli-subgraph`,
};

export const SUSHI_SUBGRAPH = {
  [Network.Mainnet]: [
    // Gateway + Proxy + Cache
    `${GATEWAY_CACHE_PROXY_ROOT}/D7azkFFPFT5H8i32ApXLr34UQyBfxDAfKoCEK4M832M6`,
    // Shared + Proxy
    `${SHARED_PROXY_ROOT}/sushiswap/exchange`,
    // Shared
    `${SHARED_ROOT}/sushiswap/exchange`,
  ],
  [Network.Arbitrum]: `${SHARED_PROXY_ROOT}/sushiswap/arbitrum-exchange`,
  [Network.Rinkeby]: `${SHARED_PROXY_ROOT}/bilalmir135/sushi-swap-exchange`,
  [Network.Goerli]: `${SHARED_PROXY_ROOT}/sushiswap/exchange-goerli`,
};

export const NFTX_SUBGRAPH = {
  [Network.Mainnet]: [
    // Gateway + Proxy + Cache
    `${GATEWAY_CACHE_PROXY_ROOT}/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
    // Indexer + Proxy
    `${INDEXER_PROXY_ROOT}/QmXa6ChLJzAVu1imQ5YCMTzgPGVCCRdhVgVKWpkXEyKtGQ`,
    // Gateway
    `${GATEWAY_ROOT}/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
    // Indexer
    `${INDEXER_ROOT}/QmXa6ChLJzAVu1imQ5YCMTzgPGVCCRdhVgVKWpkXEyKtGQ`,
    // Shared + Proxy
    `${SHARED_PROXY_ROOT}/nftx-project/nftx-v2`,
    // Shared
    `${SHARED_ROOT}/nftx-project/nftx-v2`,
  ],
  [Network.Arbitrum]: `${SHARED_ROOT}/nftx-project/nftx-v2-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/nftx-project/nftx-v2-rinkeby`,
  [Network.Goerli]: `${SHARED_ROOT}/nftx-project/nftx-v2-goerli`,
};

export const NFTX_TOKEN_BALANCE_SUBGRAPH = {
  [Network.Mainnet]: [
    // Gateway + Proxy + Cache
    `${GATEWAY_PROXY_ROOT}/FiFs5im99VCUNevp1XaF642uCcsYkbN6eoN3GMErE7wL?nocache`,
    // Indexer + Proxy
    `${INDEXER_PROXY_ROOT}/Qma71JWFvKRiE2Pu1SMdyVuxcmcpHAB85mufpkAyYrk93g`,
    // Gateway
    `${GATEWAY_ROOT}/FiFs5im99VCUNevp1XaF642uCcsYkbN6eoN3GMErE7wL`,
    // Indexer
    `${INDEXER_ROOT}/Qma71JWFvKRiE2Pu1SMdyVuxcmcpHAB85mufpkAyYrk93g`,
    // Shared + Proxy
    `${SHARED_PROXY_ROOT}/nftx-project/nftx-vault-tokens-holdings`,
    // Shared
    `${SHARED_ROOT}/nftx-project/nftx-vault-tokens-holdings`,
  ],
  [Network.Arbitrum]: `${SHARED_PROXY_ROOT}/nftx-arbitrum/subgraphs/name/nftx-hosted/nftx-vault-token-holdings-arbitrum?nocache`,
  [Network.Rinkeby]: `${SHARED_PROXY_ROOT}/quantumlyy/nftx-holdings-subgraph-rinkeby`,
  [Network.Goerli]: `${SHARED_PROXY_ROOT}/nftx-project/nftx-vault-token-holdings-goerli?nocache`,
};

export const NFTX_FEE_TRACKER_SUBGRAPH = {
  [Network.Mainnet]: `${GATEWAY_CACHE_PROXY_ROOT}/GxcjoGUi6UwLtWtWZzEaUDzN1pYJ24EhC9uSkK8uBfLi`,
};
