import config from '@nftx/config';
import { PUBLIC_GRAPH_API_KEY } from '@nftx/constants';

export type GraphQueryString<R, V> = string & { __r: R; __v: V };

/** Processes a graphql string
 * (in actuality this does absolutely nothing and is just a useful way of denoting a graphql query and enables editor syntax highlighting)
 */
function gql(
  s: TemplateStringsArray,
  ...variables: any[]
): GraphQueryString<any, any>;
function gql<R>(
  s: TemplateStringsArray,
  ...variables: any[]
): GraphQueryString<R, any>;
function gql<R, V>(
  s: TemplateStringsArray,
  ...variables: any[]
): GraphQueryString<R, V>;
function gql(s: TemplateStringsArray, ...variables: any[]) {
  return s
    .map((s, i) => {
      if (i === 0) {
        return s;
      }
      return variables[i - 1] + s;
    })
    .join('') as GraphQueryString<any, any>;
}

export { gql };

const normalizeIfAddress = <T>(t: T): T => {
  if (typeof t === 'string' && t.toLowerCase().startsWith('0x')) {
    return t.toLowerCase() as unknown as T;
  }
  return t;
};

/** Takes an object of key/values, removes null items, and returns the stringified result
 * If you pass any addresses (i.e. 0x0000) it will lowercase them by default
 */
export const buildWhere = <T extends Record<string, any>>(obj: T) => {
  const pairs: string[] = Object.entries(obj).reduce((acc, [key, value]) => {
    if (value == null) {
      return acc;
    }
    value = normalizeIfAddress(value);
    value = JSON.stringify(value);
    return [...acc, `${key}: ${value}`];
  }, [] as string[]);

  return `{ ${pairs.join(', ')} }`;
};

const interpolateQuery = (query: string, variables: Record<string, any>) => {
  return Object.entries(variables).reduce((query, [key, value]) => {
    if (value == null) {
      return query;
    }
    value = normalizeIfAddress(value);
    value = JSON.stringify(value);
    return query.replace(`$${key}`, value);
  }, query);
};

type Fetch = typeof fetch;
const globalFetch = typeof fetch === 'undefined' ? undefined : fetch;

/** Sends a request to the subgraph
 * Uses the fetch api under the hood so if running in node you'll need to polyfill global.fetch
 */
async function querySubgraph<Q extends GraphQueryString<any, any>>(args: {
  /** The subgraph url */
  url: string;
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
// async function querySubgraph<T>(args: {
//   /** The subgraph url */
//   url: string;
//   /** A stringified graphql query */
//   query: string;
//   /** An object containing variables to inject into the query
//    * To use variables in your query, prefix them with $
//    * For example: (where: { id: $vaultAddress })
//    */
//   variables?: Record<string, any>;
//   /** The fetch api to use, if you are using a ponyfill, you can manually pass it in here */
//   fetch?: Fetch;
// }): Promise<T>;
async function querySubgraph({
  url: baseUrl,
  query,
  variables,
  fetch = globalFetch,
}: {
  url: string;
  query: string;
  variables?: Record<string, any>;
  fetch?: Fetch;
}) {
  if (variables) {
    query = interpolateQuery(query, variables);
  }

  // Override the default api key with a custom one if set
  let url = baseUrl;
  if (
    config.subgraph.API_KEY &&
    url.includes(PUBLIC_GRAPH_API_KEY) &&
    config.subgraph.API_KEY !== PUBLIC_GRAPH_API_KEY
  ) {
    url = url.replace(PUBLIC_GRAPH_API_KEY, config.subgraph.API_KEY);
  }

  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} with query ${query}`);
  }

  const { data, errors } = await response.json();

  if (errors?.[0]?.message) {
    throw new Error(errors[0].message);
  }

  return data;
}

export { querySubgraph };
