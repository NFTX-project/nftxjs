import calculateAprs, {
  LIQUIDITY_SHARE,
} from '../fetchInventoryPools/calculateAprs';
import type { LiquidityPool } from '@nftx/types';

// // https://medium.com/@alexeuler/navigating-uniswap-v3-a-comprehensive-guide-to-apr-estimation-and-pool-risk-analysis-22cdab21e2db
// export const calculateApr = ({
//   activeLiquidity,
//   currentTick,
//   periodFees,
//   price,
//   tickSpacing,
//   totalLiquidity,
// }: {
//   activeLiquidity: bigint;
//   totalLiquidity: bigint;
//   price: bigint;
//   currentTick: bigint;
//   tickSpacing: FeeTickSpacing;
//   periodFees: bigint;
// }) => {
//   try {
//     const tickUpper = bigintToDecimal(currentTick).add(tickSpacing);
//     const tickLower = bigintToDecimal(currentTick).sub(tickSpacing);
//     const tick = new Decimal('1.0001');
//     const upperPrice = tick.pow(tickUpper);
//     const lowerPrice = tick.pow(tickLower);

//     // Liquidity
//     const L = ethersToDecimal(activeLiquidity);
//     // Price
//     const P = ethersToDecimal(price);
//     // Py was in the formula but feck knows what it means
//     const Py = P;
//     // TVL
//     const TVL = ethersToDecimal(totalLiquidity);

//     // Normalized TVL
//     // TVLn = (L / √P)P + L√P = 2L√P
//     const TVLn = L.div(P.sqrt()).mul(P).add(L.mul(P.sqrt()));
//     // Liquidity concentration factor
//     // LCF = (TVLn * Py)/TVL = (2Py * L√P) / TVL
//     const LCF = TVLn.mul(Py).div(TVL);
//     // Relative price movement
//     const r = upperPrice.div(lowerPrice);
//     // Impermanent Loss
//     // IL = 1 - 2√r / 1 + r
//     const IL = new Decimal('1')
//       .sub(new Decimal('2').mul(r.sqrt()))
//       .div(new Decimal('1').add(r));
//     // Return
//     // APR = (fees - IL) / (TVL * LCF)
//     const APR = ethersToDecimal(periodFees).sub(IL).div(TVL.mul(LCF));

//     // Convert back into bigint
//     return decimalToEthers(APR);
//   } catch (e) {
//     console.warn('Failed to calculate liquidity APR');
//     console.warn(e);
//     return Zero;
//   }
// };

// const calculateAprs = ({
//   activeLiquidity,
//   currentTick,
//   periodFees,
//   price,
//   tickSpacing,
//   totalLiquidity,
// }: {
//   activeLiquidity: bigint;
//   totalLiquidity: bigint;
//   price: bigint;
//   currentTick: bigint;
//   tickSpacing: FeeTickSpacing;
//   periodFees: ReturnType<typeof calculatePeriodFees>;
// }) => {
//   return {
//     '24h': calculateApr({
//       activeLiquidity,
//       currentTick,
//       periodFees: periodFees['24h'],
//       price,
//       tickSpacing,
//       totalLiquidity,
//     }),
//     '7d': calculateApr({
//       activeLiquidity,
//       currentTick,
//       periodFees: periodFees['7d'],
//       price,
//       tickSpacing,
//       totalLiquidity,
//     }),
//     '1m': calculateApr({
//       activeLiquidity,
//       currentTick,
//       periodFees: periodFees['1m'],
//       price,
//       tickSpacing,
//       totalLiquidity,
//     }),
//     all: calculateApr({
//       activeLiquidity,
//       currentTick,
//       periodFees: periodFees.all,
//       price,
//       tickSpacing,
//       totalLiquidity,
//     }),
//   };
// };

export default ({
  createdAt,
  periodFees,
  poolValue,
  share = LIQUIDITY_SHARE,
}: {
  createdAt: number;
  periodFees: LiquidityPool['periodFees'];
  poolValue: bigint;
  share?: bigint;
}) => {
  return calculateAprs({
    share,
    createdAt,
    periodFees,
    poolValue,
  });
};
