import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish, Price } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchQuote from './fetchQuote';
import nftxQuoteToPrice from './quoteToPrice';

/** Fetches a buy price for a given token.
 */
const fetchTokenBuyPrice = async (args: {
  network?: number;
  /** The token you want to buy (address, ETH, USDC, or WETH) */
  tokenAddress: QuoteToken;
  /** The amount to buy (defaults to 1e18) */
  amount?: BigIntish;
  /** The token you want to quote in (address, ETH, USDC, or WETH) (defaults to ETH) */
  quote?: QuoteToken;
  /** Address of the wallet doing the buy. Required if you want to receive the calldata to make a trade */
  userAddress?: Address;
  /** The max amount of slippage (0-1) */
  slippagePercentage?: number;
}): Promise<Price> => {
  const {
    userAddress,
    network = config.network,
    tokenAddress: buyToken,
    quote: sellToken = 'ETH',
    amount: buyAmount = WeiPerEther,
    slippagePercentage,
  } = args;

  const quote = await fetchQuote({
    buyToken,
    sellToken,
    buyAmount,
    network,
    userAddress,
    slippagePercentage,
  });

  return nftxQuoteToPrice(quote);
};

export default fetchTokenBuyPrice;
