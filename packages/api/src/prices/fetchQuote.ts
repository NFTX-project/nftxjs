import type {
  Address,
  MarketplacePrice,
  MarketplaceQuote,
  TokenId,
} from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';
import { getTokenIdAmounts, getUniqueTokenIds } from '@nftx/utils';

type CommonArgs = {
  type: 'buy' | 'sell' | 'swap' | 'mint' | 'redeem';
  vaultId: string;
  buyTokenIds?: TokenId[] | [TokenId, number][];
  sellTokenIds?: TokenId[] | [TokenId, number][];
  network?: number;
};
type PriceArgs = CommonArgs & {
  quoteType: 'price';
};
type QuoteArgs = CommonArgs & {
  quoteType: 'quote';
  userAddress: Address;
};

function fetchQuote(args: PriceArgs): Promise<MarketplacePrice>;
function fetchQuote(args: QuoteArgs): Promise<MarketplaceQuote>;
function fetchQuote(args: PriceArgs | QuoteArgs) {
  const {
    quoteType,
    type,
    vaultId,
    buyTokenIds: buyTokensAndAmounts,
    network = config.network,
    sellTokenIds: sellTokensAndAmounts,
  } = args;

  const buyTokenIds = buyTokensAndAmounts
    ? getUniqueTokenIds(buyTokensAndAmounts)
    : undefined;
  const buyAmounts = buyTokensAndAmounts
    ? getTokenIdAmounts(buyTokensAndAmounts)
    : undefined;
  const sellTokenIds = sellTokensAndAmounts
    ? getUniqueTokenIds(sellTokensAndAmounts)
    : undefined;
  const sellAmounts = sellTokensAndAmounts
    ? getTokenIdAmounts(sellTokensAndAmounts)
    : undefined;

  if (quoteType === 'price') {
    return queryApi<MarketplacePrice>({
      url: `/${network}/price`,
      query: {
        type,
        vaultId,
        buyTokenIds,
        buyAmounts,
        sellTokenIds,
        sellAmounts,
      },
    });
  }

  const { userAddress } = args;

  return queryApi<MarketplaceQuote>({
    url: `/${network}/quote`,
    query: {
      type,
      vaultId,
      buyTokenIds,
      buyAmounts,
      sellTokenIds,
      sellAmounts,
      userAddress,
    },
  });
}

export default fetchQuote;
