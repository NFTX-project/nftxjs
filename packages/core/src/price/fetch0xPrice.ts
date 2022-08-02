import type { BigNumberish } from '@ethersproject/bignumber';
import type { Address } from '../web3';
import fetch0xQuote from './fetch0xQuote';

/** Fetch a price from the 0x api
 * This can be used for reading pricing info
 * If you want to then commit a transaction, use fetch0xQuote instead
 */
const fetch0xPrice = async ({
  buyToken,
  sellToken,
  buyAmount,
  sellAmount,
  network,
}: {
  network: number;
  buyToken: Address;
  sellToken: Address;
  buyAmount?: BigNumberish;
  sellAmount?: BigNumberish;
}) => {
  return fetch0xQuote({
    network,
    buyToken,
    sellToken,
    buyAmount,
    sellAmount,
    type: 'price',
  });
};

export default fetch0xPrice;
