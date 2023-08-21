import { normalizeIfAddress } from '../utils';

type WithoutNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};
type Defined<T> = WithoutNull<Required<T>>;

type WhereStatement = [string, string, any];
export type WhereStatements = Array<WhereStatement | WhereStatements>;

type WhereOperator<T> = (value: T | null | undefined) => WhereStatement;

type WherePrimitive<Field> = {
  is: WhereOperator<Field>;
  isNot: WhereOperator<Field>;
  gt: WhereOperator<Field>;
  gte: WhereOperator<Field>;
  lt: WhereOperator<Field>;
  lte: WhereOperator<Field>;
  in: WhereOperator<Field[]>;
  contains: WhereOperator<Field[]>;
} & WhereOperator<Field>;

type WhereFieldFn<Field> = ((
  cb: (w: Where<Field>) => WhereStatements
) => WhereStatements) &
  WherePrimitive<Field extends Array<any> ? string | Field : string>;

type WhereField<Field> = Field extends object
  ? WhereFieldFn<Field>
  : WherePrimitive<Field>;

type WhereX<Def> = {
  [K in keyof Def]: WhereField<Def[K]>;
};
export type Where<Def> = WhereX<Defined<Def extends Array<any> ? Def[0] : Def>>;

const createWhereField = (fieldName: string) => {
  const createOperator = (operator: string) => (v: any) => {
    if (typeof v === 'function') {
      v = v(createWhere());
    }
    return [fieldName, operator, v];
  };
  const whereField: any = createOperator('is');
  whereField.is = whereField;
  whereField.isNot = createOperator('isNot');
  whereField.gt = createOperator('gt');
  whereField.gte = createOperator('gte');
  whereField.lt = createOperator('lt');
  whereField.lte = createOperator('lte');
  whereField.in = createOperator('in');
  whereField.contains = createOperator('contains');

  return whereField;
};

const stringifyPrimative = (value: any) => {
  switch (typeof value) {
    case 'string':
      // If the value is an address, we want to normalize it
      // Often we hit issues where the subgraph has lowercase addresses but we're passing uppercase values in
      // resulting in 0 results
      value = normalizeIfAddress(value);
      break;
    case 'bigint':
      // JSON.stringify doesn't work on bigints so we need to handle them separately
      return value.toString();
    default:
      break;
  }

  // Stringify the primitive value
  return JSON.stringify(value);
};

export const stringifyWhere = (statements: WhereStatements): string => {
  return statements
    .map(([field, operator, value]) => {
      if (value == null) {
        return '';
      }
      switch (operator) {
        case 'is':
          if (value && typeof value === 'object') {
            const w = stringifyWhere(value);
            if (!w) {
              return '';
            }
            return `${field}_: {\n${w}\n}`;
          }
          return `${field}: ${stringifyPrimative(value)}`;
        case 'isNot':
          if (Array.isArray(value)) {
            return `${field}_not: ${stringifyPrimative(value)}`;
          }
          return `${field}_ne: ${stringifyPrimative(value)}`;
        case 'in':
          return `${field}_in: [${value.map(stringifyPrimative)}]`;
        case 'gt':
        case 'gte':
        case 'lt':
        case 'lte':
        default:
          return `${field}_${operator}: ${stringifyPrimative(value)}`;
      }
    })
    .filter(Boolean)
    .join(',\n');
};

const createWhere = <Def>(): Where<Def> => {
  const proxy: any = new Proxy(
    {},
    {
      get(_, fieldName: string) {
        const whereField = createWhereField(fieldName);

        return whereField;
      },
    }
  );

  return proxy;
};

export default createWhere;
