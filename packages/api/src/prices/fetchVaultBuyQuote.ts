import type { Address } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultBuyQuote = ({
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
    type: 'buy',
    vaultId,
    buyTokenIds: tokenIds,
    network,
    userAddress,
  });

export default fetchVaultBuyQuote;
