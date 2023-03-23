import { WeiPerEther, Zero } from '@nftx/constants';
import type { TokenReserve } from '@nftx/types';
import { formatEther, parseEther } from 'viem';

// given an output amount of an asset and pair reserves, returns a required input amount of the other asset
function getAmountIn(amountOut: bigint, reserveIn: bigint, reserveOut: bigint) {
  if (amountOut <= Zero) {
    return false;
  }
  if (reserveIn <= Zero || reserveOut <= Zero) {
    return false;
  }

  const numerator = reserveIn * amountOut * 1000n;
  const denominator = reserveOut - amountOut * 997n;

  // not enough liquidity
  if (denominator === Zero || numerator === Zero) {
    return false;
  }

  return numerator / denominator + 1n;
}

// given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
function getAmountOut(amountIn: bigint, reserveIn: bigint, reserveOut: bigint) {
  if (amountIn <= Zero) {
    return false;
  }
  if (reserveIn <= Zero || reserveOut <= Zero) {
    return false;
  }

  const amountInWithFee = amountIn * 997n;
  const numerator = amountInWithFee * reserveOut;
  const denominator = reserveIn * 1000n + amountInWithFee;

  // not enough liquidity
  if (denominator === Zero || numerator === Zero) {
    return false;
  }

  return numerator / denominator;
}

const calcBuyPrice = (reserve: TokenReserve, amount: `${number}` = '1') =>
  getAmountIn(parseEther(amount), reserve.reserveWeth, reserve.reserveVtoken);

const calcSellPrice = (reserve: TokenReserve, amount: `${number}` = '1') =>
  getAmountOut(parseEther(amount), reserve.reserveVtoken, reserve.reserveWeth);

const transformVaultReserves = (reserves?: TokenReserve) => {
  if (!reserves || !reserves.reserveVtoken || !reserves.reserveWeth) {
    return {
      derivedETH: '0',
      rawPrice: Zero,
      reserveVtoken: Zero,
      reserveWeth: Zero,
    };
  }

  const { midPrice } = reserves;
  // use 0.25 vtoken purchase as liqudity check
  const buyPrice = calcBuyPrice(reserves, '0.25');
  const sellPrice = calcSellPrice(reserves, '0.25');

  // only show price if 10% spread or less
  const enoughLiquidity =
    buyPrice && sellPrice
      ? buyPrice - (sellPrice * WeiPerEther) / buyPrice <= parseEther('0.1')
      : false;

  if ((midPrice ?? Zero) > Zero) {
    return {
      derivedETH: enoughLiquidity ? formatEther(midPrice) : '0',
      rawPrice: midPrice,
      reserveVtoken: reserves.reserveVtoken,
      reserveWeth: reserves.reserveWeth,
    };
  }

  return {
    derivedETH: '0',
    rawPrice: Zero,
    reserveVtoken: Zero,
    reserveWeth: Zero,
  };
};

export default transformVaultReserves;
