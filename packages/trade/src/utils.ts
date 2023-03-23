export const reduceObj = <T extends Record<string, any>>(
  obj: T,
  fn: (
    acc: Array<[string, any]>,
    key: string,
    value: T[keyof T]
  ) => Array<[string, any]>
): any => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

/**
 * wraps a promise and returns a tuple of [error, result]
 * @param p Promise
 * @returns [error, result]
 */
export const t = <T>(p: Promise<T>): Promise<[any, T]> => {
  return p.then(
    (result) => {
      return [undefined, result] as [any, T];
    },
    (err) => {
      return [err, undefined] as [any, T];
    }
  );
};
