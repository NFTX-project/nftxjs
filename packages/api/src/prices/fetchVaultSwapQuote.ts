import type { Address } from '@nftx/types';
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
  sellTokenIds: `${number}`[];
  buyTokenIds: `${number}`[];
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
