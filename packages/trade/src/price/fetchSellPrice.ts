import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { SUSHISWAP_ROUTER, WETH_TOKEN } from '@nftx/constants';
import routerAbi from '@nftx/constants/abis/UniswapV2Router.json';
import type { Price } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

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

/** Fetches a sell price for a given token.
 * If you're looking to sell an item into a vault, use fetchVaultSellPrice.
 */
const fetchSellPrice = (args: {
  network?: number;
  provider: Provider;
  tokenAddress: string;
  amount?: BigNumberish;
  quote?: 'ETH';
}) => {
  const {
    network = config.network,
    provider,
    tokenAddress,
    amount = WeiPerEther,
    quote = 'ETH',
  } = args;

  return fetchSellPriceFromWeb3({
    network,
    tokenAddress,
    amount,
    provider,
    quote,
  });
};

export default fetchSellPrice;
