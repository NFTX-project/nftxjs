import { hydrate, hydrateResponse } from '@nftx/errors';
import { parseJson, stringifyJson } from './json';
import { query as sendQuery } from '@nftx/query';

type Fetch = typeof fetch;

type Args = {
  url: string;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  method?: string;
  fetch?: Fetch;
  data?: any;
};

const query = async <T>(args: Args): Promise<T> => {
  const {
    url,
    data: _data,
    query: queryData = _data,
    headers = {},
    method = 'GET',
    cache,
    fetch,
  } = args;

  try {
    return await sendQuery<T>({
      url,
      cache,
      method,
      fetch,
      headers,
      data: queryData,
      stringify: (value) => stringifyJson(value, true),
      parse: parseJson,
    });
  } catch (e: any) {
    if (e.response) {
      throw hydrateResponse({ status: e.response.status, body: e.data });
    }
    throw hydrate(e);
  }
};

export default query;
