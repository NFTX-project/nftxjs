import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish, Price } from '@nftx/types';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import type { QuoteToken } from './types';
import fetchNftxQuote from './fetchNftxQuote';
import doesNetworkSupportNftxRouter from './doesNetworkSupportNftxRouter';
import nftxQuoteToPrice from './nftxQuoteToPrice';

const fetchSellPriceNftxrouter = async ({
  network,
  tokenAddress: sellToken,
  amount: sellAmount,
  quote: buyToken,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigIntish;
  quote: QuoteToken;
}) => {
  const quote = await fetchNftxQuote({
    buyToken,
    sellToken,
    sellAmount,
    network,
  });

  return nftxQuoteToPrice(quote);
};

const fetchSellPriceFrom0x = async ({
  network,
  tokenAddress,
  amount,
  quote,
  critical,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigIntish;
  quote: QuoteToken;
  critical: boolean;
}) => {
  const { buyAmount, estimatedGas, gasPrice, sources, estimatedPriceImpact } =
    await fetch0xPrice({
      network,
      sellAmount: amount,
      sellToken: tokenAddress,
      buyToken: quote,
      critical,
    });

  const price: Price = {
    price: BigInt(buyAmount),
    estimatedGas: BigInt(estimatedGas),
    gasPrice: BigInt(gasPrice),
    sources,
    priceImpact: Number(estimatedPriceImpact) / 100,
  };

  return price;
};

/** Fetches a sell price for a given token.
 * If possible, the price is fetched from the 0x api, otherwise it uses sushiswap.
 * If you're looking to sell an item into a vault, use fetchVaultSellPrice.
 */
const fetchSellPrice = (args: {
  network?: number;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
  critical?: boolean;
}) => {
  const {
    network = config.network,
    tokenAddress,
    amount = WeiPerEther,
    quote = 'ETH',
    critical = false,
  } = args;

  if (doesNetworkSupportNftxRouter(network)) {
    return fetchSellPriceNftxrouter({ amount, network, quote, tokenAddress });
  }

  if (doesNetworkSupport0x(network)) {
    return fetchSellPriceFrom0x({
      network,
      tokenAddress,
      amount,
      quote,
      critical,
    });
  }

  throw new Error(`fetchSellPrice is not available for network ${network}`);
};

export default fetchSellPrice;
