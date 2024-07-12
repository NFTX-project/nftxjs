import { UnknownError } from '@nftx/errors';
import { gql, querySubgraph } from '..';

const ignoreWs = (str: string) => str.replace(/ /g, '').replace(/\n/g, '');

jest.setTimeout(30000);

// We're absolutely not bothered about a fully-working api
// We just want to make sure that our method is sending the right payload
// So I think it's reasonable to just stub the fetch api entirely instead
// of trying to construct a fully-working backend server
let fetch: jest.Mock;
let response: {
  ok: boolean;
  text: jest.Mock;
  json: () => Record<string, any>;
  headers: { get: (key: string) => string } & Record<string, any>;
};
let data: any;

beforeEach(() => {
  data = { vault: { id: '0x' } };
  response = {
    ok: true,
    text: jest.fn(async () => JSON.stringify({ data })),
    json: async () => ({}),
    headers: {
      'Content-Type': 'application/json',
      'content-type': 'application/json',
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

it('enforces block accuracy', async () => {
  data = { ...data, _meta: { block: { number: '100' } } };
  const tempData = { ...data, _meta: { block: { number: '99' } } };
  response.text.mockResolvedValueOnce(JSON.stringify({ data: tempData }));

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
    requiredBlock: 100,
  });

  const body = JSON.parse(fetch.mock.calls[0][1].body);
  expect(ignoreWs(body.query)).toEqual(
    ignoreWs(`
      {
        _meta {
          block {
            number
          }
        }
        vault(id: "0x") {
          id
        }
      }
    `)
  );
  expect(fetch).toBeCalledTimes(2);
  expect(result).toEqual({ vault: { id: '0x' } });
});

describe('when subgraph never catches up', () => {
  it('throws an error', async () => {
    data = { ...data, _meta: { block: { number: '99' } } };

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
      requiredBlock: 100,
    });

    await expect(promise).rejects.toThrowError();
  });
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

      await expect(promise).rejects.toThrowError(UnknownError);
    });

    describe('when the response fails with an error message', () => {
      beforeEach(() => {
        response.ok = false;
        response.text.mockResolvedValue('Failed');
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

        await expect(promise).rejects.toThrowError(UnknownError);
      });
    });
  });

  describe('when the response fails with an error object', () => {
    beforeEach(() => {
      response.ok = false;
      response.text.mockImplementation(async () =>
        JSON.stringify({ error: 'Failed' })
      );
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

      await expect(promise).rejects.toThrowError(UnknownError);
    });
  });

  describe('when response is not valid json', () => {
    beforeEach(() => {
      response.text.mockImplementation(
        async () => '<body><p>This is an error page</p></body>'
      );
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

      await expect(promise).rejects.toThrowError();
    });
  });

  describe('when response contains an error object', () => {
    beforeEach(() => {
      response.text.mockImplementation(async () =>
        JSON.stringify({ errors: { message: 'An error happened' } })
      );
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
      response.text.mockImplementation(async () =>
        JSON.stringify({
          errors: [{ message: 'Invalid subgraph syntax' }],
        })
      );
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
});
