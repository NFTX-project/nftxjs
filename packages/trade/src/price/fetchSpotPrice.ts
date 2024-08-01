import { Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Price } from '@nftx/types';
import { fetchReservesForToken } from '@nftx/utils';

const fetchSpotPriceFromSubgraph = async ({
  network,
  tokenAddress,
}: {
  network: number;
  provider: Provider;
  tokenAddress: string;
  quote: 'ETH';
}) => {
  const reserves = await fetchReservesForToken({ network, tokenAddress });

  const spotPrice = reserves?.midPrice ?? Zero;

  const price: Price = {
    price: spotPrice,
  };
  return price;
};

/** Fetches a spot price for a given token.
 */
const fetchSpotPrice = (args: {
  network?: number;
  provider: Provider;
  tokenAddress: string;
  quote?: 'ETH';
}) => {
  const {
    network = config.network,
    provider,
    tokenAddress,
    quote = 'ETH',
  } = args;

  return fetchSpotPriceFromSubgraph({
    network,
    tokenAddress,
    provider,
    quote,
  });
};

export default fetchSpotPrice;
