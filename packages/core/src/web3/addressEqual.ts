import type { Address } from './types';

/** A rudimentary 0x address comparison function
 * This doesn't check if the addresses are valid or even defined
 * Just that they are case-insensitivly equal
 */
const addressEqual = (a: Address, b: Address) => {
  if (!a || !b) {
    return false;
  }
  return a.toLowerCase() === b.toLowerCase();
};

export default addressEqual;
