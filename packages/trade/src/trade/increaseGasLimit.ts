import type { BigNumber } from '@ethersproject/bignumber';

/**
 * Takes a contract gas estimate and increases it by a given percentage
 */
export const increaseGasLimit = ({
  estimate,
  amount = 1,
}: {
  /** A gas estimate */
  estimate: BigNumber;
  /** The amount to increase the estimate by. This is a whole number percentage (i.e. 1 = 1%) */
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
