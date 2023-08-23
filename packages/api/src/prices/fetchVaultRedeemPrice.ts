import type { TokenId } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultRedeemPrice = ({
  tokenIds,
  vaultId,
  network,
}: {
  vaultId: string;
  tokenIds: TokenId[] | [TokenId, number][];
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'price',
    type: 'redeem',
    vaultId,
    buyTokenIds: tokenIds,
    network,
  });

export default fetchVaultRedeemPrice;
