import { FeeTier, percentageToFeeTier } from '@nftx/constants';
import calculateAprs from '../calculateAprs';
import { formatEther, parseEther } from 'viem';

const ONE_DAY = 60 * 60 * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_DAY * 365;

type Args = Parameters<typeof calculateAprs>[0];
let createdAt: Args['createdAt'];
let dailySnapshots: Args['dailySnapshots'];
let vaultFeeReceipts: Args['vaultFeeReceipts'];
let vTokenToEth: Args['vTokenToEth'];
let isWeth0: boolean;
let feeTier: FeeTier;
let run: () => ReturnType<typeof calculateAprs>;

let now: number;

beforeEach(() => {
  now = Math.floor(Date.now() / 1000);
  const oneMonthAgo = now - ONE_MONTH;

  createdAt = oneMonthAgo;
  dailySnapshots = [
    {
      dailyTotalRevenueETH: '0.01',
      inputTokenBalances: [
        parseEther('10').toString(),
        parseEther('5').toString(),
      ],
      timestamp: `${now - ONE_DAY * 2}`,
    },
    {
      dailyTotalRevenueETH: '0.02',
      inputTokenBalances: [
        parseEther('10').toString(),
        parseEther('5').toString(),
      ],
      timestamp: `${now - ONE_DAY * 3}`,
    },
  ];
  vaultFeeReceipts = [
    {
      amount: parseEther('0.1'),
      date: now - ONE_DAY * 2,
      vaultAddress: '0x0',
      vaultId: '0',
    },
  ];
  vTokenToEth = 0n;
  isWeth0 = false;
  feeTier = 3_000;

  run = () =>
    calculateAprs({
      createdAt,
      dailySnapshots,
      vaultFeeReceipts,
      vTokenToEth,
      isWeth0,
      feeTier,
    });
});

describe('when pool is a 0.3% tier', () => {
  beforeEach(() => {
    feeTier = percentageToFeeTier(0.003);
  });

  it('calculates APRs using vault fee receipts', () => {
    const result = run();

    // No activity in the last 24 hours, so no APR.
    expect(formatEther(result['24h'])).toBe('0');
    // All activity has happened within the last 7 days
    expect(formatEther(result['7d'])).toBe('1.668571428571428571');
    // Activity has happened within the last month but there's 3  weeks of inactivity so should be lower than 7D
    expect(formatEther(result['1m'])).toBe('0.389333333333333333');
    // No activity happened for the rest of the year, but since the vault is only a month old, the APR is the same as 1M
    expect(formatEther(result['1y'])).toBe('0.389333333333333333');
  });

  describe('when vault is over 1 year old', () => {
    beforeEach(() => {
      createdAt = now - ONE_YEAR - ONE_WEEK;
    });

    it('calculates APRs using a years worth of vault fee receipts', () => {
      const result = run();

      // No activity in the last 24 hours, so no APR.
      expect(formatEther(result['24h'])).toBe('0');
      // All activity has happened within the last 7 days
      expect(formatEther(result['7d'])).toBe('1.668571428571428571');
      // Activity has happened within the last month but there's 3  weeks of inactivity so should be lower than 7D
      expect(formatEther(result['1m'])).toBe('0.389333333333333333');
      // No activity happened for the rest of the year, so should be lower than 1M
      expect(formatEther(result['1y'])).toBe('0.032');
    });
  });
});

describe('when pool is not a 1% tier', () => {
  beforeEach(() => {
    feeTier = percentageToFeeTier(0.01);
  });

  it('calculates APRs using AMM fees', () => {
    const result = run();

    // No activity in the last 24 hours, so no APR.
    expect(formatEther(result['24h'])).toBe('0');
    // All activity has happened within the last 7 days
    expect(formatEther(result['7d'])).toBe('0.417142857142857142');
    // Activity has happened within the last month but there's 3  weeks of inactivity so should be lower than 7D
    expect(formatEther(result['1m'])).toBe('0.097333333333333333');
    // No activity happened for the rest of the year, but since the vault is only a month old, the APR is the same as 1M
    expect(formatEther(result['1y'])).toBe('0.097333333333333333');
  });
});
