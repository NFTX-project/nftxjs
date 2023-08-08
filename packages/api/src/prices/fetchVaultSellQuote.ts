import type { Address } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultSellQuote = ({
  tokenIds,
  vaultId,
  network,
  userAddress,
}: {
  vaultId: string;
  tokenIds: `${number}`[];
  userAddress: Address;
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'quote',
    type: 'sell',
    vaultId,
    sellTokenIds: tokenIds,
    network,
    userAddress,
  });

export default fetchVaultSellQuote;
