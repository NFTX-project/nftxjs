import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { SUSHISWAP_ROUTER, WETH_TOKEN } from '@nftx/constants';
import routerAbi from '@nftx/constants/abis/UniswapV2Router.json';
import type { Price } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0xPrice';

const fetchSellPriceFromApi = async ({
  network,
  tokenAddress,
  amount,
  quote,
  critical,
}: {
  network: number;
  tokenAddress: string;
  amount: BigNumberish;
  quote: 'ETH';
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
    price: BigNumber.from(buyAmount),
    estimatedGas: BigNumber.from(estimatedGas),
    gasPrice: BigNumber.from(gasPrice),
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
  tokenAddress: string;
  amount: BigNumberish;
  quote: 'ETH';
}) => {
  const contract = getContract({
    network,
    address: getChainConstant(SUSHISWAP_ROUTER, network),
    abi: routerAbi,
    provider,
  });

  const tokenIn = tokenAddress;
  const tokenOut = getChainConstant(WETH_TOKEN, network);

  const [, quotePrice] =
    ((await contract.getAmountsOut(amount, [
      tokenIn,
      tokenOut,
    ])) as BigNumber[]) || [];

  const price: Price = {
    price: quotePrice,
  };
  return price;
};

/** Fetches a sell price for a given token */
const fetchSellPrice = ({
  network = config.network,
  provider,
  tokenAddress,
  amount = WeiPerEther,
  quote = 'ETH',
  critical,
}: {
  network?: number;
  provider: Provider;
  tokenAddress: string;
  amount?: BigNumberish;
  quote?: 'ETH';
  critical?: boolean;
}) => {
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
