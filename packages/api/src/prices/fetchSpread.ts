import { WeiPerEther, Zero } from '@nftx/constants';
import { QuoteToken } from '@nftx/types';
import fetchPrice from './fetchPrice';

/** Returns the difference between a buy and sell of a single token */
const fetchSpread = async ({
  tokenAddress,
  network,
  quoteToken,
}: {
  tokenAddress: QuoteToken;
  network?: number;
  quoteToken?: QuoteToken;
}) => {
  try {
    const { price: buyPrice } = await fetchPrice({
      network,
      type: 'erc20',
      buyToken: tokenAddress,
      sellToken: quoteToken || 'ETH',
      buyAmount: WeiPerEther,
    });
    const { price: sellPrice } = await fetchPrice({
      network,
      type: 'erc20',
      sellToken: tokenAddress,
      buyToken: quoteToken || 'ETH',
      sellAmount: WeiPerEther,
    });

    return buyPrice - sellPrice;
  } catch {
    return Zero;
  }
};

export default fetchSpread;
