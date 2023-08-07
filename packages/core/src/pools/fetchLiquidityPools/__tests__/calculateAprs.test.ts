import { formatEther, parseEther } from 'viem';
import { calculateApr } from '../calculateAprs';

describe('calculateApr', () => {
  it.skip('calculates the APR of a pool', () => {
    const totalLiquidity = BigInt('17927758400401179743');
    const activeLiquidity = BigInt('17927758400401179743');
    const vTokenToEth = BigInt('51269898653901803');
    const price = vTokenToEth;
    const tick = BigInt('-29708');
    const tickSpacing = 200;
    const periodFees = parseEther('1');

    const result = calculateApr({
      activeLiquidity,
      currentTick: tick,
      periodFees,
      price,
      tickSpacing,
      totalLiquidity,
    });

    //TODO
    expect(formatEther(result)).toBe('0');
  });
});
