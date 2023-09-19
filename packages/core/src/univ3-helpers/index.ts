import type { FeeTickSpacing } from '@nftx/constants';
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

export const Q192 = new Decimal(2).pow(192);
export const Q96 = new Decimal(2).pow(96);

export const sqrtX96 = (value: bigint) => {
  return decimalToEthers(ethersToDecimal(value).sqrt().mul(Q96));
};

export const getSqrtRatioX96 = (amount1: bigint, amount0: bigint) => {
  // price = amount 1 / amount0
  return decimalToEthers(
    ethersToDecimal(amount1).mul(Q192).div(ethersToDecimal(amount0)).sqrt()
  );
};

export const getTickAtSqrtRatio = (
  sqrtRatioX96: bigint,
  tickSpacing: FeeTickSpacing
) => {
  const tick = TickMath.getTickAtSqrtRatio(JSBI.BigInt(`${sqrtRatioX96}`));
  const tickWithSpacing = Math.ceil(tick / tickSpacing) * tickSpacing;
  return tickWithSpacing;
};
