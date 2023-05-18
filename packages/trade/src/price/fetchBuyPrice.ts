import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish, Price } from '@nftx/types';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import type { QuoteToken } from './types';
import fetchNftxQuote from './fetchNftxQuote';
import doesNetworkSupportNftxRouter from './doesNetworkSupportNftxRouter';
import nftxQuoteToPrice from './nftxQuoteToPrice';

const fetchBuyPriceFromNftx = async ({
  network,
  tokenAddress: buyToken,
  quote: sellToken,
  amount: buyAmount,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigIntish;
  quote: QuoteToken;
}) => {
  const quote = await fetchNftxQuote({
    buyToken,
    sellToken,
    buyAmount,
    network,
  });

  return nftxQuoteToPrice(quote);
};

const fetchBuyPriceFrom0x = async ({
  network,
  tokenAddress,
  quote,
  amount,
  critical,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigIntish;
  quote: QuoteToken;
  critical: boolean;
}) => {
  const { sellAmount, estimatedGas, gasPrice, sources, estimatedPriceImpact } =
    await fetch0xPrice({
      network,
      buyAmount: amount,
      sellToken: quote,
      buyToken: tokenAddress,
      critical,
    });

  const price: Price = {
    price: BigInt(sellAmount),
    estimatedGas: BigInt(estimatedGas),
    gasPrice: BigInt(gasPrice),
    sources,
    priceImpact: Number(estimatedPriceImpact) / 100,
  };

  return price;
};

/** Fetches a buy price for a given token.
 * If possible, the price is fetched from the 0x api, otherwise it uses sushiswap.
 * If you're looking to buy an item from a vault, use fetchVaultBuyPrice
 */
const fetchBuyPrice = async (args: {
  network?: number;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
  critical?: boolean;
}): Promise<Price> => {
  const {
    network = config.network,
    tokenAddress,
    quote = 'ETH',
    amount = WeiPerEther,
    critical = false,
  } = args;

  if (doesNetworkSupportNftxRouter(network)) {
    return fetchBuyPriceFromNftx({
      amount,
      network,
      quote,
      tokenAddress,
    });
  }

  if (doesNetworkSupport0x(network)) {
    return fetchBuyPriceFrom0x({
      network,
      tokenAddress,
      amount,
      quote,
      critical,
    });
  }
  throw new Error(`fetchBuyPrice is not supported on network ${network}`);
};

export default fetchBuyPrice;
