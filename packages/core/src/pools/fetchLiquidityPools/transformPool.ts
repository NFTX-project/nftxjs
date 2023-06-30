import type { LiquidityPool, Vault } from '@nftx/types';
import type { LiquidityPoolsResponse } from './types';
import calculatePeriodFees from './calculatePeriodFees';
import calcualateAprs from './calculateAprs';
import { getTickSpacing } from '../../univ3-helpers';

type Pool = LiquidityPoolsResponse['liquidityPools'][0];

const transformFees = (fees: Pool['fees']): LiquidityPool['fees'] => {
  return fees.map(({ feeType, id, percentage }) => {
    return {
      id,
      feeType,
      feePercentage: Number(percentage),
    };
  });
};

const transformPool = (
  pool: Pool,
  vault: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>
): LiquidityPool => {
  const fees = transformFees(pool.fees);
  const tokens = pool.inputTokens;
  const activeLiquidity = BigInt(pool.activeLiquidity);
  const totalLiquidity = BigInt(pool.totalLiquidity);
  const price = vault.vTokenToEth;
  const tick = BigInt(pool.tick);
  const feeTier = Number(
    pool.fees.find((fee) => fee.feeType === 'FIXED_TRADING_FEE')?.percentage ??
      0
  ) as 1;
  const tickSpacing = getTickSpacing(feeTier);
  // If a pool is in the subgraph then it exists
  // We build a list of "missing" pools later on
  const exists = true;

  const periodFees = calculatePeriodFees();

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
    name: pool.name,
    periodFees,
    tick,
    tokens,
    totalLiquidity,
    vaultAddress: vault.id,
    vaultId: vault.vaultId,
  };
};

export default transformPool;
