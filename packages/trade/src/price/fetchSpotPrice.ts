import config from '@nftx/config';
import { WeiPerEther, Zero } from '@nftx/constants';
import type { Address, Price, Provider } from '@nftx/types';
import { fetchReservesForToken } from '@nftx/utils';
import { parseEther } from 'viem';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import type { QuoteToken } from './types';

const fetchSpotPriceFromApi = async ({
  network,
  tokenAddress,
  quote,
  critical,
}: {
  network: number;
  tokenAddress: Address;
  quote: QuoteToken;
  critical: boolean;
}) => {
  const {
    buyTokenToEthRate,
    sources,
    estimatedGas,
    gasPrice,
    estimatedPriceImpact,
  } = await fetch0xPrice({
    network,
    sellToken: quote,
    buyToken: tokenAddress,
    critical,
  });

  const spotPrice = (WeiPerEther * WeiPerEther) / parseEther(buyTokenToEthRate);

  const price: Price = {
    estimatedGas: BigInt(estimatedGas),
    gasPrice: BigInt(gasPrice),
    price: spotPrice,
    sources,
    priceImpact: Number(estimatedPriceImpact) / 100,
  };
  return price;
};

const fetchSpotPriceFromSubgraph = async ({
  network,
  tokenAddress,
}: {
  network: number;
  provider: Provider;
  tokenAddress: Address;
  quote: QuoteToken;
}) => {
  const reserves = await fetchReservesForToken({ network, tokenAddress });

  const spotPrice = reserves?.midPrice ?? Zero;

  const price: Price = {
    price: spotPrice,
  };
  return price;
};

/** Fetches a spot price for a given token.
 * If possible, the price is fetched from the 0x service, otherwise it uses pool reserves
 */
const fetchSpotPrice = (args: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  quote?: QuoteToken;
  critical?: boolean;
}) => {
  const {
    network = config.network,
    provider,
    tokenAddress,
    quote = 'ETH',
    critical = false,
  } = args;

  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    return fetchSpotPriceFromApi({
      network,
      tokenAddress,
      quote,
      critical,
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
