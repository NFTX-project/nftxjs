import type { QueryBase } from './createQuery';

type WithoutNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};
type Defined<T> = WithoutNull<Required<T>>;

export type SelectFieldPrimitive = {
  $name: string;
  $fields: SelectFieldPrimitive[];
  $alias: string;
  $on: string;
  as: (alias: string) => SelectFieldPrimitive;
};

export type SelectFieldPrimitives = Array<
  SelectFieldPrimitive | SelectFieldPrimitives | QueryBase<any, any>
>;

type SelectFieldObjectFn<Def> = (
  select: ((s: Select<Def>) => SelectFieldPrimitives) | QueryBase<any, any>
) => SelectFieldPrimitive;

type SelectFieldObject<Field> = Field extends Array<string | number | bigint>
  ? SelectFieldPrimitive
  : SelectFieldObjectFn<Field> & Select<Field>;

type SelectField<Field> = Field extends object
  ? SelectFieldObject<Field>
  : SelectFieldPrimitive;

type SelectX<Def> = {
  [K in keyof Def]: SelectField<Def[K]>;
} & {
  on: <T = Def>(
    type: string,
    cb: (s: Select<Defined<T>>) => SelectFieldPrimitives
  ) => SelectFieldPrimitives;
};
export type Select<Def> = SelectX<
  Defined<Def extends Array<any> ? Def[0] : Def>
>;

const stringify = (element: SelectFieldPrimitive): string => {
  if ('toStringInner' in element) {
    return (element as any).toStringInner();
  }
  const output: string[] = [];
  const { $alias, $fields, $name, $on } = element;
  if ($name) {
    if ($alias) {
      output.push($alias, ': ');
    }
    output.push($name);
  }
  if ($on) {
    output.push('... on ', $on, ' ');
  }
  if ($fields) {
    output.push('{\n', $fields.map(stringify).join('\n'), '\n}');
  }
  return output.join('');
};

const createSelect = <Def>({
  alias,
  fields,
  name,
  on,
}: {
  name?: string;
  fields?: any[];
  alias?: string;
  on?: string;
} = {}): Select<Def> => {
  const fn = (
    cb: ((s: any) => SelectFieldPrimitives) | QueryBase<any, any>
  ) => {
    if (typeof cb === 'function') {
      const fields = cb(proxy);
      return createSelect({ name, fields });
    }
    if (
      cb &&
      typeof cb === 'object' &&
      typeof (cb as any).rename === 'function'
    ) {
      return (cb as any).rename(name);
    }
    throw new Error(`Invalid field callback provided: [${typeof cb}]`);
  };

  const proxy: any = new Proxy(fn, {
    get(_, fieldName) {
      switch (fieldName) {
        case 'toString':
          return () => stringify(proxy);
        case 'as':
          return (v: string) => {
            return createSelect({ name, fields, alias: v });
          };
        case 'on':
          return (v: string, cb: (s: any) => SelectFieldPrimitives) => {
            const fields = cb(proxy);
            return createSelect({ name, fields, alias, on: v });
          };
        case '$on':
          return on;
        case '$alias':
          return alias;
        case '$name':
          return name;
        case '$fields':
          return fields;
        default:
          return createSelect({ name: fieldName as string });
      }
    },
  });

  return proxy;
};

export default createSelect;
