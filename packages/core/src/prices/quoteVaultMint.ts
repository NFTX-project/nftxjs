import {
  getTokenIdAmounts,
  getUniqueTokenIds,
  increaseByPercentage,
} from '@nftx/utils';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
} from '@nftx/types';
import quoteVaultSell from './quoteVaultSell';
import { getApproveContracts } from './common';

const quoteVaultMint = async ({
  network,
  provider,
  tokenIds,
  userAddress,
  vault,
  slippagePercentage,
}: {
  network: number;
  tokenIds: TokenId[] | [TokenId, number][];
  userAddress: Address;
  vault: Pick<Vault, 'id' | 'vaultId' | 'fees' | 'is1155' | 'asset'>;
  provider: Provider;
  slippagePercentage?: number;
}) => {
  const { feePrice, items, premiumPrice, price, vTokenPrice } =
    await quoteVaultSell({
      network,
      provider,
      tokenIds,
      userAddress,
      vault,
      slippagePercentage,
    });

  const tokenIdsIn = getUniqueTokenIds(tokenIds);
  const amountsIn = getTokenIdAmounts(tokenIds);

  const value = increaseByPercentage(feePrice, slippagePercentage);

  const standard = vault.is1155 ? 'ERC1155' : 'ERC721';

  const approveContracts = getApproveContracts({
    tokenIds: tokenIdsIn,
    vault,
    spender: vault.id,
  });

  const result: MarketplaceQuote = {
    type: 'mint',
    vTokenPrice,
    feePrice,
    premiumPrice,
    price,
    items,
    approveContracts,
    methodParameters: {
      executeCalldata: '0x',
      to: userAddress,
      tokenIdsIn,
      amountsIn,
      tokenIdsOut: [],
      amountsOut: [],
      premiumLimit: '',
      value: value.toString(),
      vaultAddress: vault.id,
      vaultId: vault.vaultId,
      standard,
    },
  };

  return result;
};

export default quoteVaultMint;