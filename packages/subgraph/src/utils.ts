/** Addresses must be lowercased when sent to the subgraph, so we'll just automatically do this for any address variables */
export const normalizeIfAddress = <T>(t: T): T => {
  if (typeof t === 'string' && t.toLowerCase().startsWith('0x')) {
    return t.toLowerCase() as unknown as T;
  }
  return t;
};

export type GraphQueryString<R, V> = string & { __r: R; __v: V };

/** Inject variables into a query string */
export const interpolateQuery = (
  query: string,
  variables: Record<string, any>
) => {
  return Object.entries(variables).reduce((query, [key, value]) => {
    if (value == null) {
      return query;
    }
    value = normalizeIfAddress(value);
    value = JSON.stringify(value);
    return query.replace(`$${key}`, value);
  }, query);
};
