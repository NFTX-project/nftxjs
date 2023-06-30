import { Zero } from '@nftx/constants';
import type calculatePeriodFees from './calculatePeriodFees';
import { formatEther, parseEther } from 'viem';
import { Decimal } from 'decimal.js';

// export const calculateApr = (
//   activeLiquidity: bigint,
//   totalLiquidity: bigint,
//   price: bigint,
//   tickUpper: bigint,
//   tickLower: bigint,
//   periodFees: bigint
// ) => {
//   // const tick = parseEther(`${1.0001}`);
//   const tick = new Decimal('1.0001');
//   // const upperPrice = tick ** tickUpper;
//   const upperPrice = tick.pow(tickUpper.toString());
//   // const lowerPrice = tick ** tickLower;
//   const lowerPrice = tick.pow(tickLower.toString());

//   // const L = activeLiquidity;
//   const L = new Decimal(formatEther(activeLiquidity));
//   // const P = price;
//   const P = new Decimal(formatEther(price));
//   // const Py = price;
//   const Py = P;
//   // const TVL = totalLiquidity;
//   const TVL = new Decimal(formatEther(totalLiquidity));

//   // Normalized TVL
//   // const TVLn = (L / sqrt(P)) * P + L * sqrt(P); // = 2 * L * sqrt(P)
//   const TVLn = L.div(P.sqrt()).mul(P).add(L.mul(P.sqrt()));
//   // Liquidity concentration factor
//   const LCF = TVLn.mul(Py).div(TVL);
//   // const LCF = (TVLn * Py) / TVL; // = (2 * Py * L * sqrt(P)) / TVL
//   // Relative price movement
//   const r = upperPrice.div(lowerPrice);
//   // const r = upperPrice / lowerPrice;
//   // Impermanent Loss
//   const IL = new Decimal('1')
//     .sub(new Decimal('2').mul(r.sqrt()))
//     .div(new Decimal('1').add(r));
//   // const IL = 1n - (2n * sqrt(r)) / (1n + r);
//   // Return
//   const APR = new Decimal(formatEther(periodFees)).sub(IL).div(TVL.mul(LCF));
//   // const APR = (periodFees - IL) / (TVL * LCF);

//   return parseEther(APR.toString() as `${number}`);
// };

const bigintToDecimal = (v: bigint) => {
  return new Decimal(v.toString());
};
const ethersToDecimal = (v: bigint) => {
  return new Decimal(formatEther(v));
};

// https://medium.com/@alexeuler/navigating-uniswap-v3-a-comprehensive-guide-to-apr-estimation-and-pool-risk-analysis-22cdab21e2db
export const calculateApr = ({
  activeLiquidity,
  currentTick,
  periodFees,
  price,
  tickSpacing,
  totalLiquidity,
}: {
  activeLiquidity: bigint;
  totalLiquidity: bigint;
  price: bigint;
  currentTick: bigint;
  tickSpacing: number;
  periodFees: bigint;
}) => {
  const tickUpper = bigintToDecimal(currentTick).add(tickSpacing);
  const tickLower = bigintToDecimal(currentTick).add(tickSpacing);
  const tick = new Decimal('1.0001');
  const upperPrice = tick.pow(tickUpper);
  const lowerPrice = tick.pow(tickLower);

  // Liquidity
  const L = ethersToDecimal(activeLiquidity);
  // Price
  const P = ethersToDecimal(price);
  // Py was in the formula but feck knows what it means
  const Py = P;
  // TVL
  const TVL = ethersToDecimal(totalLiquidity);

  // Normalized TVL
  // TVLn = (L / √P)P + L√P = 2L√P
  const TVLn = L.div(P.sqrt()).mul(P).add(L.mul(P.sqrt()));
  // Liquidity concentration factor
  // LCF = (TVLn * Py)/TVL = (2Py * L√P) / TVL
  const LCF = TVLn.mul(Py).div(TVL);
  // Relative price movement
  const r = upperPrice.div(lowerPrice);
  // Impermanent Loss
  // IL = 1 - 2√r / 1 + r
  const IL = new Decimal('1')
    .sub(new Decimal('2').mul(r.sqrt()))
    .div(new Decimal('1').add(r));
  // Return
  // APR = (fees - IL) / (TVL * LCF)
  const APR = ethersToDecimal(periodFees).sub(IL).div(TVL.mul(LCF));

  // Convert back into bigint
  return parseEther(APR.toString() as `${number}`);
};

const calculateAprs = ({
  activeLiquidity,
  currentTick,
  periodFees,
  price,
  tickSpacing,
  totalLiquidity,
}: {
  activeLiquidity: bigint;
  totalLiquidity: bigint;
  price: bigint;
  currentTick: bigint;
  tickSpacing: number;
  periodFees: ReturnType<typeof calculatePeriodFees>;
}) => {
  return {
    '24h': Zero,
    '7d': Zero,
    '1m': calculateApr({
      activeLiquidity,
      currentTick,
      periodFees: periodFees['1m'],
      price,
      tickSpacing,
      totalLiquidity,
    }),
    all: Zero,
  };
};

export default calculateAprs;
