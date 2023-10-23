import config from '@nftx/config';
import { Zero } from '@nftx/constants';
import type { Address } from '@nftx/types';
import fetchTokenBuyPrice from './fetchTokenBuyPrice';
import fetchTokenSellPrice from './fetchTokenSellPrice';
import type { QuoteToken } from './types';

/**
 * Fetches the spread for a given token. This is the difference between buy price and sell price.
 */
const fetchSpread = async (args: {
  network?: number;
  /** The token you want the spread for (address / ETH / USDC / WETH) */
  tokenAddress: Address;
  /** The currency you want the quote in (address / ETH / USDC / WETH) (defaults to ETH) */
  quote?: QuoteToken;
}): Promise<bigint> => {
  const { network = config.network, tokenAddress, quote } = args;

  try {
    const { price: buyPrice } = await fetchTokenBuyPrice({
      network,
      tokenAddress,
      quote,
    });
    const { price: sellPrice } = await fetchTokenSellPrice({
      network,
      tokenAddress,
      quote,
    });

    return buyPrice - sellPrice;
  } catch {
    return Zero;
  }
};

export default fetchSpread;
