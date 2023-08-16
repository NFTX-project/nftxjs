import type { Address, LiquidityPool, Vault } from '@nftx/types';
import type { LiquidityPoolsResponse } from './types';
import calculatePeriodFees from './calculatePeriodFees';
import calcualateAprs from './calculateAprs';
import { getTickSpacing } from '../../univ3-helpers';

type Pool = LiquidityPoolsResponse['liquidityPools'][0];

const transformFees = (fees: Pool['fees']): LiquidityPool['fees'] => {
  return fees.map(({ feeType, id, feePercentage }) => {
    return {
      id: id as Address,
      feeType: feeType as LiquidityPool['fees'][0]['feeType'],
      feePercentage: Number(feePercentage),
    };
  });
};

const transformPool = (
  pool: Pool,
  vault: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>
): LiquidityPool => {
  const fees = transformFees(pool.fees);
  const tokens = pool.inputTokens.map(({ id, symbol, name }) => ({
    id: id as Address,
    symbol,
    name,
  }));
  const activeLiquidity = BigInt(pool.activeLiquidity);
  const totalLiquidity = BigInt(pool.totalLiquidity);
  const price = vault.vTokenToEth;
  const tick = BigInt(pool.tick ?? '0');
  const feeTier = Number(
    pool.fees.find((fee) => fee.feeType === 'FIXED_TRADING_FEE')
      ?.feePercentage ?? 0
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
    name: pool.name ?? '',
    periodFees,
    tick,
    tokens,
    totalLiquidity,
    vaultAddress: vault.id,
    vaultId: vault.vaultId,
  };
};

export default transformPool;
