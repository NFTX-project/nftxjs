import type { Address, TokenIds } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultSellQuote = ({
  tokenIds,
  vaultId,
  network,
  userAddress,
  slippagePercentage,
}: {
  vaultId: string;
  tokenIds: TokenIds;
  userAddress: Address;
  network?: number;
  slippagePercentage?: number;
}) =>
  fetchQuote({
    quoteType: 'quote',
    type: 'sell',
    vaultId,
    sellTokenIds: tokenIds,
    network,
    userAddress,
    slippagePercentage,
  });

export default fetchVaultSellQuote;
