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
