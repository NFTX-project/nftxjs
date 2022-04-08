import { buildWhere, gql, querySubgraph } from '../';

describe('gql', () => {
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
});

describe('buildWhere', () => {
  it('returns a string where clause for the given values', () => {
    const actual = buildWhere({
      date_gt: 0,
      alive: true,
    });

    const expected = `{ date_gt: 0, alive: true }`;

    expect(actual).toBe(expected);
  });

  it('removes null and undefined values', () => {
    const actual = buildWhere({
      date_gt: 0,
      alive: null,
      dead: undefined,
    });

    const expected = `{ date_gt: 0 }`;

    expect(actual).toBe(expected);
  });

  it('stringifies the values', () => {
    const actual = buildWhere({
      firstName: 'jimmy',
      lastName: 'mcgill',
    });

    const expected = `{ firstName: "jimmy", lastName: "mcgill" }`;

    expect(actual).toBe(expected);
  });

  it('normalizes any address values', () => {
    const actual = buildWhere({
      id: '0xAB123FWeRG0f',
    });

    const expected = `{ id: "0xab123fwerg0f" }`;

    expect(actual).toBe(expected);
  });
});

describe('querySubgraph', () => {
  // We're absolutely not bothered about a fully-working api
  // We just want to make sure that our method is sending the right payload
  // So I think it's reasonable to just stub the fetch api entirely instead
  // of trying to construct a fully-working backend server
  let fetch: jest.Mock;
  let response: { ok: boolean; json: () => Promise<any> };
  let data: any;

  beforeEach(() => {
    data = { vault: { id: '0x' } };
    response = {
      ok: true,
      json: async () => ({ data }),
    };
    fetch = jest.fn().mockResolvedValue(response);
  });

  it('sends a query to the given url', async () => {
    const query = gql`{
      vault(id: "${'0x'}") {
        id
      }
    }`;
    const result = await querySubgraph({
      url: 'https://nftx.io',
      query,
      fetch,
    });

    expect(fetch).toBeCalled();
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toEqual({ query });
  });
  it('injects variables into the query', async () => {
    const query = gql`
      {
        vault(id: $id) {
          id
        }
      }
    `;
    await querySubgraph({
      url: 'https://nftx.io',
      query,
      variables: { id: '0x123' },
      fetch,
    });
    const expected = gql`
      {
        vault(id: "0x123") {
          id
        }
      }
    `;
    expect(fetch).toBeCalled();
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toEqual({ query: expected });
  });
  it('returns the response data', async () => {
    const query = gql`{
      vault(id: "${'0x'}") {
        id
      }
    }`;
    const result = await querySubgraph({
      url: 'https://nftx.io',
      query,
      fetch,
    });

    expect(fetch).toBeCalled();
    expect(result).toEqual(data);
  });
  describe('when the response fails', () => {
    it('throws an error', async () => {
      response.ok = false;
      const query = gql`{
        vault(id: "${'0x'}") {
          id
        }
      }`;
      const promise = querySubgraph({ url: 'https://nftx.io', query, fetch });

      expect(promise).rejects.toThrow();
    });
  });
});
