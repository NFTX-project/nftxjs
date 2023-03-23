import { WeiPerEther, Zero } from '@nftx/constants';
import type { TokenReserve } from '@nftx/types';
import { formatEther } from 'viem';

export const calculateLiquidityBalance = ({
  liquidityShare,
  reserves,
}: {
  liquidityShare: bigint;
  reserves: TokenReserve;
}) => {
  return (liquidityShare * (reserves?.reserveVtoken ?? Zero)) / WeiPerEther;
};

export const calculateLiquidityEth = ({
  liquidityShare,
  reserves,
}: {
  liquidityShare: bigint;
  reserves: TokenReserve;
}) => {
  return (
    ((liquidityShare ?? Zero) * (reserves?.reserveWeth ?? Zero)) / WeiPerEther
  );
};

export const calculateInventoryBalance = ({
  xTokenShare,
  xToken,
}: {
  xTokenShare: bigint;
  xToken: bigint;
}) => {
  return ((xTokenShare ?? Zero) * (xToken ?? Zero)) / WeiPerEther;
};

export const calculateInventoryEth = ({
  inventoryBalance,
  reserves,
}: {
  inventoryBalance: bigint;
  reserves: TokenReserve;
}) => {
  return (
    ((inventoryBalance ?? Zero) * (reserves?.midPrice ?? Zero)) / WeiPerEther
  );
};

export function calculateClaimableEth({
  stakedEth,
  claimableTokens,
  stakedTokens,
}: {
  stakedEth: bigint;
  claimableTokens: bigint;
  stakedTokens: bigint;
}) {
  return (
    (stakedEth * claimableTokens) / (stakedTokens > Zero ? stakedTokens : 1n)
  );
}

export const calculateStakeSplit = ({
  inventoryBalance,
  liquidityBalance,
}: {
  inventoryBalance: bigint;
  liquidityBalance: bigint;
}) => {
  const totalVTokens = inventoryBalance + liquidityBalance;
  const inventorySplit = Number(
    formatEther(
      (inventoryBalance * WeiPerEther) /
        (totalVTokens > Zero ? totalVTokens : 1n)
    )
  );
  const liquiditySplit = 1 - inventorySplit;

  return [inventorySplit, liquiditySplit] as const;
};

export const calculateInventoryShare = ({
  xToken,
  xTokenSupply,
}: {
  xToken: bigint;
  xTokenSupply: bigint;
}) => {
  if ((xToken ?? Zero) <= Zero) {
    return Zero;
  }
  if ((xTokenSupply ?? Zero) <= Zero) {
    return Zero;
  }
  return (xToken * WeiPerEther) / xTokenSupply;
};

export const calculateLiquidityShare = ({
  xSlp,
  xSlpSupply,
}: {
  xSlp: bigint;
  xSlpSupply: bigint;
}) => {
  if ((xSlp ?? Zero) <= Zero) {
    return Zero;
  }
  if ((xSlpSupply ?? Zero) <= Zero) {
    return Zero;
  }
  return (xSlp * WeiPerEther) / xSlpSupply;
};

export const calculatePercentageDifference = (a: bigint, b: bigint) => {
  if ((a === Zero && b > Zero) || (b === Zero && a < Zero)) {
    return WeiPerEther;
  } else if ((a === Zero && b < Zero) || (b === Zero && a > Zero)) {
    return Zero - WeiPerEther;
  } else if (a === Zero && b === Zero) {
    return Zero;
  }

  const diff = b - a;
  const frac = (diff * WeiPerEther) / a;
  return frac;
};

export const increaseByPercentage = (a: bigint, perc: bigint) => {
  return a + (a * perc) / WeiPerEther;
};
