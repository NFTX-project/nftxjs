import type { Address } from '@nftx/types';
import { calculatePriceFromTick, jsbiToBigint } from '../../univ3-helpers';
import { addressEqual, getChainConstant } from '@nftx/utils';
import { WETH_TOKEN, Zero } from '@nftx/constants';
import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { SqrtPriceMath, TickMath } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';
import { parseEther } from 'viem';

const getSqrtRatioX96 = (currentTick: bigint) => {
  const sqrtPriceX96 = TickMath.getSqrtRatioAtTick(Number(currentTick));

  return jsbiToBigint(sqrtPriceX96);
};

const currencyAmountToBigint = (v: CurrencyAmount<Token>): bigint => {
  return parseEther(v.toFixed(18) as `${number}`);
};

const getAmount0 = ({
  currentTick,
  liquidity,
  network,
  sqrtRatioX96,
  tickLower,
  tickUpper,
  token0,
}: {
  network: number;
  currentTick: bigint;
  tickLower: bigint;
  tickUpper: bigint;
  token0: Address;
  liquidity: bigint;
  sqrtRatioX96: bigint;
}): bigint => {
  const token = new Token(network, token0, 18);
  let result: CurrencyAmount<Token>;

  if (currentTick <= tickLower) {
    result = CurrencyAmount.fromRawAmount(
      token,
      SqrtPriceMath.getAmount0Delta(
        TickMath.getSqrtRatioAtTick(Number(tickLower)),
        TickMath.getSqrtRatioAtTick(Number(tickUpper)),
        JSBI.BigInt(liquidity.toString()),
        false
      )
    );
  } else if (currentTick <= tickUpper) {
    result = CurrencyAmount.fromRawAmount(
      token,
      SqrtPriceMath.getAmount0Delta(
        JSBI.BigInt(sqrtRatioX96.toString()),
        TickMath.getSqrtRatioAtTick(Number(tickUpper)),
        JSBI.BigInt(liquidity.toString()),
        false
      )
    );
  } else {
    result = CurrencyAmount.fromRawAmount(token, '0');
  }

  return currencyAmountToBigint(result);
};

const getAmount1 = ({
  currentTick,
  liquidity,
  network,
  sqrtRatioX96,
  tickLower,
  tickUpper,
  token1,
}: {
  network: number;
  currentTick: bigint;
  tickLower: bigint;
  tickUpper: bigint;
  token1: Address;
  sqrtRatioX96: bigint;
  liquidity: bigint;
}): bigint => {
  const token = new Token(network, token1, 18);
  let result: CurrencyAmount<Token>;

  if (currentTick < tickLower) {
    result = CurrencyAmount.fromRawAmount(token, '0');
  } else if (currentTick < tickUpper) {
    result = CurrencyAmount.fromRawAmount(
      token,
      SqrtPriceMath.getAmount1Delta(
        TickMath.getSqrtRatioAtTick(Number(tickLower)),
        JSBI.BigInt(sqrtRatioX96.toString()),
        JSBI.BigInt(liquidity.toString()),
        false
      )
    );
  } else {
    result = CurrencyAmount.fromRawAmount(
      token,
      SqrtPriceMath.getAmount1Delta(
        TickMath.getSqrtRatioAtTick(Number(tickLower)),
        TickMath.getSqrtRatioAtTick(Number(tickUpper)),
        JSBI.BigInt(liquidity.toString()),
        false
      )
    );
  }

  return currencyAmountToBigint(result);
};

const calculateVTokenEth = ({
  network,
  inputTokens,
  currentTick,
  liquidity,
  tickLower,
  tickUpper,
}: {
  network: number;
  vTokenToEth: bigint;
  liquidity: bigint;
  inputTokens: Address[];
  currentTick: bigint;
  tickUpper: bigint;
  tickLower: bigint;
}): {
  eth: bigint;
  vToken: bigint;
  tickUpperPrice: bigint;
  tickPrice: bigint;
  tickLowerPrice: bigint;
} => {
  try {
    const wethToken = getChainConstant(WETH_TOKEN, network);
    const isWeth0 = addressEqual(inputTokens[0], wethToken);
    const isVToken0 = !isWeth0;
    const [token0, token1] = inputTokens;
    const sqrtRatioX96 = getSqrtRatioX96(currentTick);

    const amount0 = getAmount0({
      currentTick,
      liquidity,
      network,
      sqrtRatioX96,
      tickLower,
      tickUpper,
      token0,
    });

    const amount1 = getAmount1({
      currentTick,
      liquidity,
      network,
      sqrtRatioX96,
      tickLower,
      tickUpper,
      token1,
    });

    const eth = isWeth0 ? amount0 : amount1;
    const vToken = isVToken0 ? amount0 : amount1;

    const tickLowerPrice = calculatePriceFromTick(Number(tickLower));
    const tickPrice = calculatePriceFromTick(currentTick);
    const tickUpperPrice = calculatePriceFromTick(Number(tickUpper));

    return {
      eth,
      vToken,
      tickLowerPrice,
      tickPrice,
      tickUpperPrice,
    };
  } catch (e) {
    console.warn('Failed to calculate position value');
    console.warn(e);
    return {
      eth: Zero,
      vToken: Zero,
      tickUpperPrice: Zero,
      tickPrice: Zero,
      tickLowerPrice: Zero,
    };
  }
};

export default calculateVTokenEth;
