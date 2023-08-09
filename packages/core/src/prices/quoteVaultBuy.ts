import { MARKETPLACE_ZAP, WeiPerEther } from '@nftx/constants';
import {
  fetchTokenBuyPrice,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/trade';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  Vault,
  VaultHolding,
} from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { parseEther } from 'viem';
import fetchVTokenToEth from '../vaults/fetchVaults/fetchVTokenToEth';
import config from '@nftx/config';
import {
  calculateFeePricePerItem,
  calculateTotalFeePrice,
  getHoldingByTokenId,
  fetchPremiumPrice,
  calculateTotalPremiumPrice,
} from './common';

type FetchTokenBuyPrice = typeof fetchTokenBuyPrice;
type FetchVTokenToEth = typeof fetchVTokenToEth;
type FetchPremiumPrice = typeof fetchPremiumPrice;

const transformItem = async ({
  buyAmount,
  holdings,
  provider,
  tokenId,
  vTokenPrice,
  vTokenToEth,
  vault,
  fetchPremiumPrice,
}: {
  holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded'>[];
  tokenId: `${number}`;
  provider: Provider;
  vault: Pick<Vault, 'id' | 'fees'>;
  vTokenToEth: bigint;
  vTokenPrice: bigint;
  buyAmount: bigint;
  fetchPremiumPrice: FetchPremiumPrice;
}): Promise<MarketplaceQuote['items'][0]> => {
  const vTokenPricePerItem = (vTokenPrice * WeiPerEther) / buyAmount;
  const feePricePerItem = calculateFeePricePerItem(
    vault.fees.redeemFee,
    vTokenToEth
  );

  const holding = getHoldingByTokenId(holdings, tokenId);
  const premiumPrice = await fetchPremiumPrice({
    holding,
    provider,
    tokenId,
    vaultAddress: vault.id,
    vTokenToEth,
  });

  return {
    tokenId,
    premiumPrice,
    feePrice: feePricePerItem,
    vTokenPrice: vTokenPricePerItem,
  };
};

export const makeQuoteVaultBuy =
  ({
    fetchPremiumPrice,
    fetchTokenBuyPrice,
    fetchVTokenToEth,
  }: {
    fetchVTokenToEth: FetchVTokenToEth;
    fetchTokenBuyPrice: FetchTokenBuyPrice;
    fetchPremiumPrice: FetchPremiumPrice;
  }) =>
  async ({
    network = config.network,
    provider,
    tokenIds,
    userAddress,
    vault,
    holdings: allHoldings,
  }: {
    vault: Pick<Vault, 'fees' | 'id' | 'vaultId'>;
    tokenIds: `${number}`[];
    network?: number;
    userAddress: Address;
    provider: Provider;
    holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  }) => {
    const totalTokenIds = getTotalTokenIds(tokenIds);
    const buyAmount = parseEther(`${totalTokenIds}`);
    const tokenIdsOut = getUniqueTokenIds(tokenIds);

    const holdings = allHoldings.filter((x) => tokenIdsOut.includes(x.tokenId));

    const vTokenToEth = await fetchVTokenToEth({
      provider,
      vaultAddress: vault.id,
    });

    const {
      price: vTokenPrice,
      methodParameters: { calldata: executeCalldata },
    } = await fetchTokenBuyPrice({
      network,
      tokenAddress: vault.id,
      amount: buyAmount,
      userAddress: getChainConstant(MARKETPLACE_ZAP, network),
    });

    const items = await Promise.all(
      tokenIdsOut.map(async (tokenId) => {
        return transformItem({
          buyAmount,
          holdings,
          provider,
          tokenId,
          vault,
          vTokenPrice,
          vTokenToEth,
          fetchPremiumPrice,
        });
      })
    );

    const premiumPrice = calculateTotalPremiumPrice(items);
    const feePrice = calculateTotalFeePrice(
      vault.fees.redeemFee,
      vTokenToEth,
      buyAmount
    );
    const price = vTokenPrice + premiumPrice + feePrice;

    const result: MarketplaceQuote = {
      type: 'buy',
      price,
      vTokenPrice,
      feePrice,
      premiumPrice,
      approveContracts: [],
      items,
      methodParameters: {
        value: price.toString(),
        executeCalldata,
        to: userAddress,
        tokenIdsIn: [],
        tokenIdsOut,
        vaultAddress: vault.id,
        vaultId: vault.vaultId,
      },
    };

    return result;
  };

export default makeQuoteVaultBuy({
  fetchPremiumPrice,
  fetchTokenBuyPrice,
  fetchVTokenToEth,
});
