import type { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
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
    vToken?: BigNumber;
    /** Amount of slp (vTokenWETH) to stake as liquidity */
    slp?: BigNumber;
    /** Amount of NFTs to stake (must be paired with lpEth) */
    lpNft?: BigNumber;
    /** Amount of ETH to stake (must be paired with lpNft) */
    lpEth?: BigNumber;
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
  const adjustVToken = vToken?.gt(0) || vToken?.lt(0);
  const adjustSlp = slp?.gt(0) || slp?.lt(0);
  const adjustLp =
    lpNft &&
    lpEth &&
    (lpNft.gt(0) || lpNft.lt(0) || lpEth.gt(0) || lpEth.lt(0));
  const hasAdjustments = adjustLp || adjustSlp || adjustVToken;

  if (adjustVToken) {
    inventoryTokens = inventoryTokens.add(vToken);

    const newXTokens = vToken.mul(position.xTokenShare).div(WeiPerEther);
    xTokenBalance = xTokenBalance.add(newXTokens);
    xTokenSupply = xTokenSupply.add(newXTokens);
    inventoryShare = calculateInventoryShare({
      xTokenSupply,
      xToken: xTokenBalance,
    });

    [inventorySplit, liquiditySplit] = calculateStakeSplit({
      inventoryBalance: inventoryTokens,
      liquidityBalance: liquidityTokens.mul(2),
    });

    inventoryValue = calculateInventoryEth({
      inventoryBalance: inventoryTokens,
      reserves: position.poolReserves,
    });
  }

  if (adjustSlp) {
    const newXSlp = slp;
    xSlpBalance = xSlpBalance.add(newXSlp);
    xSlpSupply = xSlpSupply.add(newXSlp);
    slpBalance = slpBalance.add(slp);
    slpSupply = slpSupply.add(slp);
    liquidityShare = calculateLiquidityShare({ xSlp: xSlpBalance, xSlpSupply });

    if (position.xSlpBalance.isZero()) {
      liquidityTokens =
        poolReserves?.reserveVtoken.mul(liquidityShare).div(WeiPerEther) ??
        Zero;
      liquidityEth =
        poolReserves?.reserveWeth.mul(liquidityShare).div(WeiPerEther) ?? Zero;
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
      liquidityBalance: liquidityTokens.mul(2),
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
      poolReserves.reserveVtoken.gt(0) && poolReserves.reserveWeth.gt(0);
    // Recalculate the mid price: amount * reserveB / reserveA
    poolReserves.midPrice = hasLiquidity
      ? WeiPerEther.mul(poolReserves.reserveWeth).div(
          poolReserves.reserveVtoken
        )
      : Zero;

    liquidityValue = liquidityEth.mul(2);
  }

  if (adjustLp) {
    liquidityTokens = liquidityTokens.add(lpNft);
    liquidityEth = liquidityEth.add(lpEth);

    if (position.liquidityTokens.isZero()) {
      const slpToken = poolReserves?.reserveVtoken?.gt(0)
        ? lpNft.mul(slpSupply).div(poolReserves.reserveVtoken)
        : lpNft;
      const slpWeth = poolReserves?.reserveWeth?.gt(0)
        ? lpEth.mul(slpSupply).div(poolReserves.reserveWeth)
        : lpEth;
      const slpAdded = slpToken.lt(slpWeth) ? slpToken : slpWeth;

      xSlpBalance = slpAdded;
    } else {
      const balanceChange = calculatePercentageDifference(
        position.liquidityTokens,
        liquidityTokens
      );
      xSlpBalance = increaseByPercentage(xSlpBalance, balanceChange);
    }

    const xSlpDiff = xSlpBalance.sub(position.xSlpBalance);
    xSlpSupply = xSlpSupply.add(xSlpDiff);
    slpSupply = slpSupply.add(xSlpDiff);
    slpBalance = slpBalance.add(xSlpDiff);

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
      poolReserves.reserveVtoken.gt(0) && poolReserves.reserveWeth.gt(0);
    // Recalculate the mid price: amount * reserveB / reserveA
    poolReserves.midPrice = hasLiquidity
      ? WeiPerEther.mul(poolReserves.reserveWeth).div(
          poolReserves.reserveVtoken
        )
      : Zero;

    liquidityValue = liquidityEth.mul(2);

    [inventorySplit, liquiditySplit] = calculateStakeSplit({
      inventoryBalance: inventoryTokens,
      liquidityBalance: liquidityTokens.mul(2),
    });
  }

  if (hasAdjustments) {
    valueStaked = liquidityValue.add(inventoryValue);
    totalValue = valueStaked.add(position.claimableValue);

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
