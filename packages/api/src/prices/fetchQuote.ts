import type {
  Address,
  BigIntish,
  MarketplacePrice,
  MarketplaceQuote,
  Permit2Quote,
  TokenIds,
  QuoteToken,
} from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';
import { getTokenIdAmounts, getUniqueTokenIds } from '@nftx/utils';

export type BuyArgs = {
  network?: number;
  type: 'buy';
  vaultId: string;
  tokenIds: TokenIds;
};
export type SellArgs = {
  network?: number;
  type: 'sell';
  vaultId: string;
  tokenIds: TokenIds;
};
export type SwapArgs = {
  network?: number;
  type: 'swap';
  vaultId: string;
  mintTokenIds: TokenIds;
  redeemTokenIds: TokenIds;
};
export type MintArgs = {
  network?: number;
  type: 'mint';
  vaultId: string;
  tokenIds: TokenIds;
};
export type RedeemArgs = {
  network?: number;
  type: 'redeem';
  vaultId: string;
  tokenIds: TokenIds;
};
export type TokenArgs = {
  network?: number;
  type: 'erc20';
  buyToken: QuoteToken;
  sellToken: QuoteToken;
  buyAmount?: BigIntish;
  sellAmount?: BigIntish;
};

type PriceArgs = { quoteType: 'price' };
type QuoteArgs = {
  quoteType?: 'quote';
  userAddress: Address;
  slippagePercentage?: number;
  permit2?: Permit2Quote;
};

/** Returns an on-chain quote for a transaction. The response object can be passed into @nftx/trade's fulfill method to execute the quote */
function fetchQuote(args: BuyArgs & PriceArgs): Promise<MarketplacePrice>;
function fetchQuote(args: BuyArgs & QuoteArgs): Promise<MarketplaceQuote>;
function fetchQuote(args: SellArgs & PriceArgs): Promise<MarketplacePrice>;
function fetchQuote(args: SellArgs & QuoteArgs): Promise<MarketplaceQuote>;
function fetchQuote(args: SwapArgs & PriceArgs): Promise<MarketplacePrice>;
function fetchQuote(args: SwapArgs & QuoteArgs): Promise<MarketplaceQuote>;
function fetchQuote(args: MintArgs & PriceArgs): Promise<MarketplacePrice>;
function fetchQuote(args: MintArgs & QuoteArgs): Promise<MarketplaceQuote>;
function fetchQuote(args: RedeemArgs & PriceArgs): Promise<MarketplacePrice>;
function fetchQuote(args: RedeemArgs & QuoteArgs): Promise<MarketplaceQuote>;
function fetchQuote(args: TokenArgs & PriceArgs): Promise<MarketplacePrice>;
function fetchQuote(args: TokenArgs & QuoteArgs): Promise<MarketplaceQuote>;
function fetchQuote(args: any) {
  const {
    type,
    quoteType = 'quote',
    network = config.network,
    vaultId,
    userAddress,
    slippagePercentage,
  } = args;

  const url = `/${network}/quote/${type}`;

  const query: Record<string, any> = {
    vaultId,
    userAddress,
    slippagePercentage,
  };

  switch (type) {
    case 'buy':
    case 'redeem':
      query.buyTokenIds = getUniqueTokenIds(args.tokenIds);
      query.buyAmounts = getTokenIdAmounts(args.tokenIds);
      break;
    case 'sell':
    case 'mint':
      query.sellTokenIds = getUniqueTokenIds(args.tokenIds);
      query.sellAmounts = getTokenIdAmounts(args.tokenIds);
      break;
    case 'swap':
      query.sellTokenIds = getUniqueTokenIds(args.mintTokenIds);
      query.sellAmounts = getTokenIdAmounts(args.mintTokenIds);
      query.buyTokenIds = getUniqueTokenIds(args.redeemTokenIds);
      query.buyAmounts = getTokenIdAmounts(args.redeemTokenIds);
      break;
    case 'erc20':
      query.sellToken = args.sellToken;
      query.sellAmount = args.sellAmount;
      query.buyToken = args.buyToken;
      query.buyAmount = args.buyAmount;
      break;
  }

  if (args.permit2 && quoteType === 'quote') {
    query.permit2 = args.permit2;
  }

  type QuoteType = typeof quoteType extends 'price'
    ? MarketplacePrice
    : MarketplaceQuote;

  const method = quoteType === 'price' ? 'GET' : 'POST';

  return queryApi<QuoteType>({
    url,
    query,
    method,
  });
}

export default fetchQuote;
