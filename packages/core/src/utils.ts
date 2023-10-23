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
