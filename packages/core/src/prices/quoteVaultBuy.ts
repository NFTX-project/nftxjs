import { MARKETPLACE_ZAP, WeiPerEther, Zero } from '@nftx/constants';
import { fetchTokenBuyPrice } from '@nftx/trade';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
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
import config from '@nftx/config';
import {
  calculateFeePricePerItem,
  calculateTotalFeePrice,
  getHoldingByTokenId,
  fetchPremiumPrice,
  calculateTotalPremiumPrice,
} from './common';
import { ValidationError } from '@nftx/errors';
import { MarketplaceZap } from '@nftx/abi';

type FetchTokenBuyPrice = typeof fetchTokenBuyPrice;
type FetchVTokenToEth = typeof fetchVTokenToEth;
type FetchPremiumPrice = typeof fetchPremiumPrice;

const transformItem = async ({
  network,
  buyAmount,
  holdings,
  provider,
  tokenId,
  amount,
  vTokenPrice,
  vTokenToEth,
  vault,
  fetchPremiumPrice,
}: {
  network: number;
  holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded'>[];
  tokenId: TokenId;
  amount: number;
  provider: Provider;
  vault: Pick<Vault, 'vaultId' | 'fees' | 'is1155'>;
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
  const [premiumLimit, premiumPrice] = await fetchPremiumPrice({
    holding,
    provider,
    tokenId,
    amount,
    vTokenToEth,
    network,
    standard: vault.is1155 ? 'ERC1155' : 'ERC721',
    vaultId: vault.vaultId,
  });

  return {
    tokenId,
    amount,
    premiumPrice,
    premiumLimit,
    feePrice: feePricePerItem * BigInt(amount),
    vTokenPrice: vTokenPricePerItem * BigInt(amount),
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
    slippagePercentage,
  }: {
    vault: Pick<Vault, 'fees' | 'id' | 'vaultId' | 'is1155'>;
    tokenIds: TokenId[] | [TokenId, number][];
    network?: number;
    userAddress: Address;
    provider: Provider;
    holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
    slippagePercentage?: number;
  }) => {
    const totalTokenIds = getTotalTokenIds(tokenIds);
    const buyAmount = parseEther(`${totalTokenIds}`);
    const tokenIdsOut = getUniqueTokenIds(tokenIds);
    const amountsOut = getTokenIdAmounts(tokenIds);

    ValidationError.validate({
      tokenIds: () => !!totalTokenIds || 'Required',
      userAddress: () => !!userAddress || 'Required',
    });

    const holdings = allHoldings.filter((x) => tokenIdsOut.includes(x.tokenId));

    const vTokenToEth = await fetchVTokenToEth({
      provider,
      vaultAddress: vault.id,
    });

    const {
      price: vTokenPrice,
      route,
      routeString,
      methodParameters: { calldata: executeCalldata },
    } = await fetchTokenBuyPrice({
      network,
      tokenAddress: vault.id,
      amount: buyAmount,
      userAddress: getChainConstant(MARKETPLACE_ZAP, network),
      quote: 'WETH',
      slippagePercentage,
    });

    const items = await Promise.all(
      tokenIdsOut.map(async (tokenId, i) => {
        return transformItem({
          buyAmount,
          holdings,
          provider,
          tokenId,
          vault,
          vTokenPrice,
          vTokenToEth,
          amount: amountsOut[i],
          network,
          fetchPremiumPrice,
        });
      })
    );

    const [premiumLimit, premiumPrice] = calculateTotalPremiumPrice(items);
    const feePrice = calculateTotalFeePrice(
      vault.fees.redeemFee,
      vTokenToEth,
      buyAmount
    );
    const price = vTokenPrice + premiumPrice + feePrice;
    const value = increaseByPercentage(price, slippagePercentage);

    let estimatedGas = Zero;
    try {
      const { gasEstimate } = await getContract({
        abi: MarketplaceZap,
        address: getChainConstant(MARKETPLACE_ZAP, network),
        provider,
      }).estimate.buyNFTsWithETH({
        account: userAddress,
        args: [
          BigInt(vault.vaultId),
          getExactTokenIds(zipTokenIds(tokenIdsOut, amountsOut)).map(BigInt),
          executeCalldata,
          userAddress,
          premiumLimit,
          false,
        ],
        value,
      });
      estimatedGas = gasEstimate;
    } catch {
      // Could not estimate gas
    }

    const result: MarketplaceQuote = {
      type: 'buy',
      price,
      vTokenPrice,
      feePrice,
      premiumPrice,
      route,
      routeString,
      approveContracts: [],
      items,
      estimatedGas,
      methodParameters: {
        value: value.toString(),
        executeCalldata,
        to: userAddress,
        tokenIdsIn: [],
        amountsIn: [],
        tokenIdsOut,
        amountsOut,
        premiumLimit: premiumLimit.toString(),
        vaultAddress: vault.id,
        vaultId: vault.vaultId,
        standard: vault.is1155 ? 'ERC1155' : 'ERC721',
      },
    };

    return result;
  };

const quoteVaultBuy = makeQuoteVaultBuy({
  fetchPremiumPrice,
  fetchTokenBuyPrice,
  fetchVTokenToEth,
});

export default quoteVaultBuy;
