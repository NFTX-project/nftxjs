import type {
  Address,
  LiquidityPool,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';
import type { LiquidityPoolsResponse } from './types';
import calculatePeriodFees from './calculatePeriodFees';
import calcualateAprs from './calculateAprs';
import {
  FeePercentage,
  WETH_TOKEN,
  WeiPerEther,
  Zero,
  percentageToFeeTier,
} from '@nftx/constants';
import { addressEqual, getChainConstant } from '@nftx/utils';
import { parseEther } from 'viem';

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
  network: number,
  pool: Pool,
  vault: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth' | 'createdAt'>,
  totalPositions: number,
  receipts: VaultFeeReceipt[]
): LiquidityPool => {
  const fees = transformFees(pool.fees);
  const tokens = pool.inputTokens.map(({ id, symbol, name }, i) => ({
    id: id as Address,
    symbol,
    name,
    balance: BigInt(pool.inputTokenBalances[i] ?? '0'),
  }));
  const wethToken = getChainConstant(WETH_TOKEN, network);
  const isWeth0 = addressEqual(tokens[0].id, wethToken);
  const activeLiquidity = BigInt(pool.activeLiquidity ?? '0');
  const totalLiquidity = BigInt(pool.totalLiquidity ?? '0');
  const tick = BigInt(pool.tick ?? '0');
  const feePercentage = Number(
    pool.fees.find((fee) => fee.feeType === 'FIXED_TRADING_FEE')
      ?.feePercentage ?? 0
  );
  const feeTier = percentageToFeeTier(feePercentage);
  const totalValueLocked = parseEther(
    (pool.totalValueLockedETH ?? '0') as `${number}`
  );
  const inRangeLiquidity =
    totalLiquidity > Zero
      ? (activeLiquidity * WeiPerEther) / totalLiquidity
      : Zero;
  // If a pool is in the subgraph then it exists
  // We build a list of "missing" pools later on
  const exists = true;

  const periodFees = calculatePeriodFees(receipts);

  const dailyVolume = pool.hourlySnapshots.reduce((total, snapshot) => {
    const value = BigInt(
      snapshot.hourlyVolumeByTokenAmount[isWeth0 ? 0 : 1] ?? '0'
    );
    return total + value;
  }, Zero);
  const dailyRevenue = pool.hourlySnapshots.reduce((total, snapshot) => {
    return total + BigInt(snapshot.hourlyTotalRevenueUSD ?? '0');
  }, Zero);
  const weeklyVolume = pool.dailySnapshots.reduce((total, snapshot) => {
    const value = BigInt(
      snapshot.dailyVolumeByTokenAmount[isWeth0 ? 0 : 1] ?? '0'
    );
    return total + value;
  }, Zero);
  const weeklyRevenue = pool.dailySnapshots.reduce((total, snapshot) => {
    return total + BigInt(snapshot.dailyTotalRevenueUSD ?? '0');
  }, Zero);

  const eth = tokens[isWeth0 ? 0 : 1].balance;
  const vToken = tokens[isWeth0 ? 1 : 0].balance;
  const vTokenValue = (vToken * vault.vTokenToEth) / WeiPerEther;
  const poolValue = eth + vTokenValue;

  const apr = calcualateAprs({
    periodFees,
    createdAt: vault.createdAt,
    poolValue,
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
