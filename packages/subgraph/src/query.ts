const parseResponse = (str: string) => {
  return JSON.parse(str, (key, value) => {
    if (typeof value === 'string' && value.startsWith('BigNumber(')) {
      const [, v] = value.match(/BigNumber\((.+)?\)/) ?? [];
      return BigInt(v);
    }
    return value;
  });
};

type Fetch = typeof fetch;
const globalFetch = typeof fetch === 'undefined' ? undefined : fetch;

type Args = {
  url: string;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  method?: string;
  fetch?: Fetch;
};

const query = async <T>({
  url,
  query = {},
  headers = {},
  method = 'GET',
  cache,
  fetch = globalFetch,
}: Args) => {
  if (fetch == null) {
    throw new Error(
      'Could not find fetch api. You may need to import a polyfill'
    );
  }

  const uri = new URL(url);

  if (method === 'GET') {
    Object.entries(query).forEach(([key, value]) => {
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
  const body = method === 'GET' ? undefined : JSON.stringify(query);

  const response = await fetch(uri.toString(), {
    method,
    headers,
    body,
    cache,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${uri}`);
  }

  // We get the text response as we need to manually parse big numbers
  const text = await response.text();
  const contentType = response.headers.get('Content-Type');
  if (!contentType?.includes('application/json')) {
    throw new Error(
      `Incorrect response type. Expected application/json but received ${contentType}`
    );
  }
  const data = parseResponse(text);

  return data as T;
};

export default query;
