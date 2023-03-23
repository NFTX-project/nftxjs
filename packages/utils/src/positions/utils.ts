import { WeiPerEther, Zero } from '@nftx/constants';
import type { TokenReserve } from '@nftx/types';
import { formatEther } from 'viem';

export const calculateInventoryEth = ({
  inventoryBalance,
  reserves,
}: {
  inventoryBalance: bigint;
  reserves: TokenReserve;
}) => {
  return (inventoryBalance * (reserves?.midPrice ?? 0)) / WeiPerEther;
};

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
      (inventoryBalance * WeiPerEther) / (totalVTokens > 0 ? totalVTokens : 1n)
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
  if (!xToken || xToken <= 0) {
    return Zero;
  }
  if (!xTokenSupply || xTokenSupply <= 0) {
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
  if (!xSlp || xSlp <= 0 || !xSlpSupply || xSlp <= 0) {
    return Zero;
  }
  return (xSlp * WeiPerEther) / xSlpSupply;
};

export const calculatePercentageDifference = (a: bigint, b: bigint) => {
  if ((a === 0n && b > 0n) || (b === 0n && a < 0n)) {
    return WeiPerEther;
  } else if ((a === 0n && b < 0n) || (b === 0n && a > 0n)) {
    return Zero - WeiPerEther;
  } else if (a === 0n && b === 0n) {
    return Zero;
  }

  const diff = b - a;
  const frac = (diff * WeiPerEther) / a;
  return frac;
};

export const increaseByPercentage = (a: bigint, perc: bigint) => {
  return a + (a * perc) / WeiPerEther;
};
