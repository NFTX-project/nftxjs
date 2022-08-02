import { WeiPerEther, Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import config from '@nftx/config';
import { fetchReservesForToken } from '../tokens';
import type { Address } from '../web3/types';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xQuote from './fetch0xQuote';

const fetchSpotPriceFromApi = async ({
  network,
  tokenAddress,
  quote,
}: {
  network: number;
  tokenAddress: Address;
  quote: 'ETH';
}) => {
  const { buyTokenToEthRate } = await fetch0xQuote({
    network,
    sellToken: quote,
    buyToken: tokenAddress,
  });

  return WeiPerEther.mul(WeiPerEther).div(parseEther(buyTokenToEthRate));
};

const fetchSpotPriceFromSubgraph = async ({
  network,
  tokenAddress,
}: {
  network: number;
  provider: Provider;
  tokenAddress: Address;
  quote: 'ETH';
}) => {
  const reserves = await fetchReservesForToken({ network, tokenAddress });

  return reserves?.midPrice ?? Zero;
};

/** Fetches a spot price for a given token
 * If possible, the price is fetched from the 0x service, otherwise it uses pool reserves
 */
const fetchSpotPrice = ({
  network = config.network,
  provider,
  tokenAddress,
  quote = 'ETH',
}: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  quote?: 'ETH';
}) => {
  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    return fetchSpotPriceFromApi({
      network,
      tokenAddress,
      quote,
    });
  }
  return fetchSpotPriceFromSubgraph({
    network,
    tokenAddress,
    provider,
    quote,
  });
};

export default fetchSpotPrice;
