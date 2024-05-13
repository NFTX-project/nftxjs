export type WithoutNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

export type Defined<T> = WithoutNull<Required<T>>;
