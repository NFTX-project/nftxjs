import { normalizeIfAddress } from './utils';

const buildPrimative = (value: any) => {
  switch (typeof value) {
    case 'string':
      // If the value is an address, we want to normalize it
      // Often we hit issues where the subgraph has lowercase addresses but we're passing uppercase values in
      // resulting in 0 results
      value = normalizeIfAddress(value);
      break;
    case 'bigint':
      // JSON.stringify doesn't work on bigints so we need to handle them separately
      return value.toString();
    default:
      break;
  }

  // Stringify the primitive value
  return JSON.stringify(value);
};
const buildNestedFilter = (
  key: string,
  value: Record<string, any>
): [string, string] | null => {
  // Handle nested queries
  if (key.endsWith('_') === false) {
    key = `${key}_`;
  }

  // We need to make sure this isn't an empty object
  const isEmpty = Object.values(value).every((v) => v == null);
  if (isEmpty) {
    return null;
  }

  const valueStr = buildObject(value);

  return [key, valueStr];
};
const buildArray = (key: string, arr: any[]): [string, string] => {
  if (key.endsWith('_in') === false) {
    key = `${key}_in`;
  }

  // return [key, JSON.stringify(arr.map((el) => buildPrimative(el)))];
  return [key, `[${arr.map((el) => buildPrimative(el))}]`];
};
const buildKeyValuePair = (
  key: string,
  value: any
): [string, string] | null => {
  // Strip out null
  if (value == null) {
    return null;
  }
  if (Array.isArray(value)) {
    return buildArray(key, value);
  }
  if (typeof value === 'object') {
    return buildNestedFilter(key, value);
  }
  return [key, buildPrimative(value)];
};
const buildObject = (obj: any) => {
  const keyValues = Object.entries(obj).reduce((acc, [key, value]) => {
    const pair = buildKeyValuePair(key, value);
    if (!pair) {
      return acc;
    }
    return [...acc, pair];
  }, [] as [string, string][]);

  return ['{', keyValues.map((pair) => pair.join(': ')).join(', '), '}'].join(
    ' '
  );
};

/**
 * Helper method that builds a subgraph where clause
 * Takes an object of key/values, removes null items, and returns the stringified result.
 * If you pass any addresses (i.e. 0x0000) it will lowercase them.
 * If you pass in a deeply-nested object it will translate it into a nested query
 */
const buildWhere = <T extends Record<string, any>>(obj: T) => {
  return buildObject(obj);
};

export default buildWhere;
