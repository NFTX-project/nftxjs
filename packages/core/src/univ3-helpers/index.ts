import { TickMath } from '@uniswap/v3-sdk';
import { Decimal } from 'decimal.js';
import JSBI from 'jsbi';

export const getTickSpacing = (
  feeTier: 500 | 3000 | 10000 | 0.05 | 0.3 | 1
) => {
  switch (feeTier) {
    case 0.05:
    case 500:
      return 10;
    case 0.3:
    case 3000:
      return 60;
    case 1:
    case 10000:
      return 200;
    default:
      throw new Error(`Unsupported fee tier: ${feeTier}`);
  }
};

const Q192 = new Decimal(2).pow(192);
const Q96 = new Decimal(2).pow(96);

export const sqrtX96 = (value: Decimal) => {
  return value.sqrt().mul(Q96);
};

export const getSqrtRatioX96 = (amount1: Decimal, amount0: Decimal) => {
  // price = amount 1 / amount0
  return amount1.mul(Q192).div(amount0).sqrt();
};

export const getTickAtSqrtRatio = (
  sqrtRatioX96: Decimal,
  tickSpacing: number
) => {
  const tick = TickMath.getTickAtSqrtRatio(JSBI.BigInt(`${sqrtRatioX96}`));
  const tickWithSpacing = Math.ceil(tick / tickSpacing) * tickSpacing;
  return tickWithSpacing;
};
