type Fetch = typeof fetch;
const globalFetch = typeof fetch === 'undefined' ? undefined : fetch;
type Stringify = typeof JSON.stringify;
type Parse = typeof JSON.parse;

class QueryError extends Error {
  constructor(public response: Response, public data: any, message: string) {
    super(message);
  }
}

type Args = Omit<RequestInit, 'headers' | 'method' | 'body'> & {
  url: string | string[];
  data?: Record<string, any> | string;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
  maxAttempts?: number;
  attempt?: number;
  fetch?: Fetch;
  stringify?: Stringify;
  parse?: Parse;
};

const query = async <T>(args: Args): Promise<T> => {
  const {
    url: baseUrl,
    data: sourceData,
    headers = {},
    method = 'GET',
    maxAttempts = 3,
    attempt = 0,
    fetch = globalFetch,
    parse = JSON.parse,
    stringify = JSON.stringify,
    ...requestInit
  } = args;

  if (fetch == null) {
    throw new Error(
      'Could not find fetch api. You may need to import a polyfill'
    );
  }
  const urls = Array.isArray(baseUrl) ? baseUrl : [baseUrl];

  if (!urls.some(Boolean)) {
    throw new Error('No URL provided');
  }

  while (urls.length) {
    try {
      let url = urls.shift();
      if (!url) {
        continue;
      }
      if (url.startsWith('/') && typeof window !== 'undefined') {
        url = `${window.location.origin}${url}`;
      }
      const uri = new URL(url);

      if (method === 'GET') {
        if (typeof sourceData === 'string' && sourceData) {
          if (sourceData.startsWith('?')) {
            uri.search = sourceData;
          } else {
            uri.search = '?' + sourceData;
          }
        } else if (sourceData) {
          Object.entries(sourceData).forEach(([key, value]) => {
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
      }

      const body =
        method === 'GET'
          ? undefined
          : typeof sourceData === 'string'
          ? sourceData
          : stringify(sourceData);

      if (method !== 'GET' && typeof sourceData === 'object') {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(uri.toString(), {
        method,
        body,
        headers,
        ...requestInit,
      });

      if (
        response.status >= 500 &&
        response.status <= 599 &&
        attempt < maxAttempts
      ) {
        await new Promise((res) => setTimeout(res, 1000));
        return query({ ...args, attempt: attempt + 1 });
      }
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        if (contentType?.includes('application/json')) {
          const json = await response.json();
          throw new QueryError(response, json, `Error fetching ${url}`);
        } else {
          const text = await response.text();
          throw new QueryError(response, {}, text);
        }
      }

      const text = await response.text();
      if (contentType?.includes('application/json')) {
        return parse(text);
      } else {
        return text as T;
      }
    } catch (e) {
      if (!urls.length) {
        throw e;
      }
    }
  }

  throw new Error();
};

export default query;
