/** Checks if 2 addresses are equal.
 * This is a rudimentary 0x address comparison function. It doesn't check if the addresses are valid or even defined, just that they are case-insensitivly equal
 */
const addressEqual = (a: any, b: any) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  return a.toLowerCase() === b.toLowerCase();
};

export default addressEqual;
