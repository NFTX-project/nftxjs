import fetchQuote from './fetchQuote';

const fetchVaultSellPrice = ({
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
    type: 'sell',
    vaultId,
    sellTokenIds: tokenIds,
    network,
  });

export default fetchVaultSellPrice;
