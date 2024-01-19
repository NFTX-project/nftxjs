import type { Address, TokenIds } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultBuyQuote = ({
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
    type: 'buy',
    vaultId,
    buyTokenIds: tokenIds,
    network,
    userAddress,
    slippagePercentage,
  });

export default fetchVaultBuyQuote;
