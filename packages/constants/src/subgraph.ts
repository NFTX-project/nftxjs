import { Network } from './networks';

const GRAPH_HOST = 'https://graph-proxy.nftx.xyz';
const SHARED_ROOT = `${GRAPH_HOST}/shared`;
const PROXY_ROOT = `${GRAPH_HOST}/gateway/api`;
const CACHE_PROXY_ROOT = `${GRAPH_HOST}/c/gateway/api`;

// TODO: create a public api key as well as a dev api key
export const PUBLIC_GRAPH_API_KEY = '690cf8d6987a151008c2536454bd3d7a';
// Locked down to nftx.io
export const NFTX_GRAPH_API_KEY = '690cf8d6987a151008c2536454bd3d7a';

export const NON_STANDARD_SUBGRAPH = {
  [Network.Mainnet]: `${SHARED_ROOT}/subgraphs/name/0xorg/non-standard-nfts`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/0xorg/non-standard-nfts-rinkeby`,
};

export const ERC721_SUBGRAPH = {
  [Network.Mainnet]: `${PROXY_ROOT}/${PUBLIC_GRAPH_API_KEY}/subgraphs/id/AVZ1dGwmRGKsbDAbwvxNmXzeEkD48voB3LfGqj5w7FUS`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/eip721-subgraph-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/0xorg/eip721-subgraph-rinkeby`,
  [Network.Goerli]: `${SHARED_ROOT}/subgraphs/name/yellow-heart/goerlisubgraph`,
};

export const ERC1155_SUBGRAPH = {
  [Network.Mainnet]: `${PROXY_ROOT}/${PUBLIC_GRAPH_API_KEY}/subgraphs/id/GCQVLurkeZrdMf4t5v5NyeWJY8pHhfE9sinjFMjLYd9C`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/eip1155-subgraph-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/0xorg/eip1155-subgraph-rinkeby`,
  [Network.Goerli]: `${SHARED_ROOT}/subgraphs/name/odyssy-automaton/erc1155-goerli-subgraph`,
};

export const SUSHI_SUBGRAPH = {
  [Network.Mainnet]: `${CACHE_PROXY_ROOT}/${PUBLIC_GRAPH_API_KEY}/subgraphs/id/D7azkFFPFT5H8i32ApXLr34UQyBfxDAfKoCEK4M832M6`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/sushiswap/arbitrum-exchange`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/bilalmir135/sushi-swap-exchange`,
  [Network.Goerli]: `${SHARED_ROOT}/subgraphs/name/sushiswap/exchange-goerli`,
};

export const NFTX_SUBGRAPH = {
  [Network.Mainnet]: `${CACHE_PROXY_ROOT}/${PUBLIC_GRAPH_API_KEY}/subgraphs/id/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/nftx-project/nftx-v2-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/nftx-project/nftx-v2-rinkeby`,
  [Network.Goerli]: `${SHARED_ROOT}/subgraphs/name/nftx-project/nftx-v2-goerli`,
};

export const NFTX_TOKEN_BALANCE_SUBGRAPH = {
  [Network.Mainnet]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/nftx-holdings-subgraph-mainnet`,
  [Network.Arbitrum]: `${GRAPH_HOST}/nftx-arbitrum/subgraphs/name/nftx-hosted/nftx-vault-token-holdings-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/nftx-holdings-subgraph-rinkeby`,
  [Network.Goerli]: `${SHARED_ROOT}/subgraphs/name/nftx-project/nftx-vault-token-holdings-goerli`,
};

export const NFTX_FEE_TRACKER_SUBGRAPH = {
  [Network.Mainnet]: `${CACHE_PROXY_ROOT}/${PUBLIC_GRAPH_API_KEY}/subgraphs/id/GxcjoGUi6UwLtWtWZzEaUDzN1pYJ24EhC9uSkK8uBfLi`,
};
