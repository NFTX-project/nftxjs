import { MarketplacePrice } from '@nftx/types';
import fetchQuote, {
  BuyArgs,
  MintArgs,
  RedeemArgs,
  SellArgs,
  TokenArgs,
  SwapArgs,
} from './fetchQuote';

function fetchPrice(args: BuyArgs): Promise<MarketplacePrice>;
function fetchPrice(args: SellArgs): Promise<MarketplacePrice>;
function fetchPrice(args: SwapArgs): Promise<MarketplacePrice>;
function fetchPrice(args: MintArgs): Promise<MarketplacePrice>;
function fetchPrice(args: RedeemArgs): Promise<MarketplacePrice>;
function fetchPrice(args: TokenArgs): Promise<MarketplacePrice>;
function fetchPrice(args: any) {
  return fetchQuote({ ...args, quoteType: 'price' });
}

export default fetchPrice;
