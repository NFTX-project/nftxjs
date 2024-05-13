import { Defined } from './commonTypes';
import type { QueryBase } from './queryTypes';

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
