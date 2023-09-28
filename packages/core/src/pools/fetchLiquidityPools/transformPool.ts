import type { Address, LiquidityPool, Vault } from '@nftx/types';
import type { LiquidityPoolsResponse } from './types';
import calculatePeriodFees from './calculatePeriodFees';
import calcualateAprs from './calculateAprs';
import {
  FeePercentage,
  WeiPerEther,
  Zero,
  feeTierToTickSpacing,
  percentageToFeeTier,
} from '@nftx/constants';

type Pool = LiquidityPoolsResponse['liquidityPools'][0];

const transformFees = (fees: Pool['fees']): LiquidityPool['fees'] => {
  return fees.map((fee): LiquidityPool['fees'][0] => {
    const id = fee.id as Address;
    const feeType = fee.feeType as LiquidityPool['fees'][0]['feeType'];
    const feePercentage = Number(fee.feePercentage) as FeePercentage;

    return {
      id,
      feeType,
      feePercentage,
    };
  });
};

const transformPool = (
  pool: Pool,
  vault: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>,
  totalPositions: number
): LiquidityPool => {
  const fees = transformFees(pool.fees);
  const tokens = pool.inputTokens.map(({ id, symbol, name }, i) => ({
    id: id as Address,
    symbol,
    name,
    balance: BigInt(pool.inputTokenBalances[i] ?? '0'),
  }));
  const activeLiquidity = BigInt(pool.activeLiquidity ?? '0');
  const totalLiquidity = BigInt(pool.totalLiquidity ?? '0');
  const price = vault.vTokenToEth;
  const tick = BigInt(pool.tick ?? '0');
  const feePercentage = Number(
    pool.fees.find((fee) => fee.feeType === 'FIXED_TRADING_FEE')
      ?.feePercentage ?? 0
  );
  const feeTier = percentageToFeeTier(feePercentage);
  const tickSpacing = feeTierToTickSpacing(feeTier);
  const totalValueLocked = BigInt(pool.totalValueLockedUSD ?? '0');
  const inRangeLiquidity =
    totalLiquidity > Zero
      ? (activeLiquidity * WeiPerEther) / totalLiquidity
      : Zero;
  // If a pool is in the subgraph then it exists
  // We build a list of "missing" pools later on
  const exists = true;

  const periodFees = calculatePeriodFees();

  const dailyVolume = pool.hourlySnapshots.reduce((total, snapshot) => {
    return total + BigInt(snapshot.hourlyVolumeUSD ?? '0');
  }, Zero);
  const dailyRevenue = pool.hourlySnapshots.reduce((total, snapshot) => {
    return total + BigInt(snapshot.hourlyTotalRevenueUSD ?? '0');
  }, Zero);
  const weeklyVolume = pool.dailySnapshots.reduce((total, snapshot) => {
    return total + BigInt(snapshot.dailyVolumeUSD ?? '0');
  }, Zero);
  const weeklyRevenue = pool.dailySnapshots.reduce((total, snapshot) => {
    return total + BigInt(snapshot.dailyTotalRevenueUSD ?? '0');
  }, Zero);

  const apr = calcualateAprs({
    activeLiquidity,
    currentTick: tick,
    periodFees,
    price,
    tickSpacing,
    totalLiquidity,
  });

  return {
    activeLiquidity,
    apr,
    exists,
    fees,
    feeTier,
    id: pool.id,
    name: pool.name ?? '',
    periodFees,
    tick,
    tokens,
    totalLiquidity,
    vaultAddress: vault.id,
    vaultId: vault.vaultId,
    dailyRevenue,
    dailyVolume,
    inRangeLiquidity,
    totalValueLocked,
    weeklyRevenue,
    weeklyVolume,
    totalPositions,
  };
};

export default transformPool;
