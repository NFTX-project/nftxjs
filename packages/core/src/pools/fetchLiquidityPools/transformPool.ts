import type {
  Address,
  LiquidityPool,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';
import type { LiquidityPoolsResponse } from './types';
import {
  FeePercentage,
  VAULT_FEE_TIER,
  WETH_TOKEN,
  WeiPerEther,
  Zero,
  percentageToFeeTier,
} from '@nftx/constants';
import {
  addressEqual,
  calculatePoolPeriodFees,
  getChainConstant,
} from '@nftx/utils';
import { parseEther } from 'viem';
import calculateAprs from './calculateAprs';
import { calculatePriceFromTick } from '../../univ3-helpers';

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
  receipts: VaultFeeReceipt[],
  premiumPaids: { amount: bigint; date: number }[]
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
  const tickValue = calculatePriceFromTick(tick);
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

  const periodFees = calculatePoolPeriodFees(receipts);

  const now = Math.floor(Date.now() / 1000);
  const oneDayAgo = now - 60 * 60 * 24;
  const oneWeekAgo = now - 60 * 60 * 24 * 7;

  const dailyVolume = pool.hourlySnapshots.reduce((total, snapshot) => {
    if (Number(snapshot.timestamp) >= oneDayAgo) {
      const value = BigInt(
        snapshot.hourlyVolumeByTokenAmount[isWeth0 ? 0 : 1] ?? '0'
      );
      return total + value;
    }
    return total;
  }, Zero);

  const weeklyVolume = pool.dailySnapshots.reduce((total, snapshot) => {
    if (Number(snapshot.timestamp) >= oneWeekAgo) {
      const value = BigInt(
        snapshot.dailyVolumeByTokenAmount[isWeth0 ? 0 : 1] ?? '0'
      );
      return total + value;
    }
    return total;
  }, Zero);

  let dailyRevenue = Zero;
  let weeklyRevenue = Zero;

  if (feeTier === VAULT_FEE_TIER) {
    // Only the 0.3% pool gets vault fees
    dailyRevenue = [...receipts, ...premiumPaids].reduce((total, receipt) => {
      if (receipt.date >= oneDayAgo) {
        return total + receipt.amount;
      }
      return total;
    }, Zero);
    weeklyRevenue = [...receipts, ...premiumPaids].reduce((total, receipt) => {
      if (receipt.date >= oneWeekAgo) {
        return total + receipt.amount;
      }
      return total;
    }, Zero);
  } else {
    // All other pools only get the AMM fees
    dailyRevenue = pool.hourlySnapshots.reduce((total, snapshot) => {
      if (Number(snapshot.timestamp) >= oneDayAgo) {
        return total + parseEther(snapshot.hourlyTotalRevenueETH ?? '0');
      }
      return total;
    }, Zero);
    weeklyRevenue = pool.dailySnapshots.reduce((total, snapshot) => {
      if (Number(snapshot.timestamp) >= oneWeekAgo) {
        return total + parseEther(snapshot.dailyTotalRevenueETH ?? '0');
      }
      return total + parseEther(snapshot.dailyTotalRevenueETH ?? '0');
    }, Zero);
  }

  const apr = calculateAprs({
    createdAt: Number(pool.createdTimestamp),
    dailySnapshots: pool.dailySnapshots,
    isWeth0,
    vaultFeeReceipts: receipts,
    vTokenToEth: vault.vTokenToEth,
    feeTier,
  });

  return {
    activeLiquidity,
    apr,
    exists,
    fees,
    feeTier,
    id: pool.id as Address,
    name: pool.name ?? '',
    periodFees,
    tick,
    tickValue,
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
