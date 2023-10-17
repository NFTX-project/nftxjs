import { WeiPerEther, Zero } from '@nftx/constants';
import { estimatePremiumPrice } from '../../common';
import { formatEther } from 'viem';

let holding: { dateAdded: number };
let vTokenToEth: bigint;
let now: number;
let run: () => ReturnType<typeof estimatePremiumPrice>;

beforeEach(() => {
  now = Date.now() / 1000;
  holding = { dateAdded: 0 };
  vTokenToEth = WeiPerEther;
  run = () => estimatePremiumPrice({ holding, vTokenToEth, now });
});

describe('when holding is older than 10 hours', () => {
  beforeEach(() => {
    holding.dateAdded = now - 36001;
  });

  it('returns 0', () => {
    const [, result] = run();

    expect(result).toBe(Zero);
  });
});

describe('when holding does not exist', () => {
  beforeEach(() => {
    holding = null as any;
  });

  it('returns 0', () => {
    const [, result] = run();

    expect(result).toBe(Zero);
  });
});

describe('when holding is brand new', () => {
  beforeEach(() => {
    holding.dateAdded = now;
  });

  it('returns the max estimate', () => {
    const [, result] = run();

    expect(formatEther(result)).toBe('4.995117187500000256');
  });
});

describe('when holding is 30 minutes old', () => {
  beforeEach(() => {
    holding.dateAdded = now - 1800;
  });

  it('returns an estimate based on an exponential curve', () => {
    const [, result] = run();

    expect(formatEther(result)).toBe('3.530651093432737792');
  });
});
