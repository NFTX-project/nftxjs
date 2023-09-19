export const parseJson = <T extends Record<string, any>>(str: string): T => {
  return JSON.parse(str, (key, value) => {
    if (typeof value === 'string' && value.startsWith('BigNumber(')) {
      const [, v] = value.match(/BigNumber\((.+)?\)/) ?? [];
      return BigInt(v);
    }
    return value;
  });
};

export const stringifyJson = <T extends Record<string, any>>(
  obj: T,
  escapeBigNumber: boolean
): string => {
  return JSON.stringify(obj, (key, value) => {
    if (key === '_id') {
      return undefined;
    }
    if (typeof value === 'bigint') {
      if (escapeBigNumber) {
        return `BigNumber(${value})`;
      }
      return value.toString();
    }
    return value;
  });
};

export const formatJson = <T extends Record<string, any>>(
  obj: T,
  escapeBigNumber: boolean
): T => {
  return JSON.parse(stringifyJson(obj, escapeBigNumber));
};
