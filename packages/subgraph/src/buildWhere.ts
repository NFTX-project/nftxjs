import { normalizeIfAddress } from './utils';

/**
 * Helper method that builds a subgraph where clause
 * Takes an object of key/values, removes null items, and returns the stringified result.
 * If you pass any addresses (i.e. 0x0000) it will lowercase them.
 */
const buildWhere = <T extends Record<string, any>>(obj: T) => {
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

export default buildWhere;
