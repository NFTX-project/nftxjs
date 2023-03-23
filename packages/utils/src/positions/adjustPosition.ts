import { WeiPerEther, Zero } from '@nftx/constants';
import type { Position } from '@nftx/types';
import { calculateVaultApr } from '../vaults';
import {
  calculateInventoryEth,
  calculateInventoryShare,
  calculateLiquidityShare,
  calculatePercentageDifference,
  calculateStakeSplit,
  increaseByPercentage,
} from './utils';

/**
 * Takes an existing {@link @nftx/types!Position} and an amount of liquidity/inventory to add or remove, and returns new position properties.
 * This allows you to estimate impacts on pool share, apy, reserves, etc.
 */
const adjustPosition = (
  position: Position,
  args: {
    /** Amount of vToken to stake as inventory */
    vToken?: bigint;
    /** Amount of slp (vTokenWETH) to stake as liquidity */
    slp?: bigint;
    /** Amount of NFTs to stake (must be paired with lpEth) */
    lpNft?: bigint;
    /** Amount of ETH to stake (must be paired with lpNft) */
    lpEth?: bigint;
  }
): Position => {
  const { vToken, slp, lpEth, lpNft } = args;
  let {
    inventoryShare,
    liquidityShare,
    inventorySplit,
    liquiditySplit,
    inventoryTokens,
    inventoryValue,
    liquidityEth,
    liquidityTokens,
    liquidityValue,
    totalValue,
    valueStaked,
    xTokenBalance,
    xTokenSupply,
    xSlpBalance,
    xSlpSupply,
    poolReserves,
    slpBalance,
    slpSupply,
    inventoryApr,
    liquidityApr,
  } = position;
  const adjustVToken = vToken != null && vToken !== 0n;
  const adjustSlp = slp != null && slp !== 0n;
  const adjustLp =
    lpNft && lpEth && (lpNft > 0n || lpNft < 0n || lpEth > 0n || lpEth < 0n);
  const hasAdjustments = adjustLp || adjustSlp || adjustVToken;

  if (adjustVToken) {
    inventoryTokens = inventoryTokens + vToken;

    const newXTokens = (vToken * position.xTokenShare) / WeiPerEther;
    xTokenBalance = xTokenBalance + newXTokens;
    xTokenSupply = xTokenSupply + newXTokens;
    inventoryShare = calculateInventoryShare({
      xTokenSupply,
      xToken: xTokenBalance,
    });

    [inventorySplit, liquiditySplit] = calculateStakeSplit({
      inventoryBalance: inventoryTokens,
      liquidityBalance: liquidityTokens * 2n,
    });

    inventoryValue = calculateInventoryEth({
      inventoryBalance: inventoryTokens,
      reserves: position.poolReserves,
    });
  }

  if (adjustSlp) {
    const newXSlp = slp;
    xSlpBalance = xSlpBalance + newXSlp;
    xSlpSupply = xSlpSupply + newXSlp;
    slpBalance = slpBalance + slp;
    slpSupply = slpSupply + slp;
    liquidityShare = calculateLiquidityShare({ xSlp: xSlpBalance, xSlpSupply });

    if (position.xSlpBalance === 0n) {
      if (
        poolReserves?.reserveVtoken &&
        poolReserves.reserveWeth &&
        liquidityShare
      ) {
        liquidityTokens =
          (poolReserves.reserveVtoken * liquidityShare) / WeiPerEther;
        liquidityEth =
          (poolReserves.reserveWeth * liquidityShare) / WeiPerEther;
      } else {
        liquidityTokens = Zero;
        liquidityEth = Zero;
      }
    } else {
      const balanceChange = calculatePercentageDifference(
        position.xSlpBalance,
        xSlpBalance
      );
      liquidityTokens = increaseByPercentage(liquidityTokens, balanceChange);
      liquidityEth = increaseByPercentage(liquidityEth, balanceChange);
    }

    const supplyChange = calculatePercentageDifference(
      position.xSlpSupply,
      xSlpSupply
    );

    [inventorySplit, liquiditySplit] = calculateStakeSplit({
      inventoryBalance: inventoryTokens,
      liquidityBalance: liquidityTokens * 2n,
    });

    poolReserves = {
      ...poolReserves,
      reserveVtoken: increaseByPercentage(
        poolReserves?.reserveVtoken ?? Zero,
        supplyChange
      ),
      reserveWeth: increaseByPercentage(
        poolReserves?.reserveWeth ?? Zero,
        supplyChange
      ),
    };
    const hasLiquidity =
      poolReserves.reserveVtoken > Zero && poolReserves.reserveWeth > Zero;
    // Recalculate the mid price: amount * reserveB / reserveA
    poolReserves.midPrice = hasLiquidity
      ? (WeiPerEther * poolReserves.reserveWeth) / poolReserves.reserveVtoken
      : Zero;

    liquidityValue = liquidityEth * 2n;
  }

  if (adjustLp) {
    liquidityTokens = liquidityTokens + lpNft;
    liquidityEth = liquidityEth + lpEth;

    if (position.liquidityTokens === Zero) {
      const slpToken =
        (poolReserves.reserveVtoken ?? Zero) > Zero
          ? (lpNft * slpSupply) / poolReserves.reserveVtoken
          : lpNft;
      const slpWeth =
        (poolReserves.reserveWeth ?? Zero) > Zero
          ? (lpEth * slpSupply) / poolReserves.reserveWeth
          : lpEth;
      const slpAdded = slpToken < slpWeth ? slpToken : slpWeth;

      xSlpBalance = slpAdded;
    } else {
      const balanceChange = calculatePercentageDifference(
        position.liquidityTokens,
        liquidityTokens
      );
      xSlpBalance = increaseByPercentage(xSlpBalance, balanceChange);
    }

    const xSlpDiff = xSlpBalance - position.xSlpBalance;
    xSlpSupply = xSlpSupply + xSlpDiff;
    slpSupply = slpSupply + xSlpDiff;
    slpBalance = slpBalance + xSlpDiff;

    const supplyChange = calculatePercentageDifference(
      position.xSlpSupply,
      xSlpSupply
    );

    liquidityShare = calculateLiquidityShare({ xSlp: xSlpBalance, xSlpSupply });

    poolReserves = {
      ...poolReserves,
      reserveVtoken: increaseByPercentage(
        poolReserves?.reserveVtoken ?? Zero,
        supplyChange
      ),
      reserveWeth: increaseByPercentage(
        poolReserves?.reserveWeth ?? Zero,
        supplyChange
      ),
    };
    const hasLiquidity =
      poolReserves.reserveVtoken > Zero && poolReserves.reserveWeth > Zero;
    // Recalculate the mid price: amount * reserveB / reserveA
    poolReserves.midPrice = hasLiquidity
      ? (WeiPerEther * poolReserves.reserveWeth) / poolReserves.reserveVtoken
      : Zero;

    liquidityValue = liquidityEth * 2n;

    [inventorySplit, liquiditySplit] = calculateStakeSplit({
      inventoryBalance: inventoryTokens,
      liquidityBalance: liquidityTokens * 2n,
    });
  }

  if (hasAdjustments) {
    valueStaked = liquidityValue + inventoryValue;
    totalValue = valueStaked + position.claimableValue;

    const newApr = calculateVaultApr({
      periodFees: position.periodFees,
      slpBalance,
      slpSupply,
      xTokenShare: position.xTokenShare,
      xTokenSupply,
      vault: {
        reserveVtoken: poolReserves?.reserveVtoken ?? Zero,
        createdAt: position.createdAt,
      },
    });

    inventoryApr = newApr.inventoryApr;
    liquidityApr = newApr.liquidityApr;
  }

  return {
    ...position,
    inventoryShare,
    liquidityShare,
    inventorySplit,
    liquiditySplit,
    inventoryTokens,
    inventoryValue,
    liquidityEth,
    liquidityTokens,
    liquidityValue,
    totalValue,
    valueStaked,
    xTokenBalance,
    xTokenSupply,
    xSlpBalance,
    slpBalance,
    slpSupply,
    inventoryApr,
    liquidityApr,
  };
};

export default adjustPosition;
