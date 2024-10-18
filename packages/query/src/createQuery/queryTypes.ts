import type { Defined } from './commonTypes';
import type { Select, SelectFieldPrimitives } from './selectTypes';
import type { Where, WhereStatements } from './whereTypes';

type Index<T> = keyof Defined<T>;

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
  stringify(): string;
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
  skip(limit: number): Query<QName, QDef>;
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

export type RootQuery<QDef extends Record<string, any>> = {
  [K in keyof Defined<QDef>]: Query<K, Defined<QDef>[K]>;
} & {
  combine: CombineFn;
};
