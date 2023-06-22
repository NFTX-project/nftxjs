import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchNftxQuote from './fetchNftxQuote';
import nftxQuoteToPrice from './nftxQuoteToPrice';

const fetchSellPriceNftxrouter = async ({
  network,
  tokenAddress: sellToken,
  amount: sellAmount,
  quote: buyToken,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigIntish;
  quote: QuoteToken;
}) => {
  const quote = await fetchNftxQuote({
    buyToken,
    sellToken,
    sellAmount,
    network,
  });

  return nftxQuoteToPrice(quote);
};

/** Fetches a sell price for a given token.
 * If possible, the price is fetched from the 0x api, otherwise it uses sushiswap.
 * If you're looking to sell an item into a vault, use fetchVaultSellPrice.
 */
const fetchSellPrice = (args: {
  network?: number;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
}) => {
  const {
    network = config.network,
    tokenAddress,
    amount = WeiPerEther,
    quote = 'ETH',
  } = args;

  return fetchSellPriceNftxrouter({ amount, network, quote, tokenAddress });
};

export default fetchSellPrice;
