import 'isomorphic-fetch';
import { NftxV3, NftxV3Uniswap } from '@nftx/types';
import createQuery from '../createQuery';
import querySubgraph from '../querySubgraph';

type Query = NftxV3Uniswap.Query;

const ignoreWs = (str: string) => str.replace(/ /g, '').replace(/\n/g, '');

it('handles a single entity', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPool
    .id('0x1768ccc3fc3a40522fcd3296633ae8c00434b3b6')
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    liquidityPool(id: "0x1768ccc3fc3a40522fcd3296633ae8c00434b3b6") {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('handles a list entity', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('aliases the collection name', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.as('foo').select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    foo: liquidityPools {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('adds filters', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools
    .first(10)
    .orderBy('activeLiquidity')
    .orderDirection('desc')
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    liquidityPools(
      first: 10
      orderBy: activeLiquidity
      orderDirection: desc
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('searches by primitive values', () => {
  const g = createQuery<Query>();

  const query = g.liquidityPools
    .where((w) => [w.createdTimestamp('0')])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    liquidityPools(
      where: {
        createdTimestamp: "0"
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('strips out nullish values', () => {
  const g = createQuery<Query>();

  const query = g.liquidityPools
    .where((w) => [
      w.createdTimestamp(undefined),
      w.totalLiquidity(null),
      w.activeLiquidity.in(undefined),
      w.protocol((w) => [w.id.in(null), w.pools((w) => [w.id.is(undefined)])]),
    ])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
      liquidityPools {
        id
      }
    }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('filters with a contains query', () => {
  const q = createQuery<Query>();
  const query = q.withdraws
    .where((w) => [w.inputTokens.contains(['0x1234'])])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    withdraws(
      where: {
        inputTokens_contains: ["0x1234"]
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('filters by an exact array match', () => {
  const q = createQuery<Query>();
  const query = q.withdraws
    .where((w) => [w.inputTokenAmounts.isNot(['0', '0'])])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    withdraws(
      where: {
        inputTokenAmounts_not: ["0", "0"]
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

// For now we're just saying bigint fields should be stringified
// it('handles a bigint value', () => {
//   const g = createQuery<Query>();
//   const query = g.liquidityPools
//     .where((w) => w.activeLiquidity.is(0n))
//     .select((s) => [s.id]);

//   const actual = query.toString();
//   const expected = `{
//     liquidityPools(
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
  const query = g.liquidityPools
    .where((w) => [
      w.activeLiquidity.gt('0'),
      w.activeLiquidity.gte('1'),
      w.activeLiquidity.isNot('2'),
      w.activeLiquidity.lt('100000000000'),
      w.activeLiquidity.lte('9999999999'),
    ])
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    liquidityPools(
      where: {
        activeLiquidity_gt: "0",
        activeLiquidity_gte: "1",
        activeLiquidity_ne: "2",
        activeLiquidity_lt: "100000000000",
        activeLiquidity_lte: "9999999999"
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('searches on nested fields', () => {
  const g = createQuery<Query>();

  const query = g.liquidityPools
    .where((w) => [w.inputTokens((w) => [w.id('0x00000'), w.decimals(18)])])
    .select((s) => [s.id]);
  const actual = query.toString();
  const expected = `{
    liquidityPools(
      where: {
        inputTokens_: {
          id: "0x00000",
          decimals: 18
        }
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it("searches by a child entity's ID", () => {
  const g = createQuery<Query>();

  const query = g.liquidityPools
    .where((w) => w.protocol.is('0x000'))
    .select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    liquidityPools(
      where: {
        protocol: "0x000"
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects primitive fields', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.select((s) => [
    s.id,
    s.activeLiquidity,
    s.createdTimestamp,
  ]);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      id
      activeLiquidity
      createdTimestamp
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects nested primitive fields', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.select((s) => [s.positions((s) => [s.id])]);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      positions {
        id
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects deeply-nested primitive fields', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.select((s) => [
    s.positions((s) => [s.pool((s) => [s.id])]),
  ]);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      positions {
        pool {
          id
        }
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects primitives with object-syntax', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.select((s) => [s.id]);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects and filters child entities with a nested query', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.select(() => [
    g.positions
      .where((w) => w.account.is('0x0'))
      .select((s) => [s.depositCount]),
  ]);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      positions(
        where: {
          account: "0x0"
        }
      ) {
        depositCount
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects and filters child entities with a nested query assigned to another field', () => {
  const q = createQuery<Query>();

  const query = q.liquidityPools.select((s) => [
    s.hourlySnapshots(
      q.liquidityPoolHourlySnapshots
        .first(24)
        .orderBy('hour')
        .orderDirection('desc')
        .select((s) => [s.hourlyVolumeUSD, s.id])
    ),
  ]);
  const actual = query.toString();
  const expected = `{
      liquidityPools {
        hourlySnapshots(
          first: 24
          orderBy: hour
          orderDirection: desc
        ) {
          hourlyVolumeUSD
          id
        }
      }
    }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('selects and filters child entities with a nested query assigned to an on... field', () => {
  const q = createQuery<Query>();

  const query = q.liquidityPools.select((s) => [
    s.on('Foo', (s) => [
      s.hourlySnapshots(
        q.liquidityPoolHourlySnapshots
          .first(24)
          .orderBy('hour')
          .orderDirection('desc')
          .select((s) => [s.hourlyVolumeUSD, s.id])
      ),
    ]),
  ]);

  const actual = query.toString();
  const expected = `{
      liquidityPools {
        ... on Foo {
          hourlySnapshots(
            first: 24
            orderBy: hour
            orderDirection: desc
          ) {
            hourlyVolumeUSD
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
  const query = g.liquidityPools
    .where((w) => [
      w.activeLiquidity.gt('0'),
      w.inputTokens((w) => [w.id('0xAB')]),
    ])
    .select((s) => [
      s.activeLiquidity,
      s.fees((s) => [s.id, s.feeType, s.feePercentage]),
      g.positions
        .where((w) => [w.account.is('0x0')])
        .select((s) => [s.id, s.account((s) => [s.id])]),
    ]);

  const actual = `${query}`;
  const expected = `{
    liquidityPools(
      where: {
        activeLiquidity_gt: "0",
        inputTokens_: {
          id: "0xab"
        }
      }
    ) {
      activeLiquidity
      fees {
        id
        feeType
        feePercentage
      }
      positions(
        where: {
          account: "0x0"
        }
      ) {
        id
        account {
          id
        }
      }
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('aliases fields', () => {
  const query = createQuery<Query>().liquidityPools.select((s) => [
    s.activeLiquidity.as('liquidityActive'),
    s.deposits((s) => [s.blockNumber]).as('x'),
    s.positions((s) => [s.withdrawCount.as('totalWithdrawals')]).as('y'),
  ]);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      liquidityActive: activeLiquidity
      x: deposits {
        blockNumber
      }
      y: positions {
        totalWithdrawals: withdrawCount
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
    const query = g.liquidityPools;

    expect(() => query.toString()).toThrow();
  });
});

it('sends a query to the subgraph', async () => {
  const response = { data: { liquidityPools: [] } };
  const fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    headers: { get: jest.fn().mockReturnValue('application/json') },
    text: async () => JSON.stringify(response),
  });
  const g = createQuery<Query>();
  const query = g.liquidityPools.select((s) => [s.id]).first(1);

  const result = await querySubgraph({
    url: 'https://example.com',
    query,
    fetch,
  });

  expect(fetch).toBeCalled();
  expect(fetch.mock.calls[0][1].body).toContain('liquidityPools');
  expect(fetch.mock.calls[0][1].body).toContain('first: 1');
  expect(fetch.mock.calls[0][1].body).toContain('id');
  expect(result).toEqual(response.data);
});

it('combines multiple queries into a single query request', async () => {
  const response = { data: { liquidityPools: [] } };
  const fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    headers: { get: jest.fn().mockReturnValue('application/json') },
    text: async () => JSON.stringify(response),
  });
  const g = createQuery<Query>();
  const q1 = g.liquidityPools.select((s) => [s.id]);
  const q2 = g.positions.select((s) => [s.id]);
  const q3 = g.accounts.select((s) => [s.id]);
  const query = q1.combine(q2).combine(q3);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
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
  expect(fetch.mock.calls[0][1].body).toContain('liquidityPools');
  expect(fetch.mock.calls[0][1].body).toContain('positions');
});
