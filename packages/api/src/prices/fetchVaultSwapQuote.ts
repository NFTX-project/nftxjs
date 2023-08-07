import type { Address } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultSwapQuote = ({
  vaultId,
  network,
  userAddress,
  buyTokenIds,
  sellTokenIds,
}: {
  vaultId: string;
  sellTokenIds: `${number}`[];
  buyTokenIds: `${number}`[];
  userAddress: Address;
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'quote',
    type: 'swap',
    vaultId,
    buyTokenIds,
    sellTokenIds,
    network,
    userAddress,
  });

export default fetchVaultSwapQuote;
