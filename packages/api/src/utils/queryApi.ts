import config from '@nftx/config';
import { checkApiBlock } from './nsync';

const parseResponse = (str: string) => {
  return JSON.parse(str, (key, value) => {
    if (typeof value === 'string' && value.startsWith('BigNumber(')) {
      const [, v] = value.match(/BigNumber\((.+)?\)/) ?? [];
      return BigInt(v);
    }
    return value;
  });
};

const queryApi = async <T>({
  url,
  query = {},
  method = 'GET',
}: {
  url: string;
  query?: Record<string, any>;
  method?: string;
}) => {
  checkApiBlock();
  const uri = new URL(url, config.urls.NFTX_API_URL);
  // Tell the api to wrap all big numbers in an identifier so we can find and deserialise them
  uri.searchParams.set('ebn', 'true');
  // Add all query params
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
  // Append a cache-busting key to the query
  const { cacheKey } = config.internal;
  if (cacheKey) {
    uri.searchParams.set('_c', cacheKey);
  }
  // Set the source
  if (config.internal.source !== 'api') {
    uri.searchParams.set('source', config.internal.source);
  }
  // Add the api key header
  const headers: Record<string, string> = {};
  if (config.keys.NFTX_API) {
    headers['Authorization'] = config.keys.NFTX_API;
  } else {
    console.warn('No NFTX API key found');
  }

  // Send the request
  const response = await fetch(uri.toString(), { method, headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${uri}`);
  }
  // We get the text response as we need to manually parse big numbers in the payload
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

export default queryApi;
