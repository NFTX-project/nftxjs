import { WeiPerEther, Zero } from '@ethersproject/constants';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { TokenReserve } from '@nftx/types';

export const calculateLiquidityBalance = ({
  liquidityShare,
  reserves,
}: {
  liquidityShare: BigNumber;
  reserves: TokenReserve;
}) => {
  return liquidityShare.mul(reserves?.reserveVtoken ?? '0').div(WeiPerEther);
};

export const calculateLiquidityEth = ({
  liquidityShare,
  reserves,
}: {
  liquidityShare: BigNumber;
  reserves: TokenReserve;
}) => {
  return liquidityShare.mul(reserves?.reserveWeth ?? '0').div(WeiPerEther);
};

export const calculateInventoryBalance = ({
  xTokenShare,
  xToken,
}: {
  xTokenShare: BigNumber;
  xToken: BigNumber;
}) => {
  return xTokenShare?.mul(xToken ?? '0').div(WeiPerEther) ?? Zero;
};

export const calculateInventoryEth = ({
  inventoryBalance,
  reserves,
}: {
  inventoryBalance: BigNumber;
  reserves: TokenReserve;
}) => {
  return (
    inventoryBalance.mul(reserves?.midPrice ?? '0').div(WeiPerEther) ?? Zero
  );
};

export function calculateClaimableEth({
  stakedEth,
  claimableTokens,
  stakedTokens,
}: {
  stakedEth: BigNumber;
  claimableTokens: BigNumber;
  stakedTokens: BigNumber;
}) {
  return stakedEth
    .mul(claimableTokens)
    .div(stakedTokens.gt(0) ? stakedTokens : '1');
}

export const calculateStakeSplit = ({
  inventoryBalance,
  liquidityBalance,
}: {
  inventoryBalance: BigNumber;
  liquidityBalance: BigNumber;
}) => {
  const totalVTokens = inventoryBalance.add(liquidityBalance);
  const inventorySplit = Number(
    formatEther(
      inventoryBalance
        .mul(WeiPerEther)
        .div(totalVTokens.gt(0) ? totalVTokens : '1')
    )
  );
  const liquiditySplit = 1 - inventorySplit;

  return [inventorySplit, liquiditySplit] as const;
};

export const calculateInventoryShare = ({
  xToken,
  xTokenSupply,
}: {
  xToken: BigNumber;
  xTokenSupply: BigNumber;
}) => {
  if (!xToken?.gt(0)) {
    return Zero;
  }
  if (!xTokenSupply?.gt(0)) {
    return Zero;
  }
  return xToken.mul(WeiPerEther).div(xTokenSupply);
};

export const calculateLiquidityShare = ({
  xSlp,
  xSlpSupply,
}: {
  xSlp: BigNumber;
  xSlpSupply: BigNumber;
}) => {
  if (!xSlp?.gt(0) || !xSlpSupply?.gt(0)) {
    return Zero;
  }
  return xSlp.mul(WeiPerEther).div(xSlpSupply);
};

export const calculatePercentageDifference = (a: BigNumber, b: BigNumber) => {
  if ((a.eq(0) && b.gt(0)) || (b.eq(0) && a.lt(0))) {
    return WeiPerEther;
  } else if ((a.eq(0) && b.lt(0)) || (b.eq(0) && a.gt(0))) {
    return Zero.sub(WeiPerEther);
  } else if (a.eq(0) && b.eq(0)) {
    return Zero;
  }

  const diff = b.sub(a);
  const frac = diff.mul(WeiPerEther).div(a);
  return frac;
};

export const increaseByPercentage = (a: BigNumber, perc: BigNumber) => {
  return a.add(a.mul(perc).div(WeiPerEther));
};
