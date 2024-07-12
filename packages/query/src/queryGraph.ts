import { QueryBase } from './createQuery';
import sendQuery from './query';
import { normalizeIfAddress } from './utils';

type Query = typeof sendQuery;
const defaultSendQuery = sendQuery;

type SendQueryArgs = Omit<Parameters<Query>[0], 'url' | 'data'>;

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

const formatQuery = ({
  query,
  variables,
}: {
  query: any;
  variables: Record<string, any> | undefined;
}) => {
  if (typeof query !== 'string') {
    query = query.toString();
  }
  if (variables) {
    query = interpolateQuery(query, variables);
  }
  return query;
};

const handleErrors = (errors: any) => {
  // If there was an error with the query, we'll receive an array of errors
  if (errors?.[0]?.message) {
    throw new Error(errors[0].message);
  }
  // Potentially a more generic error (like the endpoint was down)
  if (errors?.message) {
    throw new Error(errors.message);
  }
};

const sendGraphQuery = async ({
  url,
  query,
  sendQuery,
  headers = {},
  ...rest
}: SendQueryArgs & { url: string; query: string; sendQuery: Query }) => {
  const { data, errors } = await sendQuery<{
    errors: { message: string }[] & { message: string };
    data: any;
  }>({
    url,
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json', ...headers },
    method: 'POST',
    data: { query },
    ...rest,
  });

  handleErrors(errors);

  return data;
};

const queryUrls = async ({
  baseUrl,
  query,
  ...rest
}: Omit<SendQueryArgs, 'url'> & {
  baseUrl: string | string[];
  query: string;
  sendQuery: Query;
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

      const data = await sendGraphQuery({
        query,
        url,
        ...rest,
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

async function queryGraph<Q extends QueryBase<any, any>>(
  args: SendQueryArgs & {
    url: string | string[];
    query: Q;
    sendQuery?: Query;
  }
): Promise<unknown>;
async function queryGraph<T>(
  args: SendQueryArgs & {
    url: string | string[];
    query: string;
    variables?: Record<string, any>;
    sendQuery?: Query;
  }
): Promise<T>;
async function queryGraph({
  query,
  url,
  sendQuery = defaultSendQuery,
  variables,
  ...rest
}: SendQueryArgs & {
  url: string | string[];
  query: any;
  variables?: Record<string, any>;
  sendQuery?: Query;
}) {
  if (!fetch) {
    throw new Error(
      'Could not find fetch api. You may need to import a polyfill'
    );
  }

  return queryUrls({
    baseUrl: url,
    query: formatQuery({ query, variables }),
    fetch,
    sendQuery,
    ...rest,
  });
}

export default queryGraph;
