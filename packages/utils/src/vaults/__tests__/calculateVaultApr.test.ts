import { Zero } from '@nftx/constants';
import { parseEther } from 'viem';
import calculateVaultApr from '../calculateVaultApr';

type Args = Parameters<typeof calculateVaultApr>[0];
type Vault = Args['vault'];

let vault: Vault;
let slpSupply: bigint;
let slpBalance: bigint;
let xTokenSupply: bigint;
let xTokenShare: bigint;
let periodFees: bigint;
let run: () => ReturnType<typeof calculateVaultApr>;

beforeEach(() => {
  vault = {
    createdAt: Date.now() / 1000 - 60 * 60 * 24 * 365,
    reserveVtoken: parseEther('10'),
  };
  slpSupply = parseEther('100');
  slpBalance = parseEther('50');
  xTokenShare = parseEther('1');
  xTokenSupply = parseEther('10');
  periodFees = parseEther('5');

  run = () =>
    calculateVaultApr({
      periodFees,
      slpBalance,
      slpSupply,
      vault,
      xTokenShare,
      xTokenSupply,
    });
});

describe('when the vault is older than 30 days', () => {
  it("returns the vault's 30 day APR rate", () => {
    const { inventoryApr, liquidityApr } = run();

    expect(inventoryApr).toBe(1.2); // 120%
    expect(liquidityApr).toBe(4.8); // 480%
  });
});

describe('when the vault is less than 30 days old', () => {
  beforeEach(() => {
    // If we do exactly 10 days ago we sometimes hit rounding/race-condition issues
    // due to getPeriodMultiplier using Date.now(), which results in sometimes
    // rounding up to 11 days and then only calculating x2 instead of x3
    // So stick to 9 days ago and we get consistent results
    vault.createdAt = Date.now() / 1000 - 60 * 60 * 24 * 9;
  });

  it('returns a pro-rata estimate of the 30-day APR', () => {
    const { inventoryApr, liquidityApr } = run();

    // The vault was created ~10 days ago instead of 30+
    // We should therefore be multiplying the fees to get 30 days' worth
    // aka tenDaysFees * 3
    expect(inventoryApr).toBe(3.6); // 360% (120% * 3)
    expect(liquidityApr).toBe(14.4); // 1,440% (480% * 3)
  });
});

describe('when there have been no period fees', () => {
  beforeEach(() => {
    periodFees = Zero;
  });

  it('returns 0', () => {
    const { inventoryApr, liquidityApr } = run();

    expect(inventoryApr).toBe(0);
    expect(liquidityApr).toBe(0);
  });
});

describe('when there is no slp balance', () => {
  beforeEach(() => {
    slpBalance = Zero;
  });

  it('returns a liquidity apr of 0', () => {
    const { inventoryApr, liquidityApr } = run();

    expect(inventoryApr).toBe(1.2);
    expect(liquidityApr).toBe(0);
  });
});

describe('when there is no xToken', () => {
  beforeEach(() => {
    xTokenSupply = Zero;
  });

  it('returns an inventory apr of 0', () => {
    const { inventoryApr, liquidityApr } = run();

    expect(inventoryApr).toBe(0);
    expect(liquidityApr).toBe(4.8);
  });
});
