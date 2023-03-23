import type { BigIntish } from '@nftx/types';
import fetch0xQuote from './fetch0xQuote';
import type { QuoteToken } from './types';

/** Fetch a price from the 0x api
 * This can be used for reading pricing info
 * If you want to then commit a transaction, use fetch0xQuote instead
 */
const fetch0xPrice = async (args: {
  network: number;
  buyToken: QuoteToken;
  sellToken: QuoteToken;
  buyAmount?: BigIntish;
  sellAmount?: BigIntish;
  critical?: boolean;
}) => {
  return fetch0xQuote({
    type: 'price',
    ...args,
  });
};

export default fetch0xPrice;
