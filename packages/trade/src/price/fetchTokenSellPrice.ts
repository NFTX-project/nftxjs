import config from '@nftx/config';
import { WeiPerEther } from '@nftx/constants';
import type { Address, BigIntish, Permit2Quote } from '@nftx/types';
import type { QuoteToken } from './types';
import fetchQuote from './fetchQuote';
import nftxQuoteToPrice from './quoteToPrice';

/** Fetches a sell price for a given token.
 */
const fetchTokenSellPrice = async (args: {
  network?: number;
  /** The token you want to sell (address, ETH, USDC, or WETH) */
  tokenAddress: QuoteToken;
  /** The amount to sell (defaults to 1e18) */
  amount?: BigIntish;
  /** The token you want to quote in (address, ETH, USDC, or WETH) (defaults to ETH) */
  quote?: QuoteToken;
  /** Address of the wallet doing the sell. Required if you want to receive the calldata to make a trade */
  userAddress?: Address;
  /** The max amount of slippage (0-1) */
  slippagePercentage?: number;
  /** Permit2 parameters in order to do an off-chain permission. If ommitted, you will need to have done an on-chain approval with permit2 */
  permit2?: Permit2Quote;
}) => {
  const {
    network = config.network,
    tokenAddress: sellToken,
    amount: sellAmount = WeiPerEther,
    quote: buyToken = 'ETH',
    userAddress,
    slippagePercentage,
    permit2,
  } = args;

  const quote = await fetchQuote({
    buyToken,
    sellToken,
    sellAmount,
    network,
    userAddress,
    slippagePercentage,
    permit2,
  });

  return nftxQuoteToPrice(quote);
};

export default fetchTokenSellPrice;
