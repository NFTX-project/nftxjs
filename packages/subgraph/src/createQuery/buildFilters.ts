import buildWhere from '../buildWhere';
import ws from '../ws';

const buildFilters = ({
  tab,
  first,
  orderBy,
  orderDirection,
  where,
  id,
}: {
  tab: number;
  first?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: any;
  id?: string;
}) => {
  const output: string[] = [];

  if (first) {
    output.push(ws(tab), `first: ${first}`, '\n');
  }
  if (orderBy) {
    output.push(ws(tab), `orderBy: ${orderBy}`, '\n');
  }
  if (orderDirection) {
    output.push(ws(tab), `orderDirection: ${orderDirection}`, '\n');
  }
  if (id) {
    output.push(ws(tab), `id: "${id}"`);
  }
  if (where) {
    output.push(ws(tab), `where: `);

    output.push(buildWhere(where));
  }

  return output.join('');
};

export default buildFilters;
