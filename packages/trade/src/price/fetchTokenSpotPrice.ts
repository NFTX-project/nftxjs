import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchTokenBuyPrice from './fetchTokenBuyPrice';

/** Fetches a spot price for a given token.
 */
const fetchTokenSpotPrice = async (args: {
  network?: number;
  tokenAddress: Address;
  quote?: QuoteToken;
  amount?: bigint;
}) => {
  const {
    network = config.network,
    tokenAddress,
    quote = 'ETH',
    amount = WeiPerEther,
  } = args;

  const price = await fetchTokenBuyPrice({
    tokenAddress,
    quote,
    network,
    amount: BigInt(1),
  });

  price.price = price.price * amount;

  return price;
};

export default fetchTokenSpotPrice;
