import {
  getContract,
  getExactTokenIds,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
  increaseByPercentage,
  zipTokenIds,
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
import { NFTXVaultUpgradeable } from '@nftx/abi';
import { Zero } from '@nftx/constants';

const quoteVaultRedeem = async ({
  holdings,
  network,
  provider,
  tokenIds,
  userAddress,
  vault,
  slippagePercentage,
}: {
  network: number;
  provider: Provider;
  vault: Vault;
  userAddress: Address;
  tokenIds: TokenId[] | [TokenId, number][];
  holdings: VaultHolding[];
  slippagePercentage?: number;
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
    slippagePercentage,
  });

  const value = increaseByPercentage(
    feePrice + premiumPrice,
    slippagePercentage
  );

  let estimatedGas = Zero;
  try {
    const { gasEstimate } = await getContract({
      abi: NFTXVaultUpgradeable,
      address: vault.id,
      provider,
    }).estimate.redeem({
      account: userAddress,
      value,
      args: [
        getExactTokenIds(zipTokenIds(tokenIdsOut, amountsOut)).map(BigInt),
        userAddress,
        Zero,
        BigInt(premiumLimit),
        true,
      ],
    });
    estimatedGas = gasEstimate;
  } catch {
    // Could not estimate gas
  }

  const approveContracts: MarketplaceQuote['approveContracts'] = [];

  const result: MarketplaceQuote = {
    type: 'redeem',
    vTokenPrice,
    feePrice,
    premiumPrice,
    price,
    items,
    estimatedGas,
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
      value: value.toString(),
      premiumLimit,
    },
  };

  return result;
};

export default quoteVaultRedeem;
