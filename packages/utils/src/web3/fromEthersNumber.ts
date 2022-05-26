import { parseUnits } from '@ethersproject/units';

/** Takes a number and returns a BigNumber
 * Essentially the same as parseEther but accounts for things like decimal precision
 */
const fromEthersNumber = (
  val: number | string,
  { precision = 18 }: { precision?: number } = {}
) => {
  if (val == null) {
    return null;
  }
  let value = `${val}`;

  // Make sure the given number doesn't exceed the max precision of the BigNumber
  if (value.includes('.')) {
    const parts = value.split('.');
    if (parts[1]?.length > precision) {
      parts[1] = parts[1].slice(0, precision);
      value = parts.join('.');
    }
  }

  try {
    // return BigNumber.from(`${value * 10 ** precision}`);
    return parseUnits(value, precision);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default fromEthersNumber;
