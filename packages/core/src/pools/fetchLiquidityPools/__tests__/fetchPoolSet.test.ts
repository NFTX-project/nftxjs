import { WETH_TOKEN, WeiPerEther } from '@nftx/constants';
import { makeFetchPoolsSet } from '../fetchPoolsSet';
import { getChainConstant } from '@nftx/utils';
import { formatEther } from 'viem';

let poolData: any;
let queryPoolData: jest.Mock;
let fetchPoolsSet: ReturnType<typeof makeFetchPoolsSet>;
let args: Parameters<typeof fetchPoolsSet>[0];
let run: () => ReturnType<typeof fetchPoolsSet>;

beforeEach(() => {
  poolData = {
    liquidityPools: [
      {
        id: '0x',
        name: '0x',
        tick: 0,
        totalLiquidity: `${WeiPerEther * 3n}`,
        activeLiquidity: `${WeiPerEther * 2n}`,
        inputTokenBalances: [
          WeiPerEther.toString(),
          (WeiPerEther * 2n).toString(),
        ],
        totalValueLockedETH: '0',
        openPositionCount: 0,
        createdTimestamp: 0,
        fees: [
          {
            id: '0x',
            feePercentage: 0,
            feeType: 'FIXED_LP_FEE',
          },
          {
            id: '0x',
            feePercentage: 0,
            feeType: 'FIXED_PROTOCOL_FEE',
          },
          {
            id: '0x',
            feePercentage: 0.3,
            feeType: 'FIXED_TRADING_FEE',
          },
        ],
        inputTokens: [
          {
            id: '0x',
            symbol: '0x',
            name: '0x',
          },
          {
            id: getChainConstant(WETH_TOKEN, 1),
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
        ],
        hourlySnapshots: [
          {
            hourlyVolumeByTokenAmount: ['0', '0'],
            hourlyTotalRevenueETH: '0',
            id: '0x',
            inputTokenBalances: ['0', '0'],
            timestamp: 0,
          },
        ],
        dailySnapshots: [
          {
            dailyVolumeByTokenAmount: ['0', '0'],
            dailyTotalRevenueETH: '0.001',
            id: '0x',
            inputTokenBalances: ['0', '0'],
            timestamp: 0,
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
    poolData.liquidityPools[0].fees[2].feePercentage = 0.3;
  });

  it('calculates the daily and weekly revenue from the vault fee receipts', async () => {
    const [[pool]] = await run();

    expect(formatEther(pool.dailyRevenue)).toEqual('0');
    expect(formatEther(pool.weeklyRevenue)).toEqual('1.4');
  });
});

describe('when pool is a 1% tier', () => {
  beforeEach(() => {
    poolData.liquidityPools[0].fees[2].feePercentage = 1;
  });

  it('calculates the daily and weekly revenue from the AMM fees', async () => {
    const [[pool]] = await run();

    expect(formatEther(pool.dailyRevenue)).toEqual('0');
    expect(formatEther(pool.weeklyRevenue)).toEqual('0.001');
  });
});

describe('when there are more than 1000 pools', () => {
  beforeEach(() => {
    poolData.liquidityPools = Array.from({ length: 1000 }).fill(
      poolData.liquidityPools[0]
    );
  });

  it('returns a cursor', async () => {
    const [, cursor] = await run();

    expect(cursor).toEqual('0x');
  });
});
