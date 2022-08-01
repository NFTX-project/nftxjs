import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import { formatEther } from '@ethersproject/units';

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
    const asBigNumber = BigNumber.from(val);
    if (asBigNumber.lt(WeiPerEther)) {
      return Number(formatEther(asBigNumber));
    }
    return Number(`${asBigNumber}`) / 10 ** precision;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default toEthersNumber;
