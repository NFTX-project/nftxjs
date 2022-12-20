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
  ALCHEMY_URL,
  NFTX_API_URL,
} from '@nftx/constants';
import merge from 'deepmerge';

/** Configuration settings for nftx.js */
export interface Config {
  /** The default network to use if not explicitly given */
  network: number;
  /** Subgraph URLs and keys
   * Each item should be an object keyed by network
   * The value can either be a URL string, or an array of strings
   * If an array is provided, we will use each item as a fallback to the previous one
   * @example
   * ERC721_SUBGRAPH: {
   *  [Network.Mainnet]: 'https://my-subgraph-url.com',
   *  [Network.Goerli]: ['https://try-me-first.com', 'https://try-me-second.com']
   * }
   */
  subgraph: {
    /** A user-specific subgraph api key, if you have one */
    API_KEY: string;
    ERC1155_SUBGRAPH: Record<string, string | string[]>;
    ERC721_SUBGRAPH: Record<string, string | string[]>;
    NFTX_SUBGRAPH: Record<string, string | string[]>;
    SUSHI_SUBGRAPH: Record<string, string | string[]>;
    NON_STANDARD_SUBGRAPH: Record<string, string | string[]>;
    NFTX_TOKEN_BALANCE_SUBGRAPH: Record<string, string | string[]>;
    NFTX_FEE_TRACKER_SUBGRAPH: Record<string, string | string[]>;
  };
  /** External & 3rd party URLs used by nftx.js
   * Each item should be an object keyed by network
   */
  urls: {
    ZEROX_PRICE_URL: Record<string, string>;
    ZEROX_QUOTE_URL: Record<string, string>;
    NFTX_APR_URL: Record<string, string>;
    ALCHEMY_URL: Record<string, string>;
    NFTX_API_URL: string;
  };
  /** Contract configuration options */
  contracts: {
    /** Whether to batch read calls together to reduce the number of network requests */
    multicall: boolean;
    /** Whether to use 0x for pricing and transactions */
    use0xApi: boolean;
    /** It's necessary to hardcode the price of ETH on some test networks */
    ethPrice: Record<string, string>;
  };
  /** API keys */
  keys: {
    /** Your specific nftx.js API key, this must be provided in order to use the library */
    NFTX_API: string;
    ALCHEMY: string;
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
    ALCHEMY_URL,
    NFTX_API_URL,
  },
  contracts: {
    multicall: true,
    use0xApi: true,
    ethPrice: {
      [Network.Rinkeby]: '2500000000', // $2.5k
    },
  },

  keys: {
    NFTX_API: null,
    ALCHEMY: null,
  },
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const initialConfig: Config = merge(
  defaultConfig,
  {},
  { arrayMerge: (_, arr) => arr }
);

/**
 * Configuration settings for nftx.js
 */
const config: Config & {
  /**
   * Set a series of options
   * You can pass in a combination of partial options and they will be merged into the previous configuration
   */
  configure(opts: DeepPartial<Config>): void;
} = {
  ...initialConfig,
  /**
   * Set a series of options
   * You can pass in a combination of partial options and they will be merged into the previous configuration
   */
  configure(opts: DeepPartial<Config>) {
    const merged = merge(config, opts, { arrayMerge: (_, arr) => arr });
    Object.entries(merged).forEach(([key, value]) => {
      config[key] = value;
    });
  },
};

export default config;
