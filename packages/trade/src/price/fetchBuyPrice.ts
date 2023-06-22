import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish, Price } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchNftxQuote from './fetchNftxQuote';
import nftxQuoteToPrice from './nftxQuoteToPrice';

const fetchBuyPriceFromNftx = async ({
  network,
  tokenAddress: buyToken,
  quote: sellToken,
  amount: buyAmount,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigIntish;
  quote: QuoteToken;
}) => {
  const quote = await fetchNftxQuote({
    buyToken,
    sellToken,
    buyAmount,
    network,
  });

  return nftxQuoteToPrice(quote);
};

/** Fetches a buy price for a given token.
 * If possible, the price is fetched from the 0x api, otherwise it uses sushiswap.
 * If you're looking to buy an item from a vault, use fetchVaultBuyPrice
 */
const fetchBuyPrice = async (args: {
  network?: number;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
}): Promise<Price> => {
  const {
    network = config.network,
    tokenAddress,
    quote = 'ETH',
    amount = WeiPerEther,
  } = args;

  return fetchBuyPriceFromNftx({
    amount,
    network,
    quote,
    tokenAddress,
  });
};

export default fetchBuyPrice;
