import { makeQueryPoolData } from '../queryPoolData';

let poolDataResponse: any;
let querySubgraph: jest.Mock;
let queryPoolData: ReturnType<typeof makeQueryPoolData>;
let args: Parameters<typeof queryPoolData>[0];
let run: () => ReturnType<typeof queryPoolData>;

beforeEach(() => {
  poolDataResponse = {
    liquidityPools: [
      {
        id: '0x',
        name: '0x',
        tick: 0,
        totalLiquidity: '0',
        activeLiquidity: '0',
        inputTokenBalances: ['0', '0'],
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
            feePercentage: 0,
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
            id: '0x',
            symbol: '0x',
            name: '0x',
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
            id: '0x',
            day: 0,
            dailyVolumeByTokenAmount: ['0', '0'],
            dailyTotalRevenueETH: '0',
            inputTokenBalances: ['0', '0'],
            timestamp: 0,
          },
        ],
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(poolDataResponse);
  queryPoolData = makeQueryPoolData({ querySubgraph });
  args = {
    network: 1,
    vaults: [
      {
        id: '0x',
        vaultId: '0',
      },
    ],
  };
  run = () => queryPoolData(args);
});

it('fetches pool data from the subgraph', async () => {
  const pools = await run();

  expect(pools).toEqual(poolDataResponse);
});

describe('when vault addresses are provided', () => {
  beforeEach(() => {
    args.vaultAddresses = ['0x'];
  });

  it('filters pools by vaultAddresses', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();
    expect(query).toContain('id_in: ["0x"]');
  });
});

describe('when vaultIds are provided', () => {
  beforeEach(() => {
    args.vaultIds = ['0'];
  });

  it('filters pools by vaultIds', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();
    expect(query).toContain('id_in: ["0x"]');
  });
});
