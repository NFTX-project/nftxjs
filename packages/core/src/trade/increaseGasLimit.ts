import type { BigNumber } from '@ethersproject/bignumber';

/**
 * Takes a contract gas estimate and increases it by given %
 */
export const increaseGasLimit = ({
  estimate,
  amount = 1,
}: {
  estimate: BigNumber;
  amount?: number;
}) => {
  try {
    if (estimate == null) {
      return null;
    }
    return estimate.mul(Number((amount * 10 + 1000).toFixed(1))).div(1000);
  } catch {
    return null;
  }
};

export default increaseGasLimit;
