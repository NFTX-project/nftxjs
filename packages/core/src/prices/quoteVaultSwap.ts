import { MARKETPLACE_ZAP, WeiPerEther, Zero } from '@nftx/constants';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenIds,
  Vault,
  VaultHolding,
} from '@nftx/types';
import {
  fetchVTokenToEth,
  getChainConstant,
  getContract,
  getExactTokenIds,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
  increaseByPercentage,
  zipTokenIds,
} from '@nftx/utils';
import { parseEther } from 'viem';
import { getHoldingByTokenId, fetchPremiumPrice } from './common';
import { ValidationError } from '@nftx/errors';
import { getApproveContracts } from '@nftx/trade';
import { MarketplaceZap } from '@nftx/abi';

type FetchVTokenToEth = typeof fetchVTokenToEth;
type FetchPremiumPrice = typeof fetchPremiumPrice;

export const makeQuoteVaultSwap =
  ({
    fetchPremiumPrice,
    fetchVTokenToEth,
  }: {
    fetchVTokenToEth: FetchVTokenToEth;
    fetchPremiumPrice: FetchPremiumPrice;
  }) =>
  async ({
    buyTokenIds,
    holdings,
    network,
    provider,
    sellTokenIds,
    userAddress,
    vault,
    slippagePercentage,
  }: {
    network: number;
    vault: Pick<Vault, 'id' | 'vaultId' | 'fees' | 'asset' | 'is1155'>;
    userAddress: Address;
    provider: Provider;
    sellTokenIds: TokenIds;
    buyTokenIds: TokenIds;
    holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
    slippagePercentage?: number;
    bypassLiquidityCheck?: boolean;
  }) => {
    const tokenIdsIn = getUniqueTokenIds(sellTokenIds);
    const amountsIn = getTokenIdAmounts(sellTokenIds);
    const tokenIdsOut = getUniqueTokenIds(buyTokenIds);
    const amountsOut = getTokenIdAmounts(buyTokenIds);
    const totalIn = getTotalTokenIds(sellTokenIds);
    const totalOut = getTotalTokenIds(buyTokenIds);

    ValidationError.validate({
      buyTokenIds: () => {
        if (!totalOut) {
          return 'Required';
        }
        if (sellTokenIds && totalIn !== totalOut) {
          return 'You must redeem the same amount of items as you are minting';
        }
      },
      sellTokenIds: () => !!totalIn || 'Required',
      userAddress: () => !!userAddress || 'Required',
    });

    const standard = vault.is1155 ? 'ERC1155' : 'ERC721';

    const swapAmount = parseEther(`${totalIn}`);
    const vTokenToEth = await fetchVTokenToEth({
      provider,
      vaultAddress: vault.id,
    });

    const feePricePerItem = (vault.fees.swapFee * vTokenToEth) / WeiPerEther;
    const feePrice = (feePricePerItem * swapAmount) / WeiPerEther;

    const items = await Promise.all(
      tokenIdsOut.map(async (tokenId, i) => {
        const amount = amountsOut[i];
        const holding = getHoldingByTokenId(holdings, tokenId);
        const [premiumLimit, premiumPrice] = await fetchPremiumPrice({
          holding,
          provider,
          tokenId,
          amount,
          vTokenToEth,
          network,
          standard,
          vaultId: vault.vaultId,
        });

        const item: MarketplaceQuote['items'][0] = {
          tokenId,
          amount,
          vTokenPrice: Zero,
          feePrice: feePricePerItem,
          premiumPrice,
          premiumLimit,
        };

        return item;
      })
    );

    const premiumPrice = items.reduce(
      (total, item) => total + item.premiumPrice,
      Zero
    );
    const premiumLimit = items.reduce(
      (total, item) => total + item.premiumLimit,
      Zero
    );

    const price = premiumPrice + feePrice;
    const value = increaseByPercentage(price, slippagePercentage);

    const approveContracts = getApproveContracts({
      network,
      label: `Approve ${vault.asset.name}`,
      spenderAddress: getChainConstant(MARKETPLACE_ZAP, network),
      tokenAddress: vault.asset.id,
      standard,
      tokenIds: tokenIdsIn,
    });

    let estimatedGas = Zero;

    try {
      const contract = getContract({
        address: getChainConstant(MARKETPLACE_ZAP, network),
        abi: MarketplaceZap,
        provider,
      });
      const { gasEstimate } = await (standard === 'ERC1155'
        ? contract.estimate.swap1155({
            account: userAddress,
            value,
            args: [
              BigInt(vault.vaultId),
              tokenIdsIn.map(BigInt),
              amountsIn.map(BigInt),
              getExactTokenIds(zipTokenIds(tokenIdsOut, amountsOut)).map(
                BigInt
              ),
              premiumLimit,
              userAddress,
            ],
          })
        : contract.estimate.swap721({
            args: [
              BigInt(vault.vaultId),
              tokenIdsIn.map(BigInt),
              tokenIdsOut.map(BigInt),
              premiumLimit,
              userAddress,
            ],
            value,
            account: userAddress,
          }));
      estimatedGas = gasEstimate;
    } catch {
      // Could not estimate gas
    }

    const result: MarketplaceQuote = {
      type: 'swap',
      price,
      vTokenPrice: Zero,
      feePrice,
      premiumPrice,
      items,
      estimatedGas,
      approveContracts,
      methodParameters: {
        executeCalldata: null as any,
        to: userAddress,
        tokenIdsIn,
        amountsIn,
        tokenIdsOut,
        amountsOut,
        value: value.toString(),
        vaultAddress: vault.id,
        vaultId: vault.vaultId,
        standard,
        premiumLimit: premiumLimit.toString(),
      },
    };

    return result;
  };

const quoteVaultSwap = makeQuoteVaultSwap({
  fetchPremiumPrice,
  fetchVTokenToEth,
});

export default quoteVaultSwap;
