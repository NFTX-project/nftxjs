import type { InventoryPool } from '@nftx/types';
import { WeiPerEther, Zero } from '@nftx/constants';

const ONE_DAY = 86400;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_DAY * 365;

export const LIQUIDITY_SHARE = 800000000000000000n; // 80%
export const INVENTORY_SHARE = 200000000000000000n; // 20%

const getProRataMultiplier = (vaultAge: number, periodLength: number) => {
  if (vaultAge < periodLength) {
    // Vault isn't as old as the period we're measuring
    return Math.floor(ONE_YEAR / vaultAge);
  }
  if (periodLength < ONE_YEAR) {
    return Math.floor(ONE_YEAR / periodLength);
  }
  if (periodLength > ONE_YEAR) {
    return Math.floor(periodLength / ONE_YEAR);
  }

  return 1;
};

const calculateAprForPeriod = ({
  vaultAge,
  poolValue,
  periodFees,
  periodLength,
  share,
}: {
  vaultAge: number;
  periodLength: number;
  periodFees: bigint;
  poolValue: bigint;
  share: bigint;
}) => {
  if (!poolValue || !periodFees) {
    return Zero;
  }
  const proRataMultiplier = getProRataMultiplier(vaultAge, periodLength);

  // (periodFees * proRataMultiplier * 0.8%) / liquidity
  const numerator =
    (periodFees * BigInt(proRataMultiplier) * share) / WeiPerEther;
  const denominator = poolValue;
  const apr = (numerator * WeiPerEther) / denominator;

  return apr;
};

const calculateAprs = ({
  createdAt,
  periodFees,
  share = INVENTORY_SHARE,
  poolValue,
}: {
  createdAt: number;
  periodFees: InventoryPool['periodFees'];
  poolValue: bigint;
  share?: bigint;
}): InventoryPool['apr'] => {
  const now = Math.floor(Date.now() / 1000);
  const vaultAge = now - createdAt;

  return {
    '24h': calculateAprForPeriod({
      vaultAge,
      periodFees: periodFees['24h'],
      periodLength: ONE_DAY,
      poolValue,
      share,
    }),
    '7d': calculateAprForPeriod({
      vaultAge,
      periodFees: periodFees['7d'],
      periodLength: ONE_WEEK,
      share,
      poolValue,
    }),
    '1m': calculateAprForPeriod({
      vaultAge,
      periodFees: periodFees['1m'],
      periodLength: ONE_MONTH,
      share,
      poolValue,
    }),
    all: calculateAprForPeriod({
      vaultAge,
      periodFees: periodFees.all,
      periodLength: now - createdAt,
      share,
      poolValue,
    }),
  };
};

export default calculateAprs;
