export type Index = string | number | symbol;

type WithoutNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};
type Defined<T> = WithoutNull<Required<T>>;

// Select
type SelectObject<QDef> = {
  [K in keyof QDef]?: Select<QDef[K]> | Query<K, QDef[K]> | true;
};

type SelectArray<QDef> = Array<keyof QDef | SelectObject<QDef>>;

type SelectX<QDef> = SelectArray<QDef> | SelectObject<QDef>;
export type Select<QDef> = SelectX<QDef extends Array<any> ? QDef[0] : QDef>;

// Where
type WherePrimitiveOpts<Field> = {
  is?: Field;
  isNot?: Field;
  gt?: Field;
  gte?: Field;
  lt?: Field;
  lte?: Field;
  in?: Field[];
};

type WherePrimitive<Field> = Field | WherePrimitiveOpts<Field>;

type WhereObject<QDef> = QDef extends { id: any }
  ? WherePrimitive<QDef['id']> | Where<QDef>
  : Where<QDef>;

type WhereOpts<Field> = Field extends object
  ? WhereObject<Field>
  : WherePrimitive<Field>;

type WhereX<QDef> = {
  [K in keyof QDef]?: WhereOpts<QDef[K]>;
};
export type Where<QDef> = QDef extends Array<any>
  ? WhereX<QDef[0]>
  : WhereX<QDef>;

type QueryCommon<QName extends Index, QDef, QDefSingle> = {
  where(where: Where<QDefSingle>): Query<QName, QDef>;
  select(select: Select<QDefSingle>): Query<QName, QDef>;
  toString(): string;
  // __isG: true;
  __r: Record<QName, QDef>;
};

type QuerySingle<QName extends Index, QDef> = {
  id(id: string): Query<QName, QDef>;
} & QueryCommon<QName, QDef, QDef>;

type QueryList<QName extends Index, QDef extends Array<any>> = {
  first(limit: number): Query<QName, QDef>;
  orderBy<K extends keyof QDef[0]>(field: K): Query<QName, QDef>;
  orderDirection(direction: 'asc' | 'desc'): Query<QName, QDef>;
} & QueryCommon<QName, QDef, QDef[0]>;

export type Query<QName extends Index, QDef> = QDef extends Array<any>
  ? QueryList<QName, QDef>
  : QuerySingle<QName, QDef>;

export type QueriesBase = {
  toString(): string;
  __r: Record<string, never>;
};
type Queries1<QN1 extends Index, QD1> = QueriesBase & {
  __r: Record<QN1, QD1>;
};
type Queries2<QN1 extends Index, QD1, QN2 extends Index, QD2> = QueriesBase & {
  __r: Record<QN1, QD1> & Record<QN2, QD2>;
};
type Queries3<
  QN1 extends Index,
  QD1,
  QN2 extends Index,
  QD2,
  QN3 extends Index,
  QD3
> = QueriesBase & {
  __r: Record<QN1, QD1> & Record<QN2, QD2> & Record<QN3, QD3>;
};

interface CombineFn {
  <QN1 extends Index, QD1>(query: Query<QN1, QD1>): Queries1<QN1, QD1>;
  <QN1 extends Index, QD1, QN2 extends Index, QD2>(
    q1: Query<QN1, QD1>,
    q2: Query<QN2, QD2>
  ): Queries2<QN1, QD1, QN2, QD2>;
  <QN1 extends Index, QD1, QN2 extends Index, QD2, QN3 extends Index, QD3>(
    q1: Query<QN1, QD1>,
    q2: Query<QN2, QD2>,
    q3: Query<QN3, QD3>
  ): Queries3<QN1, QD1, QN2, QD2, QN3, QD3>;
}

export type G<Schema extends Record<string, any>> = {
  [Name in keyof Defined<Schema>]: Query<Name, Defined<Schema>[Name]>;
} & {
  combine: CombineFn;
};
