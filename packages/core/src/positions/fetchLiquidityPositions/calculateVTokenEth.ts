import type { Address } from '@nftx/types';
import { sqrtX96 } from '../../univ3-helpers';
import { formatEther, parseEther } from 'viem';
import { addressEqual, getChainConstant } from '@nftx/utils';
import { WETH_TOKEN } from '@nftx/constants';
import { Decimal } from 'decimal.js';

const calculateVTokenEth = ({
  network,
  inputTokens,
  ...args
}: // liquidity,
// tickLower,
// tickUpper,
// vTokenToEth,
{
  network: number;
  vTokenToEth: bigint;
  liquidity: bigint;
  inputTokens: Address[];
  tickUpper: bigint;
  tickLower: bigint;
}) => {
  const liquidity = new Decimal(formatEther(args.liquidity));
  const tickUpper = new Decimal(args.tickUpper.toString());
  const tickLower = new Decimal(args.tickLower.toString());
  // TODO: this is all completely wrong and broken
  // https://www.notion.so/nftx/Remove-partial-liquidity-from-pool-5bf28f4ed98d48079b0b78fb91bdd1aa
  const price = new Decimal(formatEther(args.vTokenToEth));
  const sqrtPrice = price.sqrt();
  const sqrtPriceX96 = sqrtX96(price);
  const tick = new Decimal('1.0001');
  const tickUpperPrice = tick.pow(tickUpper);
  const tickLowerPrice = tick.pow(tickLower);
  const sqrtPriceTickLower = tickLowerPrice.sqrt();
  const sqrtPriceTickUpper = tickUpperPrice.sqrt();
  // amount0 = liquidity * (sqrtPrice_tickUpper - sqrtPrice) / sqrtPrice / sqrtPriceX96
  const amount0 = liquidity
    .mul(sqrtPriceTickUpper.sub(sqrtPrice))
    .div(sqrtPrice)
    .div(sqrtPriceX96);

  // amount1 = liquidity * (sqrtPrice - sqrtPrice_tickLower) / sqrtPriceX96
  const amount1 = liquidity
    .mul(sqrtPrice.sub(sqrtPriceTickLower))
    .div(sqrtPriceX96);

  console.log(`amount0: ${amount0}, amount1: ${amount1}`);

  const wethToken = getChainConstant(WETH_TOKEN, network);
  const is0Weth = addressEqual(inputTokens[0], wethToken);

  const eth = is0Weth ? amount0 : amount1;
  const vToken = is0Weth ? amount1 : amount0;

  return {
    eth: parseEther(eth.toString() as `${number}`),
    vToken: parseEther(vToken.toString() as `${number}`),
    tickUpperPrice: parseEther(tickUpperPrice.toString() as `${number}`),
    tickLowerPrice: parseEther(tickLowerPrice.toString() as `${number}`),
  };
};

export default calculateVTokenEth;