import type { Address, TokenId } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultMintQuote = ({
  tokenIds,
  vaultId,
  network,
  userAddress,
}: {
  vaultId: string;
  tokenIds: TokenId[] | [TokenId, number][];
  userAddress: Address;
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'quote',
    type: 'mint',
    vaultId,
    sellTokenIds: tokenIds,
    network,
    userAddress,
  });

export default fetchVaultMintQuote;
