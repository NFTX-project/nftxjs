import {
  getContract,
  getTokenIdAmounts,
  getUniqueTokenIds,
  increaseByPercentage,
} from '@nftx/utils';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenIds,
  Vault,
} from '@nftx/types';
import quoteVaultSell from './quoteVaultSell';
import { getApproveContracts } from '@nftx/trade';
import { NFTXVaultUpgradeable } from '@nftx/abi';
import { Zero } from '@nftx/constants';

const quoteVaultMint = async ({
  network,
  provider,
  tokenIds,
  userAddress,
  vault,
  slippagePercentage,
}: {
  network: number;
  tokenIds: TokenIds;
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
    network,
    label: `Approve ${vault.asset.name}`,
    spenderAddress: vault.id,
    tokenAddress: vault.asset.id,
    standard: vault.is1155 ? 'ERC1155' : 'ERC721',
    tokenIds: tokenIdsIn,
  });

  let estimatedGas = Zero;
  try {
    const { gasEstimate } = await getContract({
      abi: NFTXVaultUpgradeable,
      address: vault.id,
      provider,
    }).estimate.mint({
      value,
      account: userAddress,
      args: [
        tokenIdsIn.map(BigInt),
        amountsIn.map(BigInt),
        userAddress,
        userAddress,
      ],
    });
    estimatedGas = gasEstimate;
  } catch {
    // Could not estimate gas
  }

  const result: MarketplaceQuote = {
    type: 'mint',
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
