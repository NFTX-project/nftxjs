type Fetch = typeof fetch;
const globalFetch = typeof fetch === 'undefined' ? undefined : fetch;
type Stringify = typeof JSON.stringify;
type Parse = typeof JSON.parse;

export class QueryError extends Error {
  constructor(
    public response: Response,
    public status: number,
    public data: any,
    message: string
  ) {
    super(message);
  }
}

type Args = Omit<RequestInit, 'headers' | 'method' | 'body'> & {
  url: string | string[];
  query?: Record<string, any> | string;
  data?: Record<string, any> | string;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
  maxAttempts?: number;
  attempt?: number;
  fetch?: Fetch;
  stringify?: Stringify;
  parse?: Parse;
};

const getBody = ({
  sourceData,
  stringify,
}: {
  sourceData: unknown;
  stringify: Stringify;
}) => {
  if (sourceData == null) {
    return undefined;
  }
  if (sourceData instanceof FormData) {
    return sourceData;
  }
  if (typeof sourceData === 'string') {
    return sourceData;
  }
  return stringify(sourceData);
};

const getSearchParams = ({
  search,
  query: sourceData,
}: {
  query: unknown;
  search: string;
}) => {
  let searchParams = new URLSearchParams(search);

  if (typeof sourceData === 'string' && sourceData) {
    if (sourceData.startsWith('?')) {
      searchParams = new URLSearchParams(sourceData);
    } else {
      searchParams = new URLSearchParams('?' + sourceData);
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
          searchParams.append(key, v);
        });
      } else {
        searchParams.set(key, value);
      }
    });
  }

  return searchParams;
};

const resolveUrl = (url: string | undefined) => {
  if (!url) {
    return;
  }
  if (url.startsWith('/') && typeof window !== 'undefined') {
    return new URL(`${window.location.origin}${url}`);
  }
  return new URL(url);
};

const query = async <T>(args: Args): Promise<T> => {
  const {
    url: baseUrl,
    headers = {},
    method = 'GET',
    maxAttempts = 3,
    attempt = 1,
    fetch = globalFetch,
    parse = JSON.parse,
    stringify = JSON.stringify,
    data: _data,
    query: _query,
    ...requestInit
  } = args;

  const sourceData = method === 'GET' ? undefined : _data;
  const sourceQuery = method === 'GET' ? _query || _data : _query;

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
      const uri = resolveUrl(urls.shift());
      if (!uri) {
        continue;
      }

      uri.search = getSearchParams({
        query: sourceQuery,
        search: uri.search,
      }).toString();

      const body = getBody({ sourceData, stringify });

      if (!headers['Content-Type'] && method !== 'GET') {
        if (sourceData instanceof FormData) {
          // Don't need to set the content type for a raw FormData instance
          // headers['Content-Type'] = 'multipart/form-data';
        } else if (sourceData && typeof sourceData === 'object') {
          headers['Content-Type'] = 'application/json';
        }
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
        const text = await response.text();
        if (contentType?.includes('application/json')) {
          const json = parse(text);
          throw new QueryError(
            response,
            response.status,
            json,
            `Error fetching ${uri}`
          );
        } else {
          throw new QueryError(response, response.status, {}, text);
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
