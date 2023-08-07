import { gql } from '..';

it('returns a subgraph query string', () => {
  const query = gql`
    {
      vaults(limit: 1000, orderBy: id) {
        id
      }
    }
  `.replace(/\n +/g, ' ');

  const expected = ` { vaults(limit: 1000, orderBy: id) { id } } `;

  expect(query).toBe(expected);
});
it('substitutes values', () => {
  const LIMIT = 1000;
  const id = '1';

  const query = gql`{
      vaults(limit: ${LIMIT}, where: {
        id: "${id}",
        date_gt: ${0}
      }) {
        id
      }
    }`.replace(/\n +/g, ' ');

  const expected = `{ vaults(limit: 1000, where: { id: "1", date_gt: 0 }) { id } }`;

  expect(query).toBe(expected);
});
