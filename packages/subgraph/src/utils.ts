/** Addresses must be lowercased when sent to the subgraph, so we'll just automatically do this for any address variables */
export const normalizeIfAddress = <T>(t: T): T => {
  if (typeof t === 'string' && t.toLowerCase().startsWith('0x')) {
    return t.toLowerCase() as unknown as T;
  }
  return t;
};

export type GraphQueryString<R, V> = string & { __r: R; __v: V };
