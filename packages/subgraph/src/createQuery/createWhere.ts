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

type WhereAndOr = {
  and: (...statements: WhereStatements[]) => WhereStatement;
  or: (...statements: WhereStatements[]) => WhereStatement;
};

type WhereX<Def> = {
  [K in keyof Def]: WhereField<Def[K]>;
} & WhereAndOr;
export type Where<Def> = WhereX<Defined<Def extends Array<any> ? Def[0] : Def>>;

const createWhereField = (fieldName: string) => {
  const createOperator =
    (operator: string) =>
    (v: any): WhereStatement => {
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

const createConjuctionField = (conjunction: string) => {
  return (...statements: WhereStatements): WhereStatement => {
    return [conjunction, 'conj', statements];
  };
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

const stringifyStatementKey = (statement: WhereStatement | WhereStatements) => {
  const [field, operator, value] = statement;
  switch (operator) {
    case 'is':
      if (value && typeof value === 'object') {
        return `${field}_`;
      }
      return `${field}`;
    case 'isNot':
      return `${field}_ne`;
    case 'in':
      return `${field}_in`;
    case 'conj':
      return `${field}`;
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
    default:
      return `${field}_${operator}`;
  }
};

const hasDuplicateKeys = (statements: WhereStatements) => {
  if (statements.length < 2) {
    return false;
  }
  const keys = new Set<string>();
  for (const statement of statements) {
    const key = stringifyStatementKey(statement);
    if (keys.has(key)) {
      return true;
    }
    keys.add(key);
  }
  return false;
};

const stringifyAnd = (statements: WhereStatements) => {
  const keys = new Set<string>();
  const groupedStatements: WhereStatements[] = [[]];

  // We can group all statements in same object if they have separate keys
  // Any duplicate keys will need to be in separate objects
  statements.forEach((statement) => {
    const key = stringifyStatementKey(statement);
    let statements = groupedStatements[0];
    if (keys.has(key)) {
      statements = [];
      groupedStatements.push(statements);
    } else {
      keys.add(key);
    }

    statements.push(statement);
  });

  const x = groupedStatements
    .map((statements) => stringifyWhere(statements))
    .filter(Boolean);
  if (!x.length) {
    return '';
  }
  const y = x.join('\n},\n{\n');

  return `and: [\n{\n${y}\n}\n]\n`;
};
const stringifyOr = (statements: WhereStatements) => {
  const x = statements.map((s) => stringifyWhere([s])).filter(Boolean);
  if (!x.length) {
    return '';
  }
  const y = x.join('\n},\n{\n');

  return `or: [\n{\n${y}\n}\n]\n`;
};

const stringifyConjuction = (conjunction: any, statements: WhereStatements) => {
  switch (conjunction) {
    case 'and':
      return stringifyAnd(statements);
    case 'or':
      return stringifyOr(statements);
    default:
      return '';
  }
};

export const stringifyWhere = (statements: WhereStatements): string => {
  if (hasDuplicateKeys(statements)) {
    statements = [createConjuctionField('and')(...statements)];
  }

  return statements
    .map(([field, operator, value]) => {
      if (value == null) {
        return '';
      }
      const key = stringifyStatementKey([field, operator, value]);
      switch (operator) {
        case 'is':
          if (value && typeof value === 'object') {
            const w = stringifyWhere(value);
            if (!w) {
              return '';
            }
            return `${key}: {\n${w}\n}`;
          }
          return `${key}: ${stringifyPrimative(value)}`;
        case 'isNot':
          if (Array.isArray(value)) {
            return `${key}: ${stringifyPrimative(value)}`;
          }
          return `${key}: ${stringifyPrimative(value)}`;
        case 'in':
          return `${key}: [${value.map(stringifyPrimative)}]`;
        case 'conj':
          return stringifyConjuction(field, value);
        case 'gt':
        case 'gte':
        case 'lt':
        case 'lte':
        default:
          return `${key}: ${stringifyPrimative(value)}`;
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
        switch (fieldName) {
          case 'and':
          case 'or':
            return createConjuctionField(fieldName);
          default:
            return createWhereField(fieldName);
        }
      },
    }
  );

  return proxy;
};

export default createWhere;
