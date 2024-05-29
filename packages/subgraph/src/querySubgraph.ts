import { type GraphQueryString, interpolateQuery } from './utils';
import { query as sendQuery } from '@nftx/utils';
import { UnknownError } from '@nftx/errors';
import type { QueryBase } from './createQuery';

type Fetch = typeof fetch;
const globalFetch = typeof fetch === 'undefined' ? undefined : fetch;

const formatQuery = ({
  query,
  requiredBlock,
  variables,
}: {
  query: any;
  variables: Record<string, any> | undefined;
  requiredBlock: number | undefined;
}) => {
  if (typeof query !== 'string') {
    query = query.toString();
  }
  if (variables) {
    query = interpolateQuery(query, variables);
  }
  if (requiredBlock) {
    query = query.replace(/\{/, `{\n  _meta { block { number } }`);
  }
  return query;
};

const handleErrors = (errors: any) => {
  // If there was an error with the query, we'll receive an array of errors
  if (errors?.[0]?.message) {
    throw new UnknownError(errors[0].message);
  }
  // Potentially a more generic error (like the endpoint was down)
  if (errors?.message) {
    throw new UnknownError(errors.message);
  }
};

const doSubgraphQuery = async ({
  query,
  url,
  fetch,
}: {
  url: string;
  query: string;
  fetch: Fetch | undefined;
}) => {
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

  handleErrors(errors);

  return data;
};

const queryWhileSubgraphBehind = async ({
  query,
  requiredBlock,
  url,
  fetch,
}: {
  url: string;
  query: string;
  requiredBlock: number | undefined;
  fetch: Fetch | undefined;
}) => {
  // If we're given a required block, we want to add it to the query string, and check it
  // if the subgraph is behind, we'll wait and try again (up to 3 times)
  let blockChecks = 0;

  do {
    const data = await doSubgraphQuery({ query, url, fetch });

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

const queryUrls = async ({
  baseUrl,
  query,
  requiredBlock,
  fetch,
}: {
  baseUrl: string | string[];
  query: string;
  requiredBlock: number | undefined;
  fetch: Fetch | undefined;
}) => {
  // We can be passed a single url or an array of urls
  // If we have an array, we'll try them in order until we get a successful response
  const urls = [baseUrl].flat();

  while (urls.length) {
    try {
      const url = urls.shift();
      // Ignore empty urls (baseUrl could be undefined, or an array could've been built with missing content)
      if (url == null) {
        continue;
      }

      const data = await queryWhileSubgraphBehind({
        query,
        requiredBlock,
        url,
        fetch,
      });

      return data;
    } catch (e) {
      // If there's been an error, we'll try the next url
      // if we've exhausted all urls, throw the most recent error
      if (!urls.length) {
        throw e;
      }
    }
  }
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
  fetch = globalFetch,
  requiredBlock,
}: {
  url: string | string[];
  query: any;
  variables?: Record<string, any>;
  fetch?: Fetch;
  requiredBlock?: number;
}) {
  return queryUrls({
    baseUrl,
    query: formatQuery({ query, requiredBlock, variables }),
    requiredBlock,
    fetch,
  });
}

export default querySubgraph;
