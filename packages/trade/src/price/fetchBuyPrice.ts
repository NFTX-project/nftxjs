import config from '@nftx/config';
import { WeiPerEther, WETH_TOKEN } from '@nftx/constants';
import { SUSHISWAP_ROUTER } from '@nftx/constants';
import { UniswapV2Router } from '@nftx/abi';
import type { Address, BigIntish, Price, Provider } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';
import type { QuoteToken } from './types';

const fetchBuyPriceFromApi = async ({
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

const fetchBuyPriceFromWeb3 = async ({
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

  const tokenIn = getChainConstant(WETH_TOKEN, network);
  const tokenOut = tokenAddress;

  const [quotePrice] = await contract.read.getAmountsIn({
    args: [BigInt(amount), [tokenIn, tokenOut]],
  });

  return {
    price: quotePrice,
  };
};

/** Fetches a buy price for a given token.
 * If possible, the price is fetched from the 0x api, otherwise it uses sushiswap.
 * If you're looking to buy an item from a vault, use fetchVaultBuyPrice
 */
const fetchBuyPrice = async (args: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  amount?: BigIntish;
  quote?: QuoteToken;
  critical?: boolean;
}): Promise<Price> => {
  const {
    network = config.network,
    provider,
    tokenAddress,
    quote = 'ETH',
    amount = WeiPerEther,
    critical = false,
  } = args;
  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    return fetchBuyPriceFromApi({
      network,
      tokenAddress,
      amount,
      quote,
      critical,
    });
  }
  return fetchBuyPriceFromWeb3({
    network,
    tokenAddress,
    amount,
    provider,
    quote,
  });
};

export default fetchBuyPrice;
