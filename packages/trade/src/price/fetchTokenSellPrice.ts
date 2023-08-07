import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchQuote from './fetchQuote';
import nftxQuoteToPrice from './quoteToPrice';

/** Fetches a sell price for a given token.
 */
const fetchTokenSellPrice = async (args: {
  network?: number;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
  userAddress?: Address;
}) => {
  const {
    network = config.network,
    tokenAddress: sellToken,
    amount: sellAmount = WeiPerEther,
    quote: buyToken = 'ETH',
    userAddress,
  } = args;

  const quote = await fetchQuote({
    buyToken,
    sellToken,
    sellAmount,
    network,
    userAddress,
  });

  return nftxQuoteToPrice(quote);
};

export default fetchTokenSellPrice;
