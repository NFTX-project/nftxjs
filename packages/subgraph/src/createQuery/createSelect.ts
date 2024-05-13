import type { QueryBase } from './queryTypes';
import type { Select, SelectFieldPrimitives } from './selectTypes';

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
        case 'as':
          return (v: string) => {
            return createSelect({ name, fields, alias: v });
          };
        case 'on':
          return (v: string, cb: (s: any) => SelectFieldPrimitives) => {
            const fields = cb(proxy);
            return createSelect({ name, fields, alias, on: v });
          };
        case '$type':
          return 'select';
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
