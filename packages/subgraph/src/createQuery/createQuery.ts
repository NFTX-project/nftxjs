import formatQuery from './formatQuery';
import type { G, Query, Select, Where } from './types';

const createQueryObj = (args: {
  name: string;
  g: G<any>;
  first?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: Where<any>;
  select?: Select<any>;
  id?: string;
}): Query<any, any> => {
  const query = {
    first: (limit: number) => {
      return createQueryObj({
        ...args,
        first: limit,
      });
    },
    orderBy: (field: any) => {
      return createQueryObj({ ...args, orderBy: field });
    },
    orderDirection: (orderDirection: string) => {
      return createQueryObj({ ...args, orderDirection });
    },
    where: (where: Where<any>) => {
      return createQueryObj({ ...args, where });
    },
    id: (id: string) => {
      return createQueryObj({ ...args, id });
    },
    select: (select: Select<any>) => {
      return createQueryObj({ ...args, select });
    },
    toString: () => {
      return formatQuery(args);
    },
    __r: undefined as any,
  };

  Object.defineProperty(query, '__isG', { value: true, enumerable: true });

  return query;
};

const stringify = (queries: any[]) => {
  const content = queries
    .map((q) => {
      const a = q.toString().split('\n');
      a.shift();
      a.pop();
      return a.join('  \n');
    })
    .join('\n\n');

  return ['{', content, '}'].join('\n');
};

const g: any = new Proxy(
  {},
  {
    get(_, key: string) {
      switch (key) {
        case 'toString':
          return (...queries: any[]) => stringify(queries);
        case 'combine':
          return (...queries: any[]) => {
            return {
              toString() {
                return stringify(queries);
              },
            };
          };
        default:
          return createQueryObj({ name: key, g });
      }
    },
  }
);

const createQuery = <Schema extends Record<string, any>>(): G<Schema> => g;

export default createQuery;
