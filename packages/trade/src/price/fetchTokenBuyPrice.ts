import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish, Price } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchQuote from './fetchQuote';
import nftxQuoteToPrice from './quoteToPrice';

/** Fetches a buy price for a given token.
 */
const fetchTokenBuyPrice = async (args: {
  network?: number;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
  userAddress?: Address;
}): Promise<Price> => {
  const {
    userAddress,
    network = config.network,
    tokenAddress: buyToken,
    quote: sellToken = 'ETH',
    amount: buyAmount = WeiPerEther,
  } = args;

  const quote = await fetchQuote({
    buyToken,
    sellToken,
    buyAmount,
    network,
    userAddress,
  });

  return nftxQuoteToPrice(quote);
};

export default fetchTokenBuyPrice;
