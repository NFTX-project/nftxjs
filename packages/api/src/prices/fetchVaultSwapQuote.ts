import type { Address, TokenIds } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultSwapQuote = ({
  vaultId,
  network,
  userAddress,
  buyTokenIds,
  sellTokenIds,
  slippagePercentage,
}: {
  vaultId: string;
  sellTokenIds: TokenIds;
  buyTokenIds: TokenIds;
  userAddress: Address;
  network?: number;
  slippagePercentage?: number;
}) =>
  fetchQuote({
    quoteType: 'quote',
    type: 'swap',
    vaultId,
    buyTokenIds,
    sellTokenIds,
    network,
    userAddress,
    slippagePercentage,
  });

export default fetchVaultSwapQuote;
