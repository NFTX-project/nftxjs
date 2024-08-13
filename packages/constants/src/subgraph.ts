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
  [Network.Mainnet]: 'https://g.nftx.xyz/non-standard-nfts/eth-mainnet',
};

export const ERC721_SUBGRAPH = {
  [Network.Mainnet]: 'https://g.nftx.xyz/erc721/eth-mainnet',
  [Network.Arbitrum]: 'https://g.nftx.xyz/erc721/arbitrum-mainnet',
};

export const ERC1155_SUBGRAPH = {
  [Network.Mainnet]: 'https://g.nftx.xyz/erc1155/eth-mainnet',
  [Network.Arbitrum]: 'https://g.nftx.xyz/erc1155/arbitrum-mainnet',
};

export const SUSHI_SUBGRAPH = {
  [Network.Mainnet]: 'https://g.nftx.xyz/sushi-v2-amm/eth-mainnet',
  [Network.Arbitrum]: 'https://g.nftx.xyz/sushi-v2-amm/arbitrum-mainnet',
};

export const NFTX_SUBGRAPH = {
  [Network.Mainnet]: 'https://g.nftx.xyz/nftx-v2-vaults/eth-mainnet',
  [Network.Arbitrum]: 'https://g.nftx.xyz/nftx-v2-vaults/arbitrum-mainnet',
};

export const NFTX_TOKEN_BALANCE_SUBGRAPH = {
  [Network.Mainnet]: 'https://g.nftx.xyz/nftx-v2-token-holdings/eth-mainnet',
  [Network.Arbitrum]: 'https://g.nftx.xyz/nftx-v2-token-holdings/arbitrum-mainnet',
};

export const NFTX_FEE_TRACKER_SUBGRAPH = {
  [Network.Mainnet]: 'https://g.nftx.xyz/nftx-v2-fee-tracker/eth-mainnet',
  [Network.Arbitrum]: 'https://g.nftx.xyz/nftx-v2-fee-tracker/arbitrum-mainnet',
};
