import { normalizeIfAddress } from '../utils';
import type { SelectFieldPrimitives } from './selectTypes';
import stringifySelect from './stringifySelect';
import stringifyWhere from './stringifyWhere';
import type { WhereStatements } from './whereTypes';

const stringifyQuery = (args: {
  name: string;
  alias?: string;
  first?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: WhereStatements;
  select?: SelectFieldPrimitives;
  id?: string;
}) => {
  if (!args.select?.length) {
    throw new Error(`Select must be specified`);
  }

  const output: string[] = [];

  // Collection
  if (args.alias) {
    output.push(args.alias, ': ');
  }
  output.push(args.name, ' ');
  const w = args.where && stringifyWhere(args.where);
  // Filters
  if (
    args.first ||
    args.skip ||
    args.orderBy ||
    args.orderDirection ||
    w ||
    args.id
  ) {
    output.push('(\n');
    if (args.first) {
      output.push('first: ', `${args.first}`, '\n');
    }
    if (args.skip) {
      output.push('skip: ', `${args.skip}`, '\n');
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
  output.push(
    args.select
      .map((s: any) => {
        switch (s.$type) {
          case 'query':
            return s.stringify();
          case 'select':
            return stringifySelect(s);
          default:
            return s.toString();
        }
      })
      .join('\n')
  );
  output.push('\n}');

  return output.join('');
};

export default stringifyQuery;
