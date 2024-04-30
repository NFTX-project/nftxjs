import type { QuoteToken } from '@nftx/types';
import fetchPrice from './fetchPrice';
import { WeiPerEther } from '@nftx/constants';
import { UnknownError } from '@nftx/errors';

/** Returns the spot price for buying a token */
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
  // We start by attempting to quote 1 whole token, but if it fails (e.g. due to insufficient liquidity),
  // we can try to quote a smaller fraction of the token until we find a price that works.
  let fraction = WeiPerEther;
  let error: any = new UnknownError('Failed to fetch spot price');

  do {
    try {
      const quote = await fetchPrice({
        network,
        type: 'erc20',
        buyToken: tokenAddress,
        sellToken: quoteToken || 'ETH',
        buyAmount: fraction,
      });

      // Extrapolate the price to determine the spot price for 1 whole token, then scale it by the desired amount.
      quote.price = quote.vTokenPrice = (quote.price * amount) / fraction;

      return quote;
    } catch (e) {
      error = e;
      fraction /= 100n;
    }
  } while (fraction > 0n);

  throw error;
};

export default fetchSpotPrice;
