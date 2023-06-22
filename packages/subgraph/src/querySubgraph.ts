import config from '@nftx/config';
import { PUBLIC_GRAPH_API_KEY } from '@nftx/constants';
import { type GraphQueryString, interpolateQuery } from './utils';
import sendQuery from './query';

type Fetch = typeof fetch;
const globalFetch = typeof fetch === 'undefined' ? undefined : fetch;

/** Sends a request to the subgraph
 * Uses the fetch api under the hood so if running in node you'll need to polyfill global.fetch
 */
async function querySubgraph<Q extends GraphQueryString<any, any>>(args: {
  /** The subgraph url */
  url: string | string[];
  /** A stringified graphql query */
  query: Q;
  /** An object containing variables to inject into the query
   * To use variables in your query, prefix them with $
   * For example: (where: { id: $vaultAddress })
   */
  variables?: Q['__v'];
  /** The fetch api to use, if you are using a ponyfill, you can manually pass it in here */
  fetch?: Fetch;
}): Promise<Q['__r']>;
async function querySubgraph({
  url: baseUrl,
  query,
  variables,
  fetch = globalFetch,
}: {
  url: string | string[];
  query: string;
  variables?: Record<string, any>;
  fetch?: Fetch;
}) {
  if (variables) {
    query = interpolateQuery(query, variables);
  }

  // Override the default api key with a custom one if set
  const urls = [baseUrl].flat().map((url) => {
    if (
      config.subgraph.API_KEY &&
      url.includes(PUBLIC_GRAPH_API_KEY) &&
      config.subgraph.API_KEY !== PUBLIC_GRAPH_API_KEY
    ) {
      url = url.replace(PUBLIC_GRAPH_API_KEY, config.subgraph.API_KEY);
    }
    return url;
  });

  while (urls.length) {
    try {
      const url = urls.shift();
      if (url == null) {
        continue;
      }

      const { data, errors } = await sendQuery<{
        errors: { message: string }[] & { message: string };
        data: any;
      }>({
        url,
        cache: 'no-cache',
        fetch,
        headers: { 'Content-Type': 'application/json' },
        query: { query },
        method: 'POST',
      });

      // If there was an error with the query, we'll receive an array of errors
      if (errors?.[0]?.message) {
        throw new Error(errors[0].message);
      }
      if (errors?.message) {
        throw new Error(errors.message);
      }

      return data;
    } catch (e) {
      if (!urls.length) {
        throw e;
      }
    }
  }
}

export default querySubgraph;
