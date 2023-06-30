import {
  ERC1155_SUBGRAPH,
  ERC721_SUBGRAPH,
  NFTX_SUBGRAPH,
  NON_STANDARD_SUBGRAPH,
  NFTX_TOKEN_BALANCE_SUBGRAPH,
  PUBLIC_GRAPH_API_KEY,
  NFTX_APR_URL,
  Network,
  ALCHEMY_URL,
  NFTX_API_URL,
  NFTX_ROUTER_URL,
  NFTX_UNISWAP_SUBGRAPH,
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
    NON_STANDARD_SUBGRAPH: Record<string, string | string[]>;
    NFTX_TOKEN_BALANCE_SUBGRAPH: Record<string, string | string[]>;
    NFTX_UNISWAP_SUBGRAPH: Record<string, string | string[]>;
  };
  /** External & 3rd party URLs used by nftx.js
   * Each item should be an object keyed by network
   */
  urls: {
    NFTX_ROUTER_URL: Record<string, string>;
    NFTX_APR_URL: Record<string, string>;
    ALCHEMY_URL: Record<string, string>;
    NFTX_API_URL: string;
  };
  /** Contract configuration options */
  contracts: {
    /** It's necessary to hardcode the price of ETH on some test networks */
    ethPrice: Record<string, string>;
  };
  /** API keys */
  keys: {
    /** Your specific nftx.js API key, this must be provided in order to use the library */
    NFTX_API: string;
    ALCHEMY: Record<string, string>;
    RESERVOIR: Record<string, string>;
  };
  /** Internal config settings managed by nftx.js */
  internal: {
    source: 'api' | 'live';
    requiredBlockNumber: number;
    apiBlockNumber: number;
    cacheKey: string;
  };
}

const storeSetting = <T, K extends keyof T>(obj: T, name: K) => {
  if (
    typeof window === 'undefined' ||
    typeof window?.localStorage?.getItem !== 'function'
  ) {
    return;
  }
  let defaultValue = JSON.stringify(obj[name]);
  const key = `nftxjs_itl_${String(name)}`;
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: true,
    get() {
      return JSON.parse(window.localStorage.getItem(key) ?? defaultValue);
    },
    set(v) {
      const formatted = JSON.stringify(v);
      defaultValue = formatted;
      window.localStorage.setItem(key, formatted);
    },
  });
};
const storeSettings = <T extends Record<string, any>>(obj: T) => {
  Object.keys(obj).forEach((key: keyof T) => {
    storeSetting(obj, key);
  });
};

const defaultConfig: Config = {
  network: Network.Mainnet,
  subgraph: {
    API_KEY: PUBLIC_GRAPH_API_KEY,
    ERC1155_SUBGRAPH,
    ERC721_SUBGRAPH,
    NFTX_SUBGRAPH,
    NFTX_TOKEN_BALANCE_SUBGRAPH,
    NON_STANDARD_SUBGRAPH,
    NFTX_UNISWAP_SUBGRAPH,
  },
  urls: {
    NFTX_ROUTER_URL,
    NFTX_APR_URL,
    ALCHEMY_URL,
    NFTX_API_URL,
  },
  contracts: {
    ethPrice: {
      [Network.Rinkeby]: '2500000000', // $2.5k
    },
  },

  keys: {
    NFTX_API: null as unknown as string,
    ALCHEMY: {},
    RESERVOIR: {},
  },

  internal: {
    source: 'api',
    requiredBlockNumber: 0,
    apiBlockNumber: 0,
    cacheKey: '',
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config[key] = value;
    });
  },
};

storeSettings(config.internal);

export default config;
