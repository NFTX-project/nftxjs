import { MARKETPLACE_ZAP, WeiPerEther, Zero } from '@nftx/constants';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
  VaultHolding,
} from '@nftx/types';
import fetchVTokenToEth from '../vaults/fetchVTokenToEth';
import {
  getChainConstant,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/utils';
import { parseEther } from 'viem';
import {
  getHoldingByTokenId,
  fetchPremiumPrice,
  getApproveContracts,
} from './common';

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
  }: {
    network: number;
    vault: Pick<Vault, 'id' | 'vaultId' | 'fees' | 'asset' | 'is1155'>;
    userAddress: Address;
    provider: Provider;
    sellTokenIds: TokenId[] | [TokenId, number][];
    buyTokenIds: TokenId[] | [TokenId, number][];
    holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  }) => {
    const tokenIdsIn = getUniqueTokenIds(sellTokenIds);
    const amountsIn = getTokenIdAmounts(sellTokenIds);
    const tokenIdsOut = getUniqueTokenIds(buyTokenIds);
    const amountsOut = getTokenIdAmounts(buyTokenIds);
    const totalIn = getTotalTokenIds(sellTokenIds);
    const totalOut = getTotalTokenIds(buyTokenIds);

    if (totalIn !== totalOut) {
      throw new Error('You must mint/redeem the same amount of items');
    }

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

    const approveContracts = getApproveContracts({
      tokenIds: tokenIdsIn,
      vault,
      spender: getChainConstant(MARKETPLACE_ZAP, network),
    });

    const result: MarketplaceQuote = {
      type: 'swap',
      price,
      vTokenPrice: Zero,
      feePrice,
      premiumPrice,
      items,
      approveContracts,
      methodParameters: {
        executeCalldata: null as any,
        to: userAddress,
        tokenIdsIn,
        amountsIn,
        tokenIdsOut,
        amountsOut,
        value: price.toString(),
        vaultAddress: vault.id,
        vaultId: vault.vaultId,
        standard,
        premiumLimit: premiumLimit.toString(),
      },
    };

    return result;
  };

export default makeQuoteVaultSwap({ fetchPremiumPrice, fetchVTokenToEth });
