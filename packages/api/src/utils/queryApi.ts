import config from '@nftx/config';
import { query as sendQuery } from '@nftx/utils';

const queryApi = async <T>({
  url,
  query: givenQuery = {},
  method = 'GET',
}: {
  url: string;
  query?: Record<string, any>;
  method?: string;
}) => {
  const uri = new URL(url, config.urls.NFTX_API_URL);
  const query: Record<string, any> = {
    ...givenQuery,
    ebn: 'true',
    source: config.internal.source,
  };
  // Add the api key header
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (config.keys.NFTX_API) {
    headers['Authorization'] = config.keys.NFTX_API;
  } else {
    console.warn('No NFTX API key found');
  }

  // Send the request
  const data = await sendQuery<T>({
    url: uri.toString(),
    method,
    headers,
    query,
  });

  return data;
};

export default queryApi;
