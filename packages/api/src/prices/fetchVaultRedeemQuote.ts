import type { Address, TokenId } from '@nftx/types';
import fetchQuote from './fetchQuote';

const fetchVaultRedeemQuote = ({
  tokenIds,
  vaultId,
  network,
  userAddress,
}: {
  vaultId: string;
  tokenIds: TokenId[] | [TokenId, number][];
  userAddress: Address;
  network?: number;
}) =>
  fetchQuote({
    quoteType: 'quote',
    type: 'redeem',
    vaultId,
    buyTokenIds: tokenIds,
    network,
    userAddress,
  });

export default fetchVaultRedeemQuote;
