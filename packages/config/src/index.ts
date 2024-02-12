import {
  ERC1155_SUBGRAPH,
  ERC721_SUBGRAPH,
  NFTX_SUBGRAPH,
  NON_STANDARD_SUBGRAPH,
  NFTX_APR_URL,
  Network,
  NFTX_API_URL,
  NFTX_ROUTER_URL,
  NFTX_UNISWAP_SUBGRAPH,
} from '@nftx/constants';
import merge from 'deepmerge';

/** Configuration settings for nftx.js */
export interface Config {
  /** The default network to use if not explicitly given */
  network: number;
  /** Additional log info */
  debug: boolean;
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
    ERC1155_SUBGRAPH: Record<string, string | string[]>;
    ERC721_SUBGRAPH: Record<string, string | string[]>;
    NFTX_SUBGRAPH: Record<string, string | string[]>;
    NON_STANDARD_SUBGRAPH: Record<string, string | string[]>;
    NFTX_UNISWAP_SUBGRAPH: Record<string, string | string[]>;
  };
  /** External & 3rd party URLs used by nftx.js
   * Each item should be an object keyed by network
   */
  urls: {
    NFTX_ROUTER_URL: Record<string, string>;
    NFTX_APR_URL: Record<string, string>;
    NFTX_API_URL: string;
  };
  /** Contract configuration options */
  contracts: {
    /** It's necessary to hardcode the price of ETH on some test networks */
    ethPrice: Record<string, string>;
  };
  /** API keys */
  keys: {
    /** Your specific nftx.js API key, this must be provided in order to use @nftx/api methods */
    NFTX_API: string;
    RESERVOIR: Record<string, string>;
  };
  /** Internal config settings managed by nftx.js */
  internal: {
    source: 'api' | 'live';
    requiredBlockNumber: Record<string, number>;
    apiBlockNumber: Record<string, number>;
    /** The number of blocks to buffer when syncing data from the api */
    blockBuffer: number;
  };
}

const storeSetting = (
  obj: Record<string, any>,
  propertyName: string,
  storageKey: string,
  value: any
) => {
  if (
    typeof window === 'undefined' ||
    typeof window?.localStorage?.getItem !== 'function'
  ) {
    return;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => {
      const key = `${storageKey}_${k}`;
      storeSetting(value, k, key, v);
    });
    return;
  }

  let defaultValue = JSON.stringify(value);

  const key = `nftxjs_itl_${storageKey}`;
  Object.defineProperty(obj, propertyName, {
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
const storeSettings = (obj: Record<string, any>) => {
  Object.entries(obj).forEach(([key, value]) => {
    storeSetting(obj, key, key, value);
  });
};

const defaultConfig: Config = {
  network: Network.Mainnet,
  debug: false,
  subgraph: {
    ERC1155_SUBGRAPH,
    ERC721_SUBGRAPH,
    NFTX_SUBGRAPH,
    NON_STANDARD_SUBGRAPH,
    NFTX_UNISWAP_SUBGRAPH,
  },
  urls: {
    NFTX_ROUTER_URL,
    NFTX_APR_URL,
    NFTX_API_URL,
  },
  contracts: {
    ethPrice: {
      [Network.Goerli]: '2500000000', // $2.5k
      [Network.Sepolia]: '2000000000', // $2k
    },
  },

  keys: {
    NFTX_API: null as unknown as string,
    RESERVOIR: {},
  },

  internal: {
    source: 'api',
    requiredBlockNumber: {
      [Network.Mainnet]: 0,
      [Network.Goerli]: 0,
      [Network.Sepolia]: 0,
    },
    apiBlockNumber: {
      [Network.Mainnet]: 0,
      [Network.Goerli]: 0,
      [Network.Sepolia]: 0,
    },
    blockBuffer: 10,
  },
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

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
  ...defaultConfig,
  /**
   * Set a series of options
   * You can pass in a combination of partial options and they will be merged into the previous configuration
   */
  configure(opts: DeepPartial<Config>) {
    const merged = merge(config, opts, { arrayMerge: (_, arr) => arr });
    storeSettings(merged.internal);
    Object.entries(merged).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config[key] = value;
    });
  },
};

config.configure(defaultConfig);

export default config;
