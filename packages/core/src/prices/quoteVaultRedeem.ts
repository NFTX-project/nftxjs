import {
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/utils';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
  VaultHolding,
} from '@nftx/types';
import quoteVaultBuy from './quoteVaultBuy';
import { ValidationError } from '@nftx/errors';

const quoteVaultRedeem = async ({
  holdings,
  network,
  provider,
  tokenIds,
  userAddress,
  vault,
}: {
  network: number;
  provider: Provider;
  vault: Vault;
  userAddress: Address;
  tokenIds: TokenId[] | [TokenId, number][];
  holdings: VaultHolding[];
}) => {
  const standard = vault.is1155 ? 'ERC1155' : 'ERC721';
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const tokenIdsOut = getUniqueTokenIds(tokenIds);
  const amountsOut = getTokenIdAmounts(tokenIds);

  ValidationError.validate({
    tokenIds: () => !!totalTokenIds || 'Required',
    userAddress: () => !!userAddress || 'Required',
  });

  const {
    feePrice,
    items,
    premiumPrice,
    methodParameters: { premiumLimit },
    price,
    vTokenPrice,
  } = await quoteVaultBuy({
    holdings,
    provider,
    tokenIds,
    userAddress,
    vault,
    network,
  });

  const value = (feePrice + premiumPrice).toString();

  const approveContracts: MarketplaceQuote['approveContracts'] = [];

  const result: MarketplaceQuote = {
    type: 'redeem',
    vTokenPrice,
    feePrice,
    premiumPrice,
    price,
    items,
    approveContracts,
    methodParameters: {
      executeCalldata: '0x',
      to: userAddress,
      vaultAddress: vault.id,
      vaultId: vault.vaultId,
      standard,
      tokenIdsIn: [],
      amountsIn: [],
      tokenIdsOut,
      amountsOut,
      value,
      premiumLimit,
    },
  };

  return result;
};

export default quoteVaultRedeem;
