import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

/** Takes a BigNumber and returns a regular number
 * Essentially the same as formatEther but without the formatting
 */
const toEthersNumber = (
  val: BigNumberish,
  { precision = 18 }: { precision?: number } = {}
) => {
  if (val == null) {
    return null;
  }
  try {
    return Number(BigNumber.from(val).toString()) / 10 ** precision;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default toEthersNumber;
