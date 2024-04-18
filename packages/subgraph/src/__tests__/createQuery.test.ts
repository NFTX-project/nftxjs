import 'isomorphic-fetch';
import { NftxV3, NftxV3Uniswap } from '@nftx/types';
import createQuery from '../createQuery';
import querySubgraph from '../querySubgraph';

type Query = NftxV3Uniswap.Query;

const ignoreWs = (str: string) => str.replace(/ /g, '').replace(/\n/g, '');

it('handles a single entity', () => {
  const g = createQuery<Query>();
  const query = g.pool
    .id('0x1768ccc3fc3a40522fcd3296633ae8c00434b3b6')
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pool(id: "0x1768ccc3fc3a40522fcd3296633ae8c00434b3b6") {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('handles a list entity', () => {
  const g = createQuery<Query>();
  const query = g.pools.select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pools {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('aliases the collection name', () => {
  const g = createQuery<Query>();
  const query = g.pools.as('foo').select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    foo: pools {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('adds filters', () => {
  const g = createQuery<Query>();
  const query = g.pools
    .first(10)
    .orderBy('liquidity')
    .orderDirection('desc')
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pools(
      first: 10
      orderBy: liquidity
      orderDirection: desc
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('searches by primitive values', () => {
  const g = createQuery<Query>();

  const query = g.pools
    .where((w) => [w.createdAtTimestamp('0')])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pools(
      where: {
        createdAtTimestamp: "0"
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('strips out nullish values', () => {
  const g = createQuery<Query>();

  const query = g.pools
    .where((w) => [
      w.createdAtTimestamp(undefined),
      w.liquidity(null),
      w.balanceOfBlock.in(undefined),
      w.collects((collect) => [
        collect.id.in(null),
        collect.owner((owner) => [owner.id.is(undefined)]),
      ]),
    ])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
      pools {
        id
      }
    }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('filters with a contains query', () => {
  const q = createQuery<Query>();
  const query = q.pools
    .where((w) => [w.burns.contains(['0x1234'])])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pools(
      where: {
        burns_contains: ["0x1234"]
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

// Pretty sure we no longer have a use case for this in our schemas
// it('filters by an exact array match', () => {
//   const q = createQuery<Query>();
//   const query = q.pools
//     .where((w) => [w.feesUSD.isNot(['0', '0'])])
//     .select((s) => [s.id]);

//   const actual = query.toString();
//   const expected = `{
//     withdraws(
//       where: {
//         inputTokenAmounts_not: ["0", "0"]
//       }
//     ) {
//       id
//     }
//   }`;

//   expect(ignoreWs(actual)).toBe(ignoreWs(expected));
// });

// For now we're just saying bigint fields should be stringified
// it('handles a bigint value', () => {
//   const g = createQuery<Query>();
//   const query = g.pools
//     .where((w) => w.activeLiquidity.is(0n))
//     .select((s) => [s.id]);

//   const actual = query.toString();
//   const expected = `{
//     pools(
//       where: {
//         activeLiquidity: 0
//       }
//     ) {
//       id
//     }
//   }`;

//   expect(ignoreWs(actual)).toBe(ignoreWs(expected));
// });

it('searches by lt/lte/gt/gte/ne', () => {
  const g = createQuery<Query>();
  const query = g.pools
    .where((w) => [
      w.liquidity.gt('0'),
      w.liquidity.gte('1'),
      w.liquidity.isNot('2'),
      w.liquidity.lt('100000000000'),
      w.liquidity.lte('9999999999'),
    ])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pools(
      where: {
        liquidity_gt: "0",
        liquidity_gte: "1",
        liquidity_ne: "2",
        liquidity_lt: "100000000000",
        liquidity_lte: "9999999999"
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('searches on nested fields', () => {
  const g = createQuery<Query>();

  const query = g.pools
    // .where((w) => [w.inputTokens((w) => [w.id('0x00000'), w.decimals(18)])])
    .where((w) => [
      w.fees((fee) => [fee.id('0x00000'), fee.feePercentage('0.01')]),
    ])
    .select((s) => [s.id]);
  const actual = query.toString();
  const expected = `{
    pools(
      where: {
        fees_: {
          id: "0x00000",
          feePercentage: "0.01"
        }
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it.todo('allows for OR queries');

it("searches by a child entity's ID", () => {
  const g = createQuery<Query>();

  const query = g.pools
    .where((w) => w.token1.is('0x000'))
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pools(
      where: {
        token1: "0x000"
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects primitive fields', () => {
  const g = createQuery<Query>();
  const query = g.pools.select((s) => [
    s.id,
    s.liquidity,
    s.createdAtTimestamp,
  ]);

  const actual = query.toString();
  const expected = `{
    pools {
      id
      liquidity
      createdAtTimestamp
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects nested primitive fields', () => {
  const g = createQuery<Query>();
  // const query = g.pools.select((s) => [s.positions((s) => [s.id])]);
  const query = g.positions.select((s) => [s.pool((pool) => [pool.id])]);

  const actual = query.toString();
  const expected = `{
    positions {
      pool {
        id
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects deeply-nested primitive fields', () => {
  const g = createQuery<Query>();
  const query = g.positions.select((s) => [
    s.pool((pool) => [pool.mints((mint) => [mint.id])]),
  ]);

  const actual = query.toString();
  const expected = `{
    positions {
      pool {
        mints {
          id
        }
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects primitives with object-syntax', () => {
  const g = createQuery<Query>();
  const query = g.pools.select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    pools {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects and filters child entities with a nested query', () => {
  const g = createQuery<Query>();
  const query = g.pools.select(() => [
    g.positions.where((w) => w.owner.is('0x0')).select((s) => [s.nfpmAddress]),
  ]);

  const actual = query.toString();
  const expected = `{
    pools {
      positions(
        where: {
          owner: "0x0"
        }
      ) {
        nfpmAddress
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects and filters child entities with a nested query assigned to another field', () => {
  const q = createQuery<Query>();

  const query = q.pools.select((s) => [
    s.poolHourData(
      q.poolHourDatas
        .first(24)
        .orderBy('periodStartUnix')
        .orderDirection('desc')
        .select((s) => [s.volumeUSD, s.id])
    ),
  ]);

  const actual = query.toString();
  const expected = `{
      pools {
        poolHourData(
          first: 24
          orderBy: periodStartUnix
          orderDirection: desc
        ) {
          volumeUSD
          id
        }
      }
    }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects and filters child entities with a nested query assigned to an on... field', () => {
  const q = createQuery<Query>();

  const query = q.pools.select((s) => [
    s.on('Foo', (s) => [
      s.poolHourData(
        q.poolHourDatas
          .first(24)
          .orderBy('periodStartUnix')
          .orderDirection('desc')
          .select((s) => [s.volumeUSD, s.id])
      ),
    ]),
  ]);

  const actual = query.toString();
  const expected = `{
      pools {
        ... on Foo {
          poolHourData(
            first: 24
            orderBy: periodStartUnix
            orderDirection: desc
          ) {
            volumeUSD
            id
          }
        }
      }
    }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('works with optional fields', () => {
  const g = createQuery<NftxV3.Query>();
  const query = g.vaults
    .where((w) => [w.manager.is('0x0')])
    .select((s) => [s.is1155]);

  const actual = query.toString();
  const expected = `{
    vaults(where: { manager: "0x0" }) {
      is1155
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('works with implicit stringify', () => {
  const g = createQuery<Query>();
  const query = g.pools
    .where((w) => [w.liquidity.gt('0'), w.token0((w) => [w.id('0xAB')])])
    .select((s) => [
      s.liquidity,
      s.fees((s) => [s.id, s.feeType, s.feePercentage]),
      g.positions
        .where((w) => [w.owner.is('0x0')])
        .select((s) => [s.id, s.owner((s) => [s.id])]),
    ]);

  const actual = `${query}`;
  const expected = `{
    pools(
      where: {
        liquidity_gt: "0",
        token0_: {
          id: "0xab"
        }
      }
    ) {
      liquidity
      fees {
        id
        feeType
        feePercentage
      }
      positions(
        where: {
          owner: "0x0"
        }
      ) {
        id
        owner {
          id
        }
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('aliases fields', () => {
  const query = createQuery<Query>().pools.select((s) => [
    s.liquidity.as('w'),
    s.mints((s) => [s.timestamp]).as('x'),
    s.burns((s) => [s.timestamp.as('z')]).as('y'),
  ]);

  const actual = query.toString();
  const expected = `{
    pools {
      w: liquidity
      x: mints {
        timestamp
      }
      y: burns {
        z: timestamp
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('creates "... on" selectors', () => {
  const g = createQuery<NftxV3.Query>();

  const query = g.activityEvents.select((s) => [
    s.on<NftxV3.Mint>('Mint', (s) => [
      s.nftIds,
      s.feeReceipt((s) => [s.transfers((s) => [s.amount])]),
    ]),
    s.on<NftxV3.Redeem>('Redeem', (s) => [
      s.nftIds.as('redeemIds'),
      s.feeReceipt((s) => [s.transfers((s) => [s.amount])]),
    ]),
  ]);

  const actual = query.toString();
  const expected = `{
    activityEvents {
      ... on Mint {
        nftIds
        feeReceipt {
          transfers {
            amount
          }
        }
      }
      ... on Redeem {
        redeemIds: nftIds
        feeReceipt {
          transfers {
            amount
          }
        }
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

describe('when select has not been set', () => {
  it('throws an error', () => {
    const g = createQuery<Query>();
    const query = g.pools;

    expect(() => query.toString()).toThrow();
  });
});

it('sends a query to the subgraph', async () => {
  const response = { data: { pools: [] } };
  const fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    headers: { get: jest.fn().mockReturnValue('application/json') },
    text: async () => JSON.stringify(response),
  });
  const g = createQuery<Query>();
  const query = g.pools.select((s) => [s.id]).first(1);

  const result = await querySubgraph({
    url: 'https://example.com',
    query,
    fetch,
  });

  expect(fetch).toBeCalled();
  expect(fetch.mock.calls[0][1].body).toContain('pools');
  expect(fetch.mock.calls[0][1].body).toContain('first: 1');
  expect(fetch.mock.calls[0][1].body).toContain('id');
  expect(result).toEqual(response.data);
});

it('combines multiple queries into a single query request', async () => {
  const response = { data: { pools: [] } };
  const fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    headers: { get: jest.fn().mockReturnValue('application/json') },
    text: async () => JSON.stringify(response),
  });
  const g = createQuery<Query>();
  const q1 = g.pools.select((s) => [s.id]);
  const q2 = g.positions.select((s) => [s.id]);
  const q3 = g.accounts.select((s) => [s.id]);
  const query = q1.combine(q2).combine(q3);

  const actual = query.toString();
  const expected = `{
    pools {
      id
    }
    positions {
      id
    }
    accounts {
      id
    }
  }`;

  await querySubgraph({
    url: 'https://example.com',
    query,
    fetch,
  });

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
  expect(fetch.mock.calls[0][1].body).toContain('pools');
  expect(fetch.mock.calls[0][1].body).toContain('positions');
});
