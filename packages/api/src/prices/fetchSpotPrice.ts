import type { QuoteToken } from '@nftx/types';
import fetchPrice from './fetchPrice';
import { WeiPerEther } from '@nftx/constants';

const fetchSpotPrice = async ({
  tokenAddress,
  amount = WeiPerEther,
  network,
  quoteToken,
}: {
  tokenAddress: QuoteToken;
  network?: number;
  quoteToken?: QuoteToken;
  amount?: bigint;
}) => {
  let fraction = WeiPerEther;
  let error: any = new Error('Failed to fetch spot price');

  do {
    try {
      const quote = await fetchPrice({
        network,
        type: 'erc20',
        buyToken: tokenAddress,
        sellToken: quoteToken || 'ETH',
        buyAmount: fraction,
      });

      quote.price = (quote.price * amount) / fraction;

      return quote;
    } catch (e) {
      error = e;
      fraction /= 100n;
    }
  } while (fraction > 0n);

  throw error;
};

export default fetchSpotPrice;
