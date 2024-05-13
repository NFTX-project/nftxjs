import { type GraphQueryString, interpolateQuery } from './utils';
import { query as sendQuery } from '@nftx/utils';
import { UnknownError } from '@nftx/errors';
import type { QueryBase } from './createQuery';

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
async function querySubgraph<Q extends QueryBase<any, any>>(args: {
  /** The subgraph url */
  url: string | string[];
  /** A createQuery object */
  query: Q;
  /** The fetch api to use, if you are using a ponyfill, you can manually pass it in here */
  fetch?: Fetch;
}): Promise<Q['__r']>;
async function querySubgraph(args: {
  /** The subgraph url */
  url: string | string[];
  query: string;
  variables?: Record<string, any>;
  fetch?: Fetch;
}): Promise<any>;
async function querySubgraph({
  url: baseUrl,
  query,
  variables,
  fetch = globalFetch,
}: {
  url: string | string[];
  query: any;
  variables?: Record<string, any>;
  fetch?: Fetch;
}) {
  if (typeof query !== 'string') {
    query = query.toString();
  }
  if (variables) {
    query = interpolateQuery(query, variables);
  }

  // Override the default api key with a custom one if set
  const urls = [baseUrl].flat();

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
        throw new UnknownError(errors[0].message);
      }
      if (errors?.message) {
        throw new UnknownError(errors.message);
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
