import {
  ERC1155_SUBGRAPH,
  ERC721_SUBGRAPH,
  NFTX_SUBGRAPH,
  SUSHI_SUBGRAPH,
  NON_STANDARD_SUBGRAPH,
  NFTX_TOKEN_BALANCE_SUBGRAPH,
  PUBLIC_GRAPH_API_KEY,
  ZEROX_PRICE_URL,
  ZEROX_QUOTE_URL,
  NFTX_APR_URL,
  Network,
  NFTX_FEE_TRACKER_SUBGRAPH,
} from '@nftx/constants';
import merge from 'deepmerge';

interface Config {
  network: number;
  subgraph: {
    API_KEY: string;
    ERC1155_SUBGRAPH: Record<string, string>;
    ERC721_SUBGRAPH: Record<string, string>;
    NFTX_SUBGRAPH: Record<string, string>;
    SUSHI_SUBGRAPH: Record<string, string>;
    NON_STANDARD_SUBGRAPH: Record<string, string>;
    NFTX_TOKEN_BALANCE_SUBGRAPH: Record<string, string>;
    NFTX_FEE_TRACKER_SUBGRAPH: Record<string, string>;
  };
  urls: {
    ZEROX_PRICE_URL: Record<string, string>;
    ZEROX_QUOTE_URL: Record<string, string>;
    NFTX_APR_URL: Record<string, string>;
  };
  contracts: {
    multicall: boolean;
    use0xApi: Record<string, boolean>;
    ethPrice: Record<string, string>;
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
    NFTX_FEE_TRACKER_SUBGRAPH,
  },
  urls: {
    ZEROX_PRICE_URL,
    ZEROX_QUOTE_URL,
    NFTX_APR_URL,
  },
  contracts: {
    // Whether to batch read calls together to reduce the number of network requests
    multicall: true,
    use0xApi: {
      [Network.Mainnet]: true,
      [Network.Goerli]: true,
      [Network.Arbitrum]: false,
    },
    // It's necessary to hardcode the price of ETH on some test networks
    ethPrice: {
      [Network.Rinkeby]: '2500000000', // $2.5k
    },
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
