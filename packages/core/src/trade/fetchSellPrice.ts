import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import { SUSHISWAP_ROUTER, WETH_TOKEN } from '@nftx/constants';
import routerAbi from '@nftx/constants/abis/UniswapV2Router.json';
import { getChainConstant, getContract } from '../web3';
import type { Address } from '../web3/types';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0XPrice';

const fetchSellPriceFromApi = async ({
  network,
  tokenAddress,
  amount,
  quote,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigNumberish;
  quote: 'ETH';
}) => {
  return fetch0xPrice({
    network,
    amount,
    sellToken: tokenAddress,
    buyToken: quote,
  });
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

  return quotePrice;
};

/** Fetches a sell price for a given token */
const fetchSellPrice = async ({
  network,
  provider,
  tokenAddress,
  amount = WeiPerEther,
  quote = 'ETH',
}: {
  network: number;
  provider: Provider;
  tokenAddress: Address;
  amount?: BigNumberish;
  quote?: 'ETH';
}) => {
  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    try {
      return await fetchSellPriceFromApi({
        network,
        tokenAddress,
        amount,
        quote,
      });
    } catch (e) {
      console.error(e);
      // fall back to the web3 call route
    }
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