import { TokenIds } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultSwapPrice = ({
  sellTokenIds,
  buyTokenIds,
  vaultId,
  network,
}: {
  vaultId: string;
  sellTokenIds: TokenIds;
  buyTokenIds: TokenIds;
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'price',
    type: 'swap',
    vaultId,
    buyTokenIds,
    sellTokenIds,
    network,
  });

export default fetchVaultSwapPrice;
