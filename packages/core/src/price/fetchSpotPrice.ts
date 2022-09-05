import { WeiPerEther, Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import config from '@nftx/config';
import { BigNumber } from 'ethers';
import { fetchReservesForToken } from '../tokens';
import type { Address } from '../web3/types';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0XPrice';
import type { Price } from './types';

const fetchSpotPriceFromApi = async ({
  network,
  tokenAddress,
  quote,
  critical,
}: {
  network: number;
  tokenAddress: Address;
  quote: 'ETH';
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

  const spotPrice = WeiPerEther.mul(WeiPerEther).div(
    parseEther(buyTokenToEthRate)
  );

  const price: Price = {
    estimatedGas: BigNumber.from(estimatedGas),
    gasPrice: BigNumber.from(gasPrice),
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
  quote: 'ETH';
}) => {
  const reserves = await fetchReservesForToken({ network, tokenAddress });

  const spotPrice = reserves?.midPrice ?? Zero;

  const price: Price = {
    price: spotPrice,
  };
  return price;
};

/** Fetches a spot price for a given token
 * If possible, the price is fetched from the 0x service, otherwise it uses pool reserves
 */
const fetchSpotPrice = ({
  network = config.network,
  provider,
  tokenAddress,
  quote = 'ETH',
  critical,
}: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  quote?: 'ETH';
  critical?: boolean;
}) => {
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
