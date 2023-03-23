/**
 * Takes a contract gas estimate and increases it by a given percentage
 */
export const increaseGasLimit = ({
  estimate,
  amount = 1,
}: {
  /** A gas estimate */
  estimate: bigint;
  /** The amount to increase the estimate by. This is a whole number percentage (i.e. 1 = 1%) */
  amount?: number;
}) => {
  try {
    if (estimate == null) {
      return estimate;
    }
    return (estimate * BigInt(Number((amount * 10 + 1000).toFixed(1)))) / 1000n;
  } catch {
    return undefined;
  }
};

export default increaseGasLimit;
