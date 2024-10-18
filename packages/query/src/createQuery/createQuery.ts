import type { Query, QueryBase, RootQuery } from './queryTypes';
import type { SelectFieldPrimitives, Select } from './selectTypes';
import type { WhereStatements, Where } from './whereTypes';
import createWhere from './createWhere';
import createSelect from './createSelect';
import stringifyQuery from './stringifyQuery';
import prettyFormat from './prettyFormat';

const combineQueries = (q1: any, q2: any) => {
  const combined = {
    toString() {
      const content = combined.stringify();

      return ['{', content, '}'].join('\n');
    },
    stringify() {
      return [q1, q2]
        .map((q) => {
          return q.stringify();
        })
        .join('\n\n');
    },
    combine(q3: any) {
      return combineQueries(combined, q3);
    },
  };

  return combined;
};

const createQueryObj = (args: {
  name: string;
  alias?: string;
  first?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: WhereStatements;
  select?: SelectFieldPrimitives;
  id?: string;
}): Query<any, any> => {
  const query = {
    first: (limit: number) => {
      return createQueryObj({
        ...args,
        first: limit,
      });
    },
    skip: (limit: number) => {
      return createQueryObj({
        ...args,
        skip: limit,
      });
    },
    orderBy: (field: any) => {
      return createQueryObj({ ...args, orderBy: field });
    },
    orderDirection: (orderDirection: string) => {
      return createQueryObj({ ...args, orderDirection });
    },
    id: (id: string) => {
      return createQueryObj({ ...args, id });
    },
    where: (cb: (w: Where<any>) => WhereStatements) => {
      const whereApi = createWhere<any>();
      let where = cb(whereApi);
      if (!Array.isArray(where[0])) {
        where = [where];
      }
      return createQueryObj({ ...args, where });
    },
    select: (cb: (s: Select<any>) => SelectFieldPrimitives) => {
      const proxy = createSelect<any>();
      const select = cb(proxy);
      return createQueryObj({
        ...args,
        select,
      });
    },
    rename: (newName: string) => {
      return createQueryObj({
        ...args,
        name: newName,
      });
    },
    as: (newName: string) => {
      return createQueryObj({
        ...args,
        alias: newName,
      });
    },
    stringify: () => {
      return stringifyQuery(args);
    },
    toString: () => {
      const str = query.stringify();
      const wrapped = ['{', str, '}'].join('\n');
      return prettyFormat(wrapped);
    },
    combine: (q: any) => {
      return combineQueries(query, q);
    },
    $type: 'query',
  };

  return query as any;
};

const rootQuery: any = new Proxy(
  {},
  {
    get(_, key: string) {
      switch (key) {
        case '$type':
          return 'query';
        case 'combine':
          return ([firstQuery, ...queries]: QueryBase<any, any>[]) => {
            return queries.reduce((master, query) => {
              return master.combine(query);
            }, firstQuery);
          };
        default:
          return createQueryObj({ name: key });
      }
    },
  }
);

const createQuery = <Def extends Record<string, any>>(): RootQuery<Def> =>
  rootQuery;

export default createQuery;
