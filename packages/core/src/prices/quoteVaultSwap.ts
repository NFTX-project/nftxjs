import { MARKETPLACE_ZAP, PERMIT2, WeiPerEther, Zero } from '@nftx/constants';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
  VaultHolding,
} from '@nftx/types';
import fetchVTokenToEth from '../vaults/fetchVaults/fetchVTokenToEth';
import {
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/utils';
import { parseEther } from 'viem';
import { getHoldingByTokenId, fetchPremiumPrice } from './common';
import { getChainConstant } from '@nftx/utils';

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
        const premiumPrice = await fetchPremiumPrice({
          holding,
          provider,
          tokenId,
          vaultAddress: vault.id,
          vTokenToEth,
        });

        const item: MarketplaceQuote['items'][0] = {
          tokenId,
          amount,
          vTokenPrice: Zero,
          feePrice: feePricePerItem,
          premiumPrice,
        };

        return item;
      })
    );

    const premiumPrice = items.reduce(
      (total, item) => total + item.premiumPrice,
      Zero
    );

    const price = premiumPrice + feePrice;

    const approveContracts: MarketplaceQuote['approveContracts'] = [
      {
        tokenAddress: vault.asset.id,
        spenderAddress: getChainConstant(MARKETPLACE_ZAP, network),
        standard,
      },
      {
        tokenAddress: vault.id,
        spenderAddress: getChainConstant(PERMIT2, network),
        standard: 'ERC20',
      },
      // TODO: we also need to do a permit2 call that isn't a regular approval
      //     Then before each swap, user signs a permit2 signature off-chain, allowing UniversalRouter to pull the required tokens.
      // *2a. For testing, we are instead doing it on-chain by executing: Permit2.approve(token, universalRouterAddress, amount, expiration)
    ];

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
      },
    };

    return result;
  };

export default makeQuoteVaultSwap({ fetchPremiumPrice, fetchVTokenToEth });
