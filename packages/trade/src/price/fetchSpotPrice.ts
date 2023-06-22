import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchBuyPrice from './fetchBuyPrice';

const fetchSpotPriceFromNftxRouter = async ({
  network,
  tokenAddress,
  quote: quoteToken,
  amount = WeiPerEther,
}: {
  network: number;
  tokenAddress: Address;
  amount?: bigint;
  quote: QuoteToken;
}) => {
  const price = await fetchBuyPrice({
    tokenAddress,
    quote: quoteToken,
    network,
    amount: BigInt(1),
  });

  price.price = price.price * amount;

  return price;
};

/** Fetches a spot price for a given token.
 * If possible, the price is fetched from the 0x service, otherwise it uses pool reserves
 */
const fetchSpotPrice = (args: {
  network?: number;
  tokenAddress: Address;
  quote?: QuoteToken;
  amount?: bigint;
}) => {
  const {
    network = config.network,
    tokenAddress,
    quote = 'ETH',
    amount,
  } = args;

  return fetchSpotPriceFromNftxRouter({ network, quote, tokenAddress, amount });
};

export default fetchSpotPrice;
