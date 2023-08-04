import buildFilters from './buildFilters';
import buildSelect from './buildSelect';
import ws from '../ws';

const buildQuery = ({
  name,
  select,
  tab,
  first,
  orderBy,
  orderDirection,
  where,
  id,
}: {
  tab: number;
  name: string;
  select: any;
  first?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: any;
  id?: string;
}) => {
  const output: string[] = [];

  // Collection
  output.push(ws(tab), name);

  // Filters
  if (first || orderBy || orderDirection || where || id) {
    output.push(ws(tab), '(\n');
    output.push(
      buildFilters({ tab: tab + 1, first, orderBy, orderDirection, where, id })
    );
    output.push('\n', ws(tab), ')');
  }

  // Select fields
  output.push(ws(tab), '{\n');
  output.push(buildSelect(select, tab + 1));
  output.push(ws(tab), '}\n');

  return output.join('');
};

const formatQuery = ({
  name,
  select,
  first,
  orderBy,
  orderDirection,
  where,
  id,
}: {
  name: string;
  select?: any;
  first?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: any;
  id?: string;
}) => {
  const output: string[] = [];

  output.push('{\n');
  output.push(
    buildQuery({
      name,
      select,
      tab: 1,
      first,
      orderBy,
      orderDirection,
      where,
      id,
    })
  );
  output.push('}');

  return output.join('');
};

export default formatQuery;
