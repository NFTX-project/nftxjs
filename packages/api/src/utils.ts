import { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';

let cacheKey: string;

(() => {
  if (typeof window !== 'undefined' && window?.localStorage?.getItem) {
    cacheKey = window.localStorage.getItem('NFTXJS_CACHE_KEY');
  }
})();

export const bustCache = () => {
  cacheKey = Math.floor(Math.random() * 100000).toString(16);
  if (typeof window !== 'undefined') {
    window.localStorage?.setItem?.('NFTXJS_CACHE_KEY', cacheKey);
  }
};

export const queryApi = async <T>({
  url,
  query = {},
  method = 'GET',
}: {
  url: string;
  query?: Record<string, any>;
  method?: string;
}) => {
  const uri = new URL(url, config.urls.NFTX_API_URL);
  uri.searchParams.set('ebn', 'true');
  Object.entries(query).forEach(([key, value]) => {
    if (value == null) {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v == null) {
          return;
        }
        uri.searchParams.append(key, v);
      });
    } else {
      uri.searchParams.set(key, value);
    }
  });
  if (cacheKey) {
    uri.searchParams.set('_c', cacheKey);
  }
  const headers: Record<string, string> = {};
  if (config.keys.NFTX_API) {
    headers['Authorization'] = config.keys.NFTX_API;
  }

  const response = await fetch(uri.toString(), { method, headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${uri}`);
  }
  const text = await response.text();
  const contentType = response.headers.get('Content-Type');
  if (!contentType?.includes('application/json')) {
    throw new Error(
      `Incorrect response type, expected application/json but received ${contentType}`
    );
  }

  const data = parseResponse(text);

  return data as T;
};

const parseResponse = (str: string) => {
  return JSON.parse(str, (key, value) => {
    if (typeof value === 'string' && value.startsWith('BigNumber(')) {
      const [, v] = value.match(/BigNumber\((.+)?\)/);
      return BigNumber.from(v);
    }
    return value;
  });
};
