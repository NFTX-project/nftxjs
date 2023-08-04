import 'isomorphic-fetch';
import type { Query } from '../../types/nftx-v3-uniswap';
import createQuery from '..';
import querySubgraph from '../../querySubgraph';

const ignoreWs = (str: string) => str.replace(/ /g, '').replace(/\n/g, '');

it('handles a single entity', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPool
    .id('0x1768ccc3fc3a40522fcd3296633ae8c00434b3b6')
    .select(['id']);

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
  const query = g.liquidityPools.select(['id']);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
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
    .select(['id']);

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
    .where({ createdTimestamp: '0' })
    .select(['id']);

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

it('handles a bigint value', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools.where({ activeLiquidity: 0n }).select(['id']);

  const actual = query.toString();
  const expected = `{
    liquidityPools(
      where: {
        activeLiquidity: 0
      }
    ) {
      id
    }
  }`;

  expect(ignoreWs(actual)).toBe(ignoreWs(expected));
});

it('searches by lt/lte/gt/gte/ne', () => {
  const g = createQuery<Query>();
  const query = g.liquidityPools
    .where({
      activeLiquidity: {
        gt: '0',
        gte: '1',
        isNot: '2',
        lt: '100000000000',
        lte: '9999999999',
      },
    })
    .select(['id']);

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
    .where({ inputTokens: { id: '0x00000' } })
    .select(['id']);

  const actual = query.toString();
  const expected = `{
    liquidityPools(
      where: {
        inputTokens_: {
          id: "0x00000"
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
  const query = g.liquidityPools.where({ protocol: '0x000' }).select(['id']);

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
  const query = g.liquidityPools.select([
    'id',
    'activeLiquidity',
    'createdTimestamp',
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
  const query = g.liquidityPools.select({ positions: ['id'] });

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
  const query = g.liquidityPools.select({ positions: { pool: ['id'] } });

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
  const query = g.liquidityPools.select({ id: true });

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
  const query = g.liquidityPools.select({
    positions: g.positions.where({ account: '0x0' }).select(['depositCount']),
  });

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
  const query = g.liquidityPools.select(['id']).first(1);

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
  const q1 = g.liquidityPools.select(['id']);
  const q2 = g.positions.select(['id']);
  const query = g.combine(q1, q2);

  const actual = query.toString();
  const expected = `{
    liquidityPools {
      id
    }
    positions {
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
