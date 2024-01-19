import type { TokenIds } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultMintPrice = ({
  tokenIds,
  vaultId,
  network,
}: {
  vaultId: string;
  tokenIds: TokenIds;
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'price',
    type: 'mint',
    vaultId,
    sellTokenIds: tokenIds,
    network,
  });

export default fetchVaultMintPrice;
