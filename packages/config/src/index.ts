import {
  ERC1155_SUBGRAPH,
  ERC721_SUBGRAPH,
  NFTX_SUBGRAPH,
  SUSHI_SUBGRAPH,
  NON_STANDARD_SUBGRAPH,
  NFTX_TOKEN_BALANCE_SUBGRAPH,
  PUBLIC_GRAPH_API_KEY,
  ZEROX_URL,
  NFTX_APR_URL,
  Network,
} from '@nftx/constants';
import merge from 'deepmerge';

interface Config {
  network: Network;
  subgraph: {
    API_KEY: string;
    ERC1155_SUBGRAPH: Record<string, string>;
    ERC721_SUBGRAPH: Record<string, string>;
    NFTX_SUBGRAPH: Record<string, string>;
    SUSHI_SUBGRAPH: Record<string, string>;
    NON_STANDARD_SUBGRAPH: Record<string, string>;
    NFTX_TOKEN_BALANCE_SUBGRAPH: Record<string, string>;
  };
  urls: {
    ZEROX_URL: Record<string, string>;
    NFTX_APR_URL: Record<string, string>;
  };
  contracts: {
    multicall: boolean;
  };
}

const defaultConfig: Config = {
  network: Network.Mainnet,
  subgraph: {
    API_KEY: PUBLIC_GRAPH_API_KEY,
    ERC1155_SUBGRAPH,
    ERC721_SUBGRAPH,
    NFTX_SUBGRAPH,
    NFTX_TOKEN_BALANCE_SUBGRAPH,
    NON_STANDARD_SUBGRAPH,
    SUSHI_SUBGRAPH,
  },
  urls: {
    ZEROX_URL,
    NFTX_APR_URL,
  },
  contracts: {
    multicall: true,
  },
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const config = {
  ...merge(defaultConfig, {}),
  configure(opts: DeepPartial<Config>) {
    const merged = merge(config, opts);
    Object.entries(merged).forEach(([key, value]) => {
      config[key] = value;
    });
  },
};

export default config;
