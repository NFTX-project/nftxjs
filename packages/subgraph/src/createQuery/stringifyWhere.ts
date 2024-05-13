import { normalizeIfAddress } from '../utils';
import type { WhereStatement, WhereStatements } from './whereTypes';
import { createConjuctionField } from './createWhere';

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
const hasMixedOrStatements = (statements: WhereStatements) => {
  if (statements.length < 2) {
    return false;
  }
  for (const [field] of statements) {
    if (field === 'or') {
      return true;
    }
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
    if (keys.has(key) || key === 'or') {
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

const stringifyWhere = (statements: WhereStatements): string => {
  if (hasDuplicateKeys(statements) || hasMixedOrStatements(statements)) {
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

export default stringifyWhere;
