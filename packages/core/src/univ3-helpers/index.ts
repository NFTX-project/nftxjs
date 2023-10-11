import { Zero, type FeeTickSpacing } from '@nftx/constants';
import { TickMath } from '@uniswap/v3-sdk';
import { Decimal } from 'decimal.js';
import JSBI from 'jsbi';
import { formatEther, parseEther } from 'viem';

export const bigintToDecimal = (v: bigint) => {
  return new Decimal(v.toString());
};
export const ethersToDecimal = (v: bigint) => {
  return new Decimal(formatEther(v));
};
export const decimalToEthers = (v: Decimal) => {
  return parseEther(v.toFixed(18) as `${number}`);
};
export const decimalToBigint = (v: Decimal) => {
  return BigInt(v.toFixed(0));
};

// export const Q192 = new Decimal(2).pow(192);
// export const Q96 = new Decimal(2).pow(96);
export const Q192 = bigintToDecimal(2n ** 192n);
export const Q96 = bigintToDecimal(2n ** 96n);

export const sqrtX96 = (value: bigint) => {
  if (!value) {
    return Zero;
  }
  return decimalToEthers(ethersToDecimal(value).sqrt().mul(Q96));
};

export const getSqrtRatioX96 = (amount1: bigint, amount0: bigint) => {
  // price = amount 1 / amount0
  if (!amount0) {
    return Zero;
  }
  const a1 = ethersToDecimal(amount1);
  const a0 = ethersToDecimal(amount0);

  const r = a1.mul(Q192).div(a0).sqrt();
  return decimalToBigint(r);
};

export const getTickAtSqrtRatio = (
  sqrtRatioX96: bigint,
  tickSpacing: FeeTickSpacing
) => {
  if (!sqrtRatioX96) {
    return 0;
  }
  const ratioStr = sqrtRatioX96.toString();
  const bigRatio = JSBI.BigInt(ratioStr);
  const tick = TickMath.getTickAtSqrtRatio(bigRatio);
  const tickWithSpacing = Math.ceil(tick / tickSpacing) * tickSpacing;
  return tickWithSpacing;
};

export const getSqrtRatioAtTick = (tick: number) => {
  const bigRatio = TickMath.getSqrtRatioAtTick(tick);
  const ratioStr = bigRatio.toString();
  return BigInt(ratioStr);
};
