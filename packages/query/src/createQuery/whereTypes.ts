import type { Defined } from './commonTypes';

export type WhereStatement = [string, string, any];
export type WhereStatements = Array<WhereStatement | WhereStatements>;

type WhereOperator<T> = (value: T | null | undefined) => WhereStatement;

type WherePrimitive<Field> = {
  is: WhereOperator<Field>;
  ne: WhereOperator<Field>;
  not: WhereOperator<Field>;
  gt: WhereOperator<Field>;
  gte: WhereOperator<Field>;
  lt: WhereOperator<Field>;
  lte: WhereOperator<Field>;
  in: WhereOperator<Field[]>;
  nin: WhereOperator<Field[]>;
  notIn: WhereOperator<Field[]>;
  contains: WhereOperator<Field[]>;
} & WhereOperator<Field>;

type WhereFieldFn<Field> = ((
  cb: (w: Where<Field>) => WhereStatements
) => WhereStatements) &
  WherePrimitive<Field extends Array<any> ? string | Field : string>;

type WhereField<Field> = Field extends object
  ? WhereFieldFn<Field>
  : WherePrimitive<Field>;

type WhereAndOr = {
  and: (...statements: WhereStatements[]) => WhereStatement;
  or: (...statements: WhereStatements[]) => WhereStatement;
};

type WhereX<Def> = {
  [K in keyof Def]: WhereField<Def[K]>;
} & WhereAndOr;
export type Where<Def> = WhereX<Defined<Def extends Array<any> ? Def[0] : Def>>;
