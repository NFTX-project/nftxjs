import type { TokenId } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultMintPrice = ({
  tokenIds,
  vaultId,
  network,
}: {
  vaultId: string;
  tokenIds: TokenId[] | [TokenId, number][];
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
