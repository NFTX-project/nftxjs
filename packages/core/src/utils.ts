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
