import { Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import fetchBuyPrice from './fetchBuyPrice';
import fetchSellPrice from './fetchSellPrice';
import type { BigNumber } from '@ethersproject/bignumber';

/**
 * Fetches the spread for a given token. This is the difference between buy price and sell price.
 */
const fetchSpread = async (args: {
  network?: number;
  provider: Provider;
  tokenAddress: string;
  quote?: 'ETH';
  critical?: boolean;
}): Promise<BigNumber> => {
  const {
    network = config.network,
    provider,
    tokenAddress,
    quote,
    critical,
  } = args;

  try {
    const { price: buyPrice } = await fetchBuyPrice({
      network,
      provider,
      tokenAddress,
      quote,
      critical,
    });
    const { price: sellPrice } = await fetchSellPrice({
      network,
      provider,
      tokenAddress,
      quote,
      critical,
    });

    return buyPrice.sub(sellPrice);
  } catch {
    return Zero;
  }
};

export default fetchSpread;
