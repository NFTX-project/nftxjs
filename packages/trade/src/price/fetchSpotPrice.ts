import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, Price } from '@nftx/types';
import { parseEther } from 'viem';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import type { QuoteToken } from './types';
import fetchBuyPrice from './fetchBuyPrice';
import doesNetworkSupportNftxRouter from './doesNetworkSupportNftxRouter';

const fetchSpotPriceFromNftxRouter = async ({
  network,
  tokenAddress,
  quote,
}: {
  network: number;
  tokenAddress: Address;
  quote: QuoteToken;
}) => {
  return fetchBuyPrice({
    tokenAddress,
    quote,
    network,
    amount: WeiPerEther,
  });
};

const fetchSpotPriceFrom0x = async ({
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

/** Fetches a spot price for a given token.
 * If possible, the price is fetched from the 0x service, otherwise it uses pool reserves
 */
const fetchSpotPrice = (args: {
  network?: number;
  tokenAddress: Address;
  quote?: QuoteToken;
  critical?: boolean;
}) => {
  const {
    network = config.network,
    tokenAddress,
    quote = 'ETH',
    critical = false,
  } = args;

  if (doesNetworkSupportNftxRouter(network)) {
    return fetchSpotPriceFromNftxRouter({ network, quote, tokenAddress });
  }
  if (doesNetworkSupport0x(network)) {
    return fetchSpotPriceFrom0x({
      network,
      tokenAddress,
      quote,
      critical,
    });
  }
  throw new Error(`fetchSpotPrice is not supported for network ${network}`);
};

export default fetchSpotPrice;
