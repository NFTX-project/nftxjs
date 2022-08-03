import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { WETH_TOKEN } from '@nftx/constants';
import { SUSHISWAP_ROUTER } from '@nftx/constants';
import routerAbi from '@nftx/constants/abis/UniswapV2Router.json';
import { getChainConstant, getContract } from '../web3';
import type { Address } from '../web3/types';
import doesNetworkSupport0x from './doesNetworkSupport0x';
import fetch0xPrice from './fetch0XPrice';

const fetchBuyPriceFromApi = async ({
  network,
  tokenAddress,
  quote,
  amount,
}: {
  network: number;
  tokenAddress: Address;
  amount: BigNumberish;
  quote: 'ETH';
}) => {
  const { sellAmount } = await fetch0xPrice({
    network,
    buyAmount: amount,
    sellToken: quote,
    buyToken: tokenAddress,
  });

  return BigNumber.from(sellAmount);
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
  amount: BigNumberish;
  quote: 'ETH';
}) => {
  const contract = getContract({
    network,
    address: getChainConstant(SUSHISWAP_ROUTER, network),
    abi: routerAbi,
    provider,
  });

  const tokenIn = getChainConstant(WETH_TOKEN, network);
  const tokenOut = tokenAddress;

  const [quotePrice] =
    ((await contract.getAmountsIn(amount, [
      tokenIn,
      tokenOut,
    ])) as BigNumber[]) || [];

  return quotePrice;
};

/** Fetches a buy price for a given token
 * If possible, the price is fetched from the 0x service, otherwise it uses sushiswap
 */
const fetchBuyPrice = ({
  network = config.network,
  provider,
  tokenAddress,
  quote = 'ETH',
  amount = WeiPerEther,
}: {
  network?: number;
  provider: Provider;
  tokenAddress: Address;
  amount?: BigNumberish;
  quote?: 'ETH';
}) => {
  const apiSupported = doesNetworkSupport0x(network);
  if (apiSupported) {
    return fetchBuyPriceFromApi({
      network,
      tokenAddress,
      amount,
      quote,
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
