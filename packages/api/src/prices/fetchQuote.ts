import type { Address, MarketplacePrice, MarketplaceQuote } from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';

const fetchQuote = ({
  quoteType,
  type,
  vaultId,
  buyTokenIds,
  network = config.network,
  sellTokenIds,
  userAddress,
}: {
  quoteType: 'quote' | 'price';
  type: 'buy' | 'sell' | 'swap';
  vaultId: string;
  buyTokenIds?: `${number}`[];
  sellTokenIds?: `${number}`[];
  userAddress?: Address;
  network?: number;
}) => {
  if (quoteType === 'price') {
    return queryApi<MarketplacePrice>({
      url: `/${network}/price`,
      query: {
        type,
        vaultId,
        buyTokenIds,
        sellTokenIds,
      },
    });
  }

  return queryApi<MarketplaceQuote>({
    url: `/${network}/quote`,
    query: {
      type,
      vaultId,
      buyTokenIds,
      sellTokenIds,
      userAddress,
    },
  });
};

export default fetchQuote;
