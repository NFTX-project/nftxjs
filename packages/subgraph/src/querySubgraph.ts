import { type GraphQueryString } from './utils';
import { query as sendQuery } from '@nftx/utils';
import type { QueryBase } from './createQuery';
import { queryGraph } from '@nftx/query';

type Fetch = typeof fetch;

const formatQuery = ({
  query,
  requiredBlock,
}: {
  query: any;
  requiredBlock: number | undefined;
}) => {
  if (typeof query !== 'string') {
    query = query.toString();
  }
  if (requiredBlock) {
    query = query.replace(/\{/, `{\n  _meta { block { number } }`);
  }
  return query;
};

const queryWhileSubgraphBehind = async ({
  query,
  requiredBlock,
  url,
  fetch,
  variables,
}: {
  url: string | string[];
  query: string;
  requiredBlock: number | undefined;
  fetch: Fetch | undefined;
  variables: Record<string, any> | undefined;
}) => {
  // If we're given a required block, we want to add it to the query string, and check it
  // if the subgraph is behind, we'll wait and try again (up to 3 times)
  let blockChecks = 0;

  do {
    const data = await queryGraph<Record<string, any>>({
      url,
      query,
      sendQuery,
      fetch,
      variables,
    });

    // If we're not checking for a specific block, we can stop here
    if (!requiredBlock) {
      return data;
    }
    // If the subgraph is up to date, we can stop here
    if (Number(data?._meta?.block?.number) >= requiredBlock) {
      delete data._meta;
      return data;
    }
    // If we've tried 3 times and the subgraph is still behind, throw an error
    if (blockChecks >= 2) {
      throw new Error(
        `Subgraph at ${url} is not up to date. Expected block ${requiredBlock}, got ${data?._meta?.block?.number}`
      );
    }
    // Wait 5s and try again
    blockChecks += 1;
    await new Promise((res) => setTimeout(res, 5000));
  } while (blockChecks < 3);

  throw new Error(`Subgraph at ${url} is not up to date`);
};

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
  /** A block number that the subgraph must be up to in order to be considered up to date.
   * If the subgraph block is less than this number, it will wait and re-attempt 3 times */
  requiredBlock?: number;
}): Promise<Q['__r']>;
async function querySubgraph<Q extends QueryBase<any, any>>(args: {
  /** The subgraph url */
  url: string | string[];
  /** A createQuery object */
  query: Q;
  /** The fetch api to use, if you are using a ponyfill, you can manually pass it in here */
  fetch?: Fetch;
  /** A block number that the subgraph must be up to in order to be considered up to date.
   * If the subgraph block is less than this number, it will wait and re-attempt 3 times */
  requiredBlock?: number;
}): Promise<Q['__r']>;
async function querySubgraph<T>(args: {
  url: string | string[];
  query: string;
  fetch?: Fetch;
  variables?: Record<string, any>;
  requiredBlock?: number;
}): Promise<T>;
async function querySubgraph(args: {
  /** The subgraph url */
  url: string | string[];
  query: string;
  variables?: Record<string, any>;
  fetch?: Fetch;
  requiredBlock?: number;
}): Promise<any>;
async function querySubgraph({
  url: baseUrl,
  query,
  variables,
  fetch,
  requiredBlock,
}: {
  url: string | string[];
  query: any;
  variables?: Record<string, any>;
  fetch?: Fetch;
  requiredBlock?: number;
}) {
  return await queryWhileSubgraphBehind({
    query: formatQuery({ query, requiredBlock }),
    requiredBlock,
    url: baseUrl,
    fetch,
    variables,
  });
}

export default querySubgraph;
