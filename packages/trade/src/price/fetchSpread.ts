import config from '@nftx/config';
import { Zero } from '@nftx/constants';
import type { Address, Provider } from '@nftx/types';
import fetchBuyPrice from './fetchBuyPrice';
import fetchSellPrice from './fetchSellPrice';
import type { QuoteToken } from './types';

/**
 * Fetches the spread for a given token. This is the difference between buy price and sell price.
 */
const fetchSpread = async (args: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  quote?: QuoteToken;
  critical?: boolean;
}): Promise<bigint> => {
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

    return buyPrice - sellPrice;
  } catch {
    return Zero;
  }
};

export default fetchSpread;
