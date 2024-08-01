import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { WETH_TOKEN } from '@nftx/constants';
import { SUSHISWAP_ROUTER } from '@nftx/constants';
import routerAbi from '@nftx/constants/abis/UniswapV2Router.json';
import type { Price } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const fetchBuyPriceFromWeb3 = async ({
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

  const tokenIn = getChainConstant(WETH_TOKEN, network);
  const tokenOut = tokenAddress;

  const [quotePrice] =
    ((await contract.getAmountsIn(amount, [
      tokenIn,
      tokenOut,
    ])) as BigNumber[]) || [];

  return {
    price: quotePrice,
  };
};

/** Fetches a buy price for a given token.
 * If you're looking to buy an item from a vault, use fetchVaultBuyPrice
 */
const fetchBuyPrice = async (args: {
  network?: number;
  provider: Provider;
  tokenAddress: string;
  amount?: BigNumberish;
  quote?: 'ETH';
}): Promise<Price> => {
  const {
    network = config.network,
    provider,
    tokenAddress,
    quote = 'ETH',
    amount = WeiPerEther,
  } = args;

  return fetchBuyPriceFromWeb3({
    network,
    tokenAddress,
    amount,
    provider,
    quote,
  });
};

export default fetchBuyPrice;
