export const reduceObj = <T extends Record<string, any>>(
  obj: T,
  fn: (
    acc: Array<[string, any]>,
    key: string,
    value: T[keyof T]
  ) => Array<[string, any]>
): any => {
  return Object.fromEntries(
    Object.entries(obj).reduce((acc, [key, value]) => {
      return fn(acc, key, value);
    }, [])
  ) as any;
};

export const mapObj = <T extends Record<string, any>>(
  obj: T,
  fn: (key: string, value: T[keyof T]) => [string, any]
): any => {
  return reduceObj(obj, (acc, key, value) => [...acc, fn(key, value)]);
};

export const filterObj = <T extends Record<string, any>>(
  obj: T,
  fn: (key: string, value: T[keyof T]) => boolean
): T => {
  return reduceObj(obj, (acc, key, value) => {
    if (fn(key, value)) {
      return [...acc, [key, value]];
    }
    return acc;
  });
};

export const omitNil = <T extends Record<string, any>>(obj: T) => {
  return filterObj(obj, (_key, value) => value != null);
};

export const toLowerCase = (s: string) => s.toLowerCase();

export const compareByAlpha = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};
