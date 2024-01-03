import { formatJson, getChainConstant } from '@nftx/utils';
import { makeFetchAll } from '../fetchAll';
import { makeFetchErc1155s } from '../fetchErc1155s';
import { makeFetchErc721s } from '../fetchErc721s';
import { makeFetchNonStandards } from '../fetchNonstandards';
import { makeFetchUserHoldings } from '../fetchUserHoldings';
import {
  ERC1155_SUBGRAPH,
  ERC721_SUBGRAPH,
  NON_STANDARD_SUBGRAPH,
} from '@nftx/constants';

let erc721response: any;
let erc1155response: any;
let nonstandardresponse: any;
let query721Subgraph: jest.Mock;
let query1155Subgraph: jest.Mock;
let queryNonstandardSubgraph: jest.Mock;
let querySubgraph: jest.Mock;
let fetchErc721s: ReturnType<typeof makeFetchErc721s>;
let fetchErc1155s: ReturnType<typeof makeFetchErc1155s>;
let fetchNonstandards: ReturnType<typeof makeFetchNonStandards>;
let fetchAll: ReturnType<typeof makeFetchAll>;
let fetchUserHoldings: ReturnType<typeof makeFetchUserHoldings>;
let args: Parameters<typeof fetchUserHoldings>[0];
let run: () => ReturnType<typeof fetchUserHoldings>;

beforeEach(() => {
  erc721response = {
    tokens: [
      {
        id: '0x111',
        collection: {
          id: '0x222',
        },
        identifier: '1',
      },
    ],
  };
  erc1155response = {
    account: {
      holdings: [
        {
          id: '0x333',
          balance: '9',
          token: {
            identifier: '2',
            collection: {
              id: '0x444',
            },
          },
        },
      ],
    },
  };
  nonstandardresponse = {
    account: {
      tokens: [
        {
          id: '0x555',
          identifier: '3',
        },
      ],
    },
  };
  query721Subgraph = jest.fn(async () => {
    return erc721response;
  });
  query1155Subgraph = jest.fn(async () => {
    return erc1155response;
  });
  queryNonstandardSubgraph = jest.fn(async () => {
    return nonstandardresponse;
  });

  querySubgraph = jest.fn(async ({ url }) => {
    switch (url) {
      case getChainConstant(ERC721_SUBGRAPH, 1):
        return query721Subgraph();
      case getChainConstant(ERC1155_SUBGRAPH, 1):
        return query1155Subgraph();
      case getChainConstant(NON_STANDARD_SUBGRAPH, 1):
        return queryNonstandardSubgraph();
      default:
        throw new Error('Unexpected URL ' + url);
    }
  });
  fetchErc721s = makeFetchErc721s({ querySubgraph });
  fetchErc1155s = makeFetchErc1155s({ querySubgraph });
  fetchNonstandards = makeFetchNonStandards({ querySubgraph });
  fetchAll = makeFetchAll({ fetchErc1155s, fetchErc721s, fetchNonstandards });
  fetchUserHoldings = makeFetchUserHoldings({ fetchAll });
  args = {
    userAddress: '0x555',
    network: 1,
  };
  run = () => fetchUserHoldings(args);
});

it('returns all ERC721 holdings for a user', async () => {
  const {
    holdings: [holding],
  } = await run();

  const expected = { assetAddress: '0x222', tokenId: '1' };

  expect(holding).toEqual(expected);
});

it('returns all ERC1155 holdings for a user', async () => {
  const {
    holdings: [, holding],
  } = await run();

  const expected = formatJson(
    {
      assetAddress: '0x444',
      tokenId: '2',
      quantity: '9',
    },
    false
  );

  expect(formatJson(holding, false)).toEqual(expected);
});

it('fetches all nonstandard holdings for a user', async () => {
  const {
    holdings: [, , holding],
  } = await run();

  const expected = { assetAddress: '0x555', tokenId: '3' };

  expect(holding).toEqual(expected);
});

describe('when assetAddresses is provided', () => {
  beforeEach(() => {
    args.assetAddresses = ['0x222', '0x555'];
  });

  it('returns only holdings for the given asset addresses', async () => {
    const { holdings } = await run();

    expect(holdings).toHaveLength(2);
  });
});

describe('when there are over 1k 721 results', () => {
  beforeEach(() => {
    query721Subgraph.mockImplementationOnce(async () => {
      return {
        tokens: Array.from({ length: 1000 }, (_, i) => ({
          id: `0x111${i}`,
          collection: {
            id: '0x222',
          },
          identifier: `${i}`,
        })),
      };
    });
  });

  it('returns a cursor to fetch the next page of results', async () => {
    const { cursor, holdings } = await run();

    expect(holdings).toHaveLength(1000);
    expect(cursor).toBe('ncafuh__721__0x111999');
  });

  describe('when there are over 1k 1155 results', () => {
    beforeEach(async () => {
      query1155Subgraph.mockImplementationOnce(async () => {
        return {
          account: {
            holdings: Array.from({ length: 1000 }, (_, i) => ({
              id: `0x333${i}`,
              balance: '9',
              token: {
                identifier: `${i}`,
                collection: {
                  id: '0x444',
                },
              },
            })),
          },
        };
      });

      const { cursor } = await run();

      // Fetch 721s first
      expect(cursor).toContain('__721__');

      // Pass the cursor into the next fetch
      args.cursor = cursor;
    });

    it('returns a cursor to fetch the next page of results', async () => {
      const { cursor, holdings } = await run();

      expect(cursor).toBe('ncafuh__1155__0x333999');
      // 1 ERC721 + 1000 ERC1155s
      expect(holdings).toHaveLength(1001);
    });

    describe('when there are over 1k nonstandard results', () => {
      beforeEach(async () => {
        queryNonstandardSubgraph.mockImplementationOnce(async () => {
          return {
            account: {
              tokens: Array.from({ length: 1000 }, (_, i) => ({
                id: `0x555${i}`,
                identifier: `${i}`,
              })),
            },
          };
        });

        const { cursor } = await run();

        // Fetch 1155s first
        expect(cursor).toContain('__1155__');

        // Pass the cursor into the next fetch
        args.cursor = cursor;
      });

      it('returns a cursor to fetch the next page of results', async () => {
        const { cursor, holdings } = await run();

        expect(cursor).toBe('ncafuh__nonstandard__999');
        // 1 ERC1155 + 1000 nonstandard
        expect(holdings).toHaveLength(1001);

        args.cursor = cursor;
        const { cursor: cursor2, holdings: holdings2 } = await run();

        expect(cursor2).toBe(undefined);
        expect(holdings2).toHaveLength(1);
      });
    });
  });
});
