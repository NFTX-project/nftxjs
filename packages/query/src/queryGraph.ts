import { QueryBase } from './createQuery';
import sendQuery from './query';
import { normalizeIfAddress } from './utils';

const defaultSendQuery = sendQuery;

type SendQueryArgs = Omit<Parameters<typeof sendQuery>[0], 'query'>;
type BaseArgs = Omit<SendQueryArgs, 'data'>;
type Query = <T>(
  args: Omit<Parameters<typeof sendQuery>[0], 'query'>
) => Promise<T>;

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
}: BaseArgs & { query: string; sendQuery: Query }) => {
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

async function queryGraph<Q extends QueryBase<any, any>>(
  args: BaseArgs & {
    url: string | string[];
    query: Q;
    sendQuery?: Query;
  }
): Promise<Q['__r']>;
async function queryGraph<T>(
  args: BaseArgs & {
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
}: BaseArgs & {
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

  return sendGraphQuery({
    url,
    query: formatQuery({ query, variables }),
    fetch,
    sendQuery,
    ...rest,
  });
}

export default queryGraph;
