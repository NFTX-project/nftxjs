import { WETH_TOKEN, WeiPerEther } from '@nftx/constants';
import { makeFetchPoolsSet } from '../fetchPoolsSet';
import { getChainConstant } from '@nftx/utils';
import { NftxV3Uniswap } from '@nftx/types';
import { formatEther } from 'viem';

let poolData: { pools: NftxV3Uniswap.Pool[] };
let queryPoolData: jest.Mock;
let fetchPoolsSet: ReturnType<typeof makeFetchPoolsSet>;
let args: Parameters<typeof fetchPoolsSet>[0];
let run: () => ReturnType<typeof fetchPoolsSet>;

beforeEach(() => {
  const _pool = {} as NftxV3Uniswap.Pool;
  const _token = {} as NftxV3Uniswap.Token;
  const _poolHourData = {} as NftxV3Uniswap.PoolHourData;
  const _poolDayData = {} as NftxV3Uniswap.PoolDayData;

  poolData = {
    pools: [
      {
        ..._pool,
        id: '0x',
        name: '0x',
        tick: '0',
        totalLiquidity: `${WeiPerEther * 3n}`,
        liquidity: `${WeiPerEther * 2n}`,
        totalValueLockedToken0: '1',
        totalValueLockedToken1: '2',
        totalValueLockedETH: '0',
        openPositionCount: 0,
        createdAtTimestamp: '0',
        fees: [
          {
            id: '0x',
            feePercentage: '0',
            feeType: 'FIXED_LP_FEE' as NftxV3Uniswap.PoolFeeType,
          },
          {
            id: '0x',
            feePercentage: '0',
            feeType: 'FIXED_PROTOCOL_FEE' as NftxV3Uniswap.PoolFeeType,
          },
          {
            id: '0x',
            feePercentage: '0.3',
            feeType: 'FIXED_TRADING_FEE' as NftxV3Uniswap.PoolFeeType,
          },
        ],
        token0: { ..._token, id: '0x', symbol: '0x', name: '0x' },
        token1: {
          ..._token,
          id: getChainConstant(WETH_TOKEN, 1),
          symbol: 'WETH',
          name: 'Wrapped Ether',
        },
        inputTokens: [
          { ..._token, id: '0x', symbol: '0x', name: '0x' },
          {
            ..._token,
            id: getChainConstant(WETH_TOKEN, 1),
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
        ],
        poolHourData: [
          {
            ..._poolHourData,
            volumeToken0: '0',
            volumeToken1: '0',
            totalValueLockedToken0: '0',
            totalValueLockedToken1: '0',
            feesETH: '0',
            id: '0x',
            periodStartUnix: 0,
          },
        ],
        poolDayData: [
          {
            ..._poolDayData,
            volumeToken0: '0',
            volumeToken1: '1',
            feesETH: '0.001',
            id: '0x',
            totalValueLockedToken0: '0',
            totalValueLockedToken1: '0',
            date: 0,
          },
        ],
      },
    ],
  };
  queryPoolData = jest.fn().mockResolvedValue(poolData);
  fetchPoolsSet = makeFetchPoolsSet({ queryPoolData });
  args = {
    network: 1,
    vaults: [
      {
        id: '0x',
        vaultId: '0',
        createdAt: 0,
        vTokenToEth: WeiPerEther,
      },
    ],
    feeReceipts: [
      {
        amount: WeiPerEther / 5n,
        date: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 4,
        vaultAddress: '0x',
        vaultId: '0',
      },
      {
        amount: WeiPerEther / 5n,
        date: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 4,
        vaultAddress: '0x',
        vaultId: '0',
      },
    ],
    premiumPaids: [
      {
        amount: WeiPerEther / 2n,
        date: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 4,
        vaultId: '0',
      },
      {
        amount: WeiPerEther / 2n,
        date: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 4,
        vaultId: '0',
      },
    ],
  };
  run = () => fetchPoolsSet(args);
});

it('returns a set of liquidity pools', async () => {
  const [pools] = await run();

  expect(pools).toHaveLength(1);
});

it('includes the input tokens and their current balances', async () => {
  const [[pool]] = await run();

  expect(pool.tokens).toHaveLength(2);
  expect(pool.tokens[0].id).toEqual('0x');
  expect(pool.tokens[0].symbol).toEqual('0x');
  expect(pool.tokens[0].name).toEqual('0x');
  expect(pool.tokens[0].balance).toEqual(WeiPerEther);

  expect(pool.tokens[1].id).toEqual(getChainConstant(WETH_TOKEN, 1));
  expect(pool.tokens[1].symbol).toEqual('WETH');
  expect(pool.tokens[1].name).toEqual('Wrapped Ether');
  expect(pool.tokens[1].balance).toEqual(WeiPerEther * 2n);
});

it('calculates the fee tier', async () => {
  const [[pool]] = await run();

  expect(pool.feeTier).toEqual(3_000);
});

it('calculates the in-range liquidity', async () => {
  const [[pool]] = await run();

  // 0.6 %
  expect(formatEther(pool.inRangeLiquidity)).toEqual('0.666666666666666666');
});

it("calculates the pool's period fees", async () => {
  const [[pool]] = await run();

  expect(formatEther(pool.periodFees['1y'])).toEqual('0.4');
});

it('calculates dailsy and weekly volume', async () => {
  const [[pool]] = await run();

  expect(formatEther(pool.dailyVolume)).toEqual('0');
  expect(formatEther(pool.weeklyVolume)).toEqual('0');
});

it('calculates the APRs', async () => {
  const [[pool]] = await run();

  expect(formatEther(pool.apr['1y'])).toEqual('0');
});

describe('when pool is a 0.3% tier', () => {
  beforeEach(() => {
    poolData.pools[0].fees[2].feePercentage = '0.3';
  });

  it('calculates the daily and weekly revenue from the vault fee receipts', async () => {
    const [[pool]] = await run();

    expect(formatEther(pool.dailyRevenue)).toEqual('0');
    expect(formatEther(pool.weeklyRevenue)).toEqual('1.401');
  });
});

describe('when pool is a 1% tier', () => {
  beforeEach(() => {
    poolData.pools[0].fees[2].feePercentage = '1';
  });

  it('calculates the daily and weekly revenue from the AMM fees', async () => {
    const [[pool]] = await run();

    expect(formatEther(pool.dailyRevenue)).toEqual('0');
    expect(formatEther(pool.weeklyRevenue)).toEqual('0.001');
  });
});

describe('when there are more than 1000 pools', () => {
  beforeEach(() => {
    poolData.pools = Array.from<NftxV3Uniswap.Pool>({ length: 1000 }).fill(
      poolData.pools[0]
    );
  });

  it('returns a cursor', async () => {
    const [, cursor] = await run();

    expect(cursor).toEqual('0x');
  });
});
