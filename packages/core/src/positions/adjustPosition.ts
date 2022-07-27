import type { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
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
  } = position;
  // TODO: adjust the APR as well

  if (vToken?.gt(0) || vToken?.lt(0)) {
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

    valueStaked = liquidityValue.add(inventoryValue);
    totalValue = valueStaked.add(position.claimableValue);
  }

  if (slp?.gt(0) || slp?.lt(0)) {
    const newXSlp = slp;
    xSlp = xSlp.add(newXSlp);
    xSlpSupply = xSlpSupply.add(newXSlp);
    liquidityShare = calculateLiquidityShare({ xSlp, xSlpSupply });

    const balanceChange = calculatePercentageDifference(position.xSlp, xSlp);
    const supplyChange = calculatePercentageDifference(
      position.xSlpSupply,
      xSlpSupply
    );

    liquidityTokens = increaseByPercentage(liquidityTokens, balanceChange);
    liquidityEth = increaseByPercentage(liquidityEth, balanceChange);

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

    valueStaked = liquidityValue.add(inventoryValue);
    totalValue = valueStaked.add(position.claimableValue);
  }

  if (
    lpNft &&
    lpEth &&
    (lpNft.gt(0) || lpNft.lt(0) || lpEth.gt(0) || lpEth.lt(0))
  ) {
    liquidityTokens = liquidityTokens.add(lpNft);
    liquidityEth = liquidityEth.add(lpEth);

    const balanceChange = calculatePercentageDifference(
      position.liquidityTokens,
      liquidityTokens
    );

    [inventorySplit, liquiditySplit] = calculateStakeSplit({
      inventoryBalance: inventoryTokens,
      liquidityBalance: liquidityTokens.mul(2),
    });

    xSlp = increaseByPercentage(xSlp, balanceChange);
    const xSlpDiff = xSlp.sub(position.xSlp);
    xSlpSupply = xSlpSupply.add(xSlpDiff);

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

    valueStaked = liquidityValue.add(inventoryValue);
    totalValue = valueStaked.add(position.claimableValue);
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
  };
};

export default adjustPosition;
