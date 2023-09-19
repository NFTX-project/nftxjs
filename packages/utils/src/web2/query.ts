import { parseJson, stringifyJson } from './json';

type Fetch = typeof fetch;
const globalFetch = typeof fetch === 'undefined' ? undefined : fetch;

type Args = {
  url: string;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  method?: string;
  retries?: number;
  fetch?: Fetch;
};

const query = async <T>(args: Args): Promise<T> => {
  const {
    url,
    query: queryData = {},
    headers = {},
    method = 'GET',
    cache,
    retries = 0,
    fetch = globalFetch,
  } = args;

  if (fetch == null) {
    throw new Error(
      'Could not find fetch api. You may need to import a polyfill'
    );
  }

  const uri = new URL(url);

  if (method === 'GET') {
    Object.entries(queryData).forEach(([key, value]) => {
      if (value == null) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v == null) {
            return;
          }
          uri.searchParams.append(key, v);
        });
      } else {
        uri.searchParams.set(key, value);
      }
    });
  }
  const body = method === 'GET' ? undefined : stringifyJson(queryData, true);

  const response = await fetch(uri.toString(), {
    method,
    headers,
    body,
    cache,
  });
  // If we get a 5xx response we want to retry the request 3 times
  if (response.status >= 500 && response.status <= 599 && retries < 3) {
    await new Promise((res) => setTimeout(res, 1000));
    return query({ ...args, retries: retries + 1 });
  }
  // Any other error we want to immediately throw
  if (!response.ok) {
    throw new Error(`Failed to fetch ${uri}`);
  }

  // Get the text response as we need to manually parse big numbers
  const text = await response.text();
  const contentType = response.headers.get('Content-Type');
  // We should always be receiving a json response, if not then something's gone wrong
  if (!contentType?.includes('application/json')) {
    throw new Error(
      `Incorrect response type. Expected application/json but received ${contentType}`
    );
  }
  const data = parseJson(text);

  return data as T;
};

export default query;
