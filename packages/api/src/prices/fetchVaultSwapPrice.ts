import fetchQuote from './fetchQuote';

const fetchVaultSwapPrice = ({
  sellTokenIds,
  buyTokenIds,
  vaultId,
  network,
}: {
  vaultId: string;
  sellTokenIds: `${number}`[];
  buyTokenIds: `${number}`[];
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'price',
    type: 'swap',
    vaultId,
    buyTokenIds,
    sellTokenIds,
    network,
  });

export default fetchVaultSwapPrice;
