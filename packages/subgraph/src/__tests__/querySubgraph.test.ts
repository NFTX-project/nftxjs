import { buildWhere, gql, querySubgraph } from '..';

// We're absolutely not bothered about a fully-working api
// We just want to make sure that our method is sending the right payload
// So I think it's reasonable to just stub the fetch api entirely instead
// of trying to construct a fully-working backend server
let fetch: jest.Mock;
let response: {
  ok: boolean;
  text: () => Promise<string>;
  headers: { get: (key: string) => string } & Record<string, any>;
};
let data: any;

beforeEach(() => {
  data = { vault: { id: '0x' } };
  response = {
    ok: true,
    text: async () => JSON.stringify({ data }),
    headers: {
      'Content-Type': 'application/json',
      get: (key) => response.headers[key],
    },
  };
  fetch = jest.fn().mockResolvedValue(response);
});

it('sends a query to the given url', async () => {
  const query = gql`
    {
      vault(id: "0x") {
        id
      }
    }
  `;
  await querySubgraph({
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
  const query = gql`
    {
      vault(id: "0x") {
        id
      }
    }
  `;
  const result = await querySubgraph({
    url: 'https://nftx.io',
    query,
    fetch,
  });

  expect(fetch).toBeCalled();
  expect(result).toEqual(data);
});

describe('error handling', () => {
  describe('when the response fails', () => {
    beforeEach(() => {
      response.ok = false;
    });

    it('throws an error', async () => {
      const query = gql`
        {
          vault(id: "0x") {
            id
          }
        }
      `;
      const promise = querySubgraph({ url: 'https://nftx.io', query, fetch });

      await expect(promise).rejects.toThrowError(
        'Failed to fetch https://nftx.io'
      );
    });

    describe('when the response fails with an error message', () => {
      beforeEach(() => {
        response.ok = false;
        response.text = async () => 'Failed';
      });

      it('throws a specific error message', async () => {
        const query = gql`
          {
            vault(id: "0x") {
              id
            }
          }
        `;
        const promise = querySubgraph({
          url: 'https://nftx.io',
          query,
          fetch,
        });

        await expect(promise).rejects.toThrowError('Failed');
      });
    });
  });

  describe('when the response fails with an error object', () => {
    beforeEach(() => {
      response.ok = false;
      response.text = async () => JSON.stringify({ error: 'Failed' });
    });

    it('throws a specific error message', async () => {
      const query = gql`
        {
          vault(id: "0x") {
            id
          }
        }
      `;
      const promise = querySubgraph({
        url: 'https://nftx.io',
        query,
        fetch,
      });

      await expect(promise).rejects.toThrowError('Failed');
    });
  });

  describe('when response is not valid json', () => {
    beforeEach(() => {
      response.text = async () => '<body><p>This is an error page</p></body>';
    });

    it('throws an error', async () => {
      const query = gql`
        {
          vault(id: "0x") {
            id
          }
        }
      `;

      const promise = querySubgraph({ url: 'https://nftx.io', query, fetch });

      await expect(promise).rejects.toThrowError(
        `Unexpected token '<', "<body><p>T"... is not valid JSON`
      );
    });
  });

  describe('when response contains an error object', () => {
    beforeEach(() => {
      response.text = async () =>
        JSON.stringify({ errors: { message: 'An error happened' } });
    });

    it('throws an error', async () => {
      const query = gql`
        {
          vault(id: "0x") {
            id
          }
        }
      `;

      const promise = querySubgraph({ url: 'https://nftx.io', query, fetch });

      await expect(promise).rejects.toThrowError('An error happened');
    });
  });

  describe('when response contains an errors object', () => {
    beforeEach(() => {
      response.text = async () =>
        JSON.stringify({
          errors: [{ message: 'Invalid subgraph syntax' }],
        });
    });

    it('throws an error', async () => {
      const query = gql`
        {
          vault(id: "0x") {
            id
          }
        }
      `;

      const promise = querySubgraph({ url: 'https://nftx.io', query, fetch });

      await expect(promise).rejects.toThrowError('Invalid subgraph syntax');
    });
  });

  describe('when response is not application/json', () => {
    beforeEach(() => {
      response.headers['Content-Type'] = 'text/plain';
    });

    it('throws an error', async () => {
      const query = gql`
        {
          vault(id: "0x") {
            id
          }
        }
      `;

      const promise = querySubgraph({ url: 'https://nftx.io', query, fetch });

      await expect(promise).rejects.toThrowError(
        'Incorrect response type. Expected application/json but received text/plain'
      );
    });
  });
});
