import { Network } from './networks';

const SHARED_ROOT = 'https://graph-proxy.nftx.xyz/shared';
const PROXY_ROOT = 'https://graph-proxy.nftx.xyz/gateway/api';
const CACHE_PROXY_ROOT = 'https://graph-proxy.nftx.xyz/c/gateway/api';
const GRAPH_API_KEY = '690cf8d6987a151008c2536454bd3d7a';

export const NON_STANDARD_SUBGRAPH = {
  [Network.Mainnet]: `${SHARED_ROOT}/subgraphs/name/0xorg/non-standard-nfts`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/0xorg/non-standard-nfts-rinkeby`,
};

export const ERC721_SUBGRAPH = {
  [Network.Mainnet]: `${PROXY_ROOT}/${GRAPH_API_KEY}/subgraphs/id/AVZ1dGwmRGKsbDAbwvxNmXzeEkD48voB3LfGqj5w7FUS`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/eip721-subgraph-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/0xorg/eip721-subgraph-rinkeby`,
};

export const ERC1155_SUBGRAPH = {
  [Network.Mainnet]: `${PROXY_ROOT}/${GRAPH_API_KEY}/subgraphs/id/GCQVLurkeZrdMf4t5v5NyeWJY8pHhfE9sinjFMjLYd9C`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/eip1155-subgraph-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/0xorg/eip1155-subgraph-rinkeby`,
};

export const SUSHI_SUBGRAPH = {
  [Network.Mainnet]: `${CACHE_PROXY_ROOT}/${GRAPH_API_KEY}/subgraphs/id/D7azkFFPFT5H8i32ApXLr34UQyBfxDAfKoCEK4M832M6`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/sushiswap/arbitrum-exchange`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/bilalmir135/sushi-swap-exchange`,
};

export const NFTX_SUBGRAPH = {
  [Network.Mainnet]: `${CACHE_PROXY_ROOT}/${GRAPH_API_KEY}/subgraphs/id/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/nftx-project/nftx-v2-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/nftx-project/nftx-v2-rinkeby`,
};

export const NFTX_TOKEN_BALANCE_SUBGRAPH = {
  [Network.Mainnet]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/nftx-holdings-subgraph-mainnet`,
  [Network.Arbitrum]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/nftx-holdings-subgraph-arbitrum`,
  [Network.Rinkeby]: `${SHARED_ROOT}/subgraphs/name/quantumlyy/nftx-holdings-subgraph-rinkeby`,
};
