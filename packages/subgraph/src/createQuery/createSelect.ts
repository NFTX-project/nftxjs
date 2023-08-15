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
  select: (s: Select<Def>) => SelectFieldPrimitives
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

const createSelect = <Def>(
  name?: string,
  fields?: any[],
  alias?: string,
  on?: string
): Select<Def> => {
  const fn = (cb: (s: any) => SelectFieldPrimitives) => {
    return createSelect(name, cb(proxy));
  };

  const proxy: any = new Proxy(fn, {
    get(_, fieldName) {
      switch (fieldName) {
        case 'toString':
          return () => stringify(proxy);
        case 'as':
          return (v: string) => {
            return createSelect(name, fields, v);
          };
        case 'on':
          return (v: string, cb: (s: any) => SelectFieldPrimitives) => {
            return createSelect(name, cb(proxy), alias, v);
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
          return createSelect(fieldName as string);
      }
    },
  });

  return proxy;
};

export default createSelect;
