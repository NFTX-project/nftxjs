import { formatEther, parseEther } from 'viem';

/** Takes a BigNumber and returns a regular number
 * Essentially the same as formatEther but without the formatting
 */
const toEthersNumber = (
  val: bigint | string | number,
  { precision = 18 }: { precision?: number } = {}
) => {
  if (val == null) {
    return null;
  }
  try {
    const asBigNumber = BigInt(`${val}`);
    if (asBigNumber < parseEther('1')) {
      return Number(formatEther(asBigNumber));
    }
    return Number(`${asBigNumber}`) / 10 ** precision;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default toEthersNumber;
