import config from '@nftx/config';
import { SUSHISWAP_ROUTER, WeiPerEther, WETH_TOKEN } from '@nftx/constants';
import { UniswapV2Router } from '@nftx/abi';
import type { Address, BigIntish, Price, Provider } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import type { QuoteToken } from './types';

const fetchSellPriceFromApi = async ({
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

const fetchSellPriceFromWeb3 = async ({
  network,
  provider,
  tokenAddress,
  amount,
}: {
  network: number;
  provider: Provider;
  tokenAddress: Address;
  amount: BigIntish;
  quote: QuoteToken;
}) => {
  const contract = getContract({
    address: getChainConstant(SUSHISWAP_ROUTER, network),
    abi: UniswapV2Router,
    provider,
  });

  const tokenIn = tokenAddress;
  const tokenOut = getChainConstant(WETH_TOKEN, network);

  const [, quotePrice] =
    (await contract.read.getAmountsOut({
      args: [BigInt(amount), [tokenIn, tokenOut]],
    })) || [];

  const price: Price = {
    price: quotePrice,
  };
  return price;
};

/** Fetches a sell price for a given token.
 * If possible, the price is fetched from the 0x api, otherwise it uses sushiswap.
 * If you're looking to sell an item into a vault, use fetchVaultSellPrice.
 */
const fetchSellPrice = (args: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
  critical?: boolean;
}) => {
  const {
    network = config.network,
    provider,
    tokenAddress,
    amount = WeiPerEther,
    quote = 'ETH',
    critical = false,
  } = args;

  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    return fetchSellPriceFromApi({
      network,
      tokenAddress,
      amount,
      quote,
      critical,
    });
  }
  return fetchSellPriceFromWeb3({
    network,
    tokenAddress,
    amount,
    provider,
    quote,
  });
};

export default fetchSellPrice;
