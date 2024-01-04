import { WeiPerEther } from '@nftx/constants';
import { makeFetchInventoryPools } from '../fetchInventoryPools';
import { formatEther, parseEther } from 'viem';

let contract: any;
let getContract: jest.Mock;
let fetchInventoryPools: ReturnType<typeof makeFetchInventoryPools>;
let args: Parameters<typeof fetchInventoryPools>[0];
let run: () => ReturnType<typeof fetchInventoryPools>;

beforeEach(() => {
  contract = {
    read: {
      timelock: jest.fn().mockResolvedValue('3200'),
    },
  };
  getContract = jest.fn().mockReturnValue(contract);
  fetchInventoryPools = makeFetchInventoryPools({ getContract });
  args = {
    provider: {} as any,
    vaults: [
      {
        vaultId: '1',
        id: '0x1',
        vTokenToEth: WeiPerEther,
        createdAt: Date.now() / 1000 - 60 * 60 * 24 * 30,
      },
      {
        vaultId: '2',
        id: '0x2',
        vTokenToEth: WeiPerEther * 2n,
        createdAt: Date.now() / 1000 - 60 * 60 * 24 * 30,
      },
    ],
    feeReceipts: [
      {
        date: Date.now() / 1000 - 60 * 60 * 24 * 15,
        amount: parseEther('0.5'),
        vaultId: '1',
      },
      {
        date: Date.now() / 1000 - 60 * 60 * 24 * 15,
        amount: parseEther('0.25'),
        vaultId: '1',
      },
    ],
    positions: [
      {
        vaultId: '1',
        vToken: parseEther('1'),
        vTokenValue: parseEther('1'),
      },
      {
        vaultId: '1',
        vToken: parseEther('0.1'),
        vTokenValue: parseEther('0.2'),
      },
    ],
    liquidityPools: [
      {
        vaultId: '1',
        dailyVolume: parseEther('1'),
        weeklyVolume: parseEther('2'),
      },
      {
        vaultId: '2',
        dailyVolume: parseEther('0.1'),
        weeklyVolume: parseEther('0.2'),
      },
    ],
  };
  run = () => fetchInventoryPools(args);
});

it('returns a pool for each vault', async () => {
  const pools = await run();

  expect(pools).toHaveLength(2);
});

describe('when given a list of vault addresses', () => {
  beforeEach(() => {
    args.vaultAddresses = ['0x1'];
  });

  it('filters by vault address', async () => {
    const pools = await run();

    expect(pools).toHaveLength(1);
    expect(pools[0].vaultId).toEqual('1');
  });
});

describe('when given a list of vault ids', () => {
  beforeEach(() => {
    args.vaultIds = ['2'];
  });

  it('filters by vault id', async () => {
    const pools = await run();

    expect(pools).toHaveLength(1);
    expect(pools[0].vaultId).toEqual('2');
  });
});

it('sets the global timelock for each pool', async () => {
  const pools = await run();

  expect(pools[0].timelock).toEqual(3200);
  expect(pools[1].timelock).toEqual(3200);
});

it('calculates the vToken amount and ETH value of the pool', async () => {
  const pools = await run();

  expect(formatEther(pools[0].vToken)).toEqual('1.1');
  expect(formatEther(pools[0].vTokenValue)).toEqual('1.2');
  expect(formatEther(pools[1].vToken)).toEqual('0');
  expect(formatEther(pools[1].vTokenValue)).toEqual('0');
});

it('calculates the daily and weekly volume of the pool', async () => {
  const pools = await run();

  expect(formatEther(pools[0].dailyVolume)).toEqual('1');
  expect(formatEther(pools[0].weeklyVolume)).toEqual('2');
  expect(formatEther(pools[1].dailyVolume)).toEqual('0.1');
  expect(formatEther(pools[1].weeklyVolume)).toEqual('0.2');
});

it('calculates the period fees of the pool', async () => {
  const pools = await run();

  expect(formatEther(pools[0].periodFees['1y'])).toEqual('0.75');
  expect(formatEther(pools[1].periodFees['1y'])).toEqual('0');
});

it('calculates the APR of the pool', async () => {
  const pools = await run();

  expect(Number(formatEther(pools[0].apr['1y']))).toBeGreaterThan(0);
  expect(Number(formatEther(pools[1].apr['1y']))).toEqual(0);
});
