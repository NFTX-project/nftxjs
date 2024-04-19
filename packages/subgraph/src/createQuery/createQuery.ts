import { normalizeIfAddress } from '../utils';
import type { Select, SelectFieldPrimitives } from './createSelect';
import createSelect from './createSelect';
import type { Where, WhereStatements } from './createWhere';
import createWhere, { stringifyWhere } from './createWhere';

type Index<T> = keyof Defined<T>;

type WithoutNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};
type Defined<T> = WithoutNull<Required<T>>;

export type QueryBase<QName extends Index<QDef>, QDef> = {
  toString(): string;
  combine<Q extends QueryBase<any, any>>(
    query: Q
  ): Queries<QueryBase<QName, QDef>, Q>;
  __r: Record<QName, QDef>;
};

type QueryCommon<QName extends Index<QDef>, QDef, QDefSingle> = QueryBase<
  QName,
  QDef
> & {
  as<S extends string>(v: S): Query<S, QDef & Record<S, QDef[QName]>>;
  where(cb: (w: Where<QDefSingle>) => WhereStatements): Query<QName, QDef>;
  select(
    cb: (s: Select<QDefSingle>) => SelectFieldPrimitives
  ): Query<QName, QDef>;
  toStringInner(): string;
  toString(): string;
  combine<Q extends QueryBase<any, any>>(
    query: Q
  ): Queries<QueryBase<QName, QDef>, Q>;
};

type QuerySingle<QName extends Index<QDef>, QDef> = {
  id(id: string): Query<QName, QDef>;
} & QueryCommon<QName, QDef, QDef>;

type QueryList<QName extends Index<QDef>, QDef extends Array<any>> = {
  first(limit: number): Query<QName, QDef>;
  orderBy<K extends keyof QDef[0]>(field: K): Query<QName, QDef>;
  orderDirection(direction: 'asc' | 'desc'): Query<QName, QDef>;
} & QueryCommon<QName, QDef, QDef[0]>;

export type Query<QName extends Index<QDef>, QDef> = QDef extends Array<any>
  ? QueryList<QName, QDef>
  : QuerySingle<QName, QDef>;

export type Queries<
  Qs extends Queries<any, any>,
  Q extends QueryBase<any, any>
> = {
  toString(): string;
  combine<Q2 extends QueryBase<any, any>>(
    query: Q2
  ): Queries<Queries<Qs, Q>, Q2>;
  __r: Qs['__r'] & Q['__r'];
};

interface CombineFn {
  <Q1 extends QueryBase<any, any>, Q2 extends QueryBase<any, any>>(
    queries: [Q1, Q2]
  ): Queries<Q1, Q2>;
  <
    Q1 extends QueryBase<any, any>,
    Q2 extends QueryBase<any, any>,
    Q3 extends QueryBase<any, any>
  >(
    queries: [Q1, Q2, Q3]
  ): Queries<Queries<Q1, Q2>, Q3>;
  <
    Q1 extends QueryBase<any, any>,
    Q2 extends QueryBase<any, any>,
    Q3 extends QueryBase<any, any>,
    Q4 extends QueryBase<any, any>
  >(
    queries: [Q1, Q2, Q3, Q4]
  ): Queries<Queries<Queries<Q1, Q2>, Q3>, Q4>;
}

type RootQuery<QDef extends Record<string, any>> = {
  [K in keyof Defined<QDef>]: Query<K, Defined<QDef>[K]>;
} & {
  combine: CombineFn;
};

const stringify = (args: {
  name: string;
  alias?: string;
  first?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: WhereStatements;
  select?: SelectFieldPrimitives;
  id?: string;
}) => {
  const output: string[] = [];

  // Collection
  if (args.alias) {
    output.push(args.alias, ': ');
  }
  output.push(args.name, ' ');
  const w = args.where && stringifyWhere(args.where);
  // Filters
  if (args.first || args.orderBy || args.orderDirection || w || args.id) {
    output.push('(\n');
    if (args.first) {
      output.push('first: ', `${args.first}`, '\n');
    }
    if (args.orderBy) {
      output.push('orderBy: ', args.orderBy, '\n');
    }
    if (args.orderDirection) {
      output.push('orderDirection: ', args.orderDirection, '\n');
    }
    if (args.id) {
      output.push('id: ', `"${normalizeIfAddress(args.id)}"`, '\n');
    }
    // Where
    if (w) {
      output.push('where: ', '{\n', w, '\n}', '\n');
    }
    output.push(')');
  }
  // Select
  output.push('{\n');
  if (!args.select?.length) {
    throw new Error(`Select must be specified`);
  }
  output.push(
    args.select
      .map((s: any) => {
        if ('toStringInner' in s) {
          return s.toStringInner();
        }
        return s.toString();
      })
      .join('\n')
  );
  output.push('\n}');

  return output.join('');
};

const combineQueries = (q1: any, q2: any) => {
  const combined = {
    toString() {
      const content = [q1, q2]
        .map((q) => {
          const a = q.toString().split('\n');
          a.shift();
          a.pop();
          return a.join(' \n');
        })
        .join('\n\n');

      return ['{', content, '}'].join('\n');
    },
    combine(q3: any) {
      return combineQueries(combined, q3);
    },
  };

  return combined;
};

const prettyFormat = (str: string) => {
  let indent = 0;
  const lines = str.split('\n').filter(Boolean);

  const text = lines
    .map((line) => {
      if (line.includes('}')) {
        indent -= 2;
      }
      if (line.includes(')')) {
        indent -= 2;
      }
      if (line.includes(']')) {
        indent -= 2;
      }

      const newline = ' '.repeat(indent) + line;

      if (line.includes('{')) {
        indent += 2;
      }
      if (line.includes('(')) {
        indent += 2;
      }
      if (line.includes('[')) {
        indent += 2;
      }

      return newline;
    })
    .join('\n');

  return text;
};

const createQueryObj = (args: {
  name: string;
  alias?: string;
  first?: number;
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
    toStringInner: () => {
      return stringify(args);
    },
    toString: () => {
      const str = query.toStringInner();
      const wrapped = ['{', str, '}'].join('\n');
      return prettyFormat(wrapped);
    },
    combine: (q: any) => {
      return combineQueries(query, q);
    },
  };

  return query as any;
};

const rootQuery: any = new Proxy(
  {},
  {
    get(_, key: string) {
      switch (key) {
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
