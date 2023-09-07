import type {
  Address,
  MarketplacePrice,
  MarketplaceQuote,
  TokenId,
} from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';
import { getTokenIdAmounts, getUniqueTokenIds } from '@nftx/utils';

const fetchQuote = ({
  quoteType,
  type,
  vaultId,
  buyTokenIds: buyTokensAndAmounts,
  network = config.network,
  sellTokenIds: sellTokensAndAmounts,
  userAddress,
}: {
  quoteType: 'quote' | 'price';
  type: 'buy' | 'sell' | 'swap' | 'mint' | 'redeem';
  vaultId: string;
  buyTokenIds?: TokenId[] | [TokenId, number][];
  sellTokenIds?: TokenId[] | [TokenId, number][];
  userAddress?: Address;
  network?: number;
}) => {
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
};

export default fetchQuote;
