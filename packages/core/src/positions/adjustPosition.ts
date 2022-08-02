import type { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import { calculateVaultApr } from '../vaults';
import type { Position } from './types';
import {
  calculateInventoryEth,
  calculateInventoryShare,
  calculateLiquidityShare,
  calculatePercentageDifference,
  calculateStakeSplit,
  increaseByPercentage,
} from './utils';

/**
 * Takes an existing position and an amount of liquidity/inventory to add or remove, and returns new position properties
 */
const adjustPosition = (
  position: Position,
  {
    vToken,
    slp,
    lpEth,
    lpNft,
  }: {
    vToken?: BigNumber;
    slp?: BigNumber;
    lpNft?: BigNumber;
    lpEth?: BigNumber;
  }
) => {
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
    xToken,
    xTokenSupply,
    xSlp,
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
    xToken = xToken.add(newXTokens);
    xTokenSupply = xTokenSupply.add(newXTokens);
    inventoryShare = calculateInventoryShare({
      xTokenSupply,
      xToken,
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
    xSlp = xSlp.add(newXSlp);
    xSlpSupply = xSlpSupply.add(newXSlp);
    slpBalance = slpBalance.add(slp);
    slpSupply = slpSupply.add(slp);
    liquidityShare = calculateLiquidityShare({ xSlp, xSlpSupply });

    if (position.xSlp.isZero()) {
      liquidityTokens = poolReserves.reserveVtoken
        .mul(liquidityShare)
        .div(WeiPerEther);
      liquidityEth = poolReserves.reserveWeth
        .mul(liquidityShare)
        .div(WeiPerEther);
    } else {
      const balanceChange = calculatePercentageDifference(position.xSlp, xSlp);
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
        poolReserves.reserveVtoken,
        supplyChange
      ),
      reserveWeth: increaseByPercentage(poolReserves.reserveWeth, supplyChange),
    };
    // Recalculate the mid price: amount * reserveB / reserveA
    poolReserves.midPrice = WeiPerEther.mul(poolReserves.reserveWeth).div(
      poolReserves.reserveVtoken
    );

    liquidityValue = liquidityEth.mul(2);
  }

  if (adjustLp) {
    liquidityTokens = liquidityTokens.add(lpNft);
    liquidityEth = liquidityEth.add(lpEth);

    if (position.liquidityTokens.isZero()) {
      const slpToken = lpNft.mul(slpSupply).div(poolReserves.reserveVtoken);
      const slpWeth = lpEth.mul(slpSupply).div(poolReserves.reserveWeth);
      const slpAdded = slpToken.lt(slpWeth) ? slpToken : slpWeth;

      xSlp = slpAdded;
    } else {
      const balanceChange = calculatePercentageDifference(
        position.liquidityTokens,
        liquidityTokens
      );
      xSlp = increaseByPercentage(xSlp, balanceChange);
    }

    const xSlpDiff = xSlp.sub(position.xSlp);
    xSlpSupply = xSlpSupply.add(xSlpDiff);
    slpSupply = slpSupply.add(xSlpDiff);
    slpBalance = slpBalance.add(xSlpDiff);

    const supplyChange = calculatePercentageDifference(
      position.xSlpSupply,
      xSlpSupply
    );

    liquidityShare = calculateLiquidityShare({ xSlp, xSlpSupply });

    poolReserves = {
      ...poolReserves,
      reserveVtoken: increaseByPercentage(
        poolReserves.reserveVtoken,
        supplyChange
      ),
      reserveWeth: increaseByPercentage(poolReserves.reserveWeth, supplyChange),
    };
    // Recalculate the mid price: amount * reserveB / reserveA
    poolReserves.midPrice = WeiPerEther.mul(poolReserves.reserveWeth).div(
      poolReserves.reserveVtoken
    );

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
      feeReceipts: position.feeReceipts,
      slpBalance,
      slpSupply,
      xTokenShare: position.xTokenShare,
      xTokenSupply,
      vault: {
        reserveVtoken: poolReserves.reserveVtoken,
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
    xToken,
    xTokenSupply,
    slpBalance,
    slpSupply,
    inventoryApr,
    liquidityApr,
  };
};

export default adjustPosition;
