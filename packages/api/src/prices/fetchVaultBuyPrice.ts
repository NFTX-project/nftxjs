import fetchQuote from './fetchQuote';

const fetchVaultBuyPrice = ({
  tokenIds,
  vaultId,
  network,
}: {
  vaultId: string;
  tokenIds: `${number}`[];
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'price',
    type: 'buy',
    vaultId,
    buyTokenIds: tokenIds,
    network,
  });

export default fetchVaultBuyPrice;
