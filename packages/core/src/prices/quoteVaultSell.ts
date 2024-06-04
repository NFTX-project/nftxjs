import { MARKETPLACE_ZAP, WeiPerEther, Zero } from '@nftx/constants';
import { fetchAmmQuote, getApproveContracts } from '@nftx/trade';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenIds,
  Vault,
} from '@nftx/types';
import { parseEther } from 'viem';
import {
  fetchVTokenToEth,
  getChainConstant,
  getContract,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
  increaseByPercentage,
} from '@nftx/utils';
import { calculateFeePricePerItem, calculateTotalFeePrice } from './common';
import { MintFeeExceedsValueError, ValidationError } from '@nftx/errors';
import { MarketplaceZap } from '@nftx/abi';

type FetchAmmQuote = typeof fetchAmmQuote;
type FetchVTokenToEth = typeof fetchVTokenToEth;

export const makeQuoteVaultSell =
  ({
    fetchAmmQuote,
    fetchVTokenToEth,
  }: {
    fetchVTokenToEth: FetchVTokenToEth;
    fetchAmmQuote: FetchAmmQuote;
  }) =>
  async ({
    network,
    provider,
    tokenIds,
    userAddress,
    vault,
    slippagePercentage,
    bypassLiquidityCheck,
  }: {
    vault: Pick<Vault, 'id' | 'fees' | 'asset' | 'vaultId' | 'is1155'>;
    network: number;
    tokenIds: TokenIds;
    userAddress: Address;
    provider: Provider;
    slippagePercentage?: number;
    bypassLiquidityCheck?: boolean;
  }) => {
    const totalTokenIds = getTotalTokenIds(tokenIds);
    const sellAmount = parseEther(`${totalTokenIds}`);
    const tokenIdsIn = getUniqueTokenIds(tokenIds);
    const amountsIn = getTokenIdAmounts(tokenIds);

    ValidationError.validate({
      tokenIds: () => !!totalTokenIds || 'Required',
      userAddress: () => !!userAddress || 'Required',
    });

    const vTokenToEth = await fetchVTokenToEth({
      provider,
      vaultAddress: vault.id,
    });

    const {
      price: vTokenPrice,
      route,
      routeString,
      methodParameters: { executeCalldata },
    } = await fetchAmmQuote({
      sellToken: vault.id,
      sellAmount,
      buyToken: 'WETH',
      network,
      userAddress: getChainConstant(MARKETPLACE_ZAP, network),
      slippagePercentage,
      throwOnError: !bypassLiquidityCheck,
    });
    const vTokenPricePerItem = (vTokenPrice * WeiPerEther) / sellAmount;

    const feePricePerItem = calculateFeePricePerItem(
      vault.fees.mintFee,
      vTokenToEth
    );
    const feePrice = calculateTotalFeePrice(
      vault.fees.mintFee,
      vTokenToEth,
      sellAmount
    );

    const price = vTokenPrice - feePrice;

    if (price < Zero) {
      throw new MintFeeExceedsValueError();
    }

    const items = tokenIdsIn.map((tokenId, i) => {
      const amount = amountsIn[i];
      const item: MarketplaceQuote['items'][0] = {
        tokenId,
        amount,
        vTokenPrice: vTokenPricePerItem * BigInt(amount),
        feePrice: feePricePerItem * BigInt(amount),
        premiumPrice: Zero,
        premiumLimit: Zero,
      };

      return item;
    });

    const standard = vault.is1155 ? 'ERC1155' : 'ERC721';

    const approveContracts = getApproveContracts({
      network,
      label: `Approve ${vault.asset.name}`,
      spenderAddress: getChainConstant(MARKETPLACE_ZAP, network),
      tokenAddress: vault.asset.id,
      standard,
      tokenIds: tokenIdsIn,
    });

    const value = increaseByPercentage(feePrice, slippagePercentage);

    let estimatedGas = Zero;
    try {
      const contract = getContract({
        abi: MarketplaceZap,
        address: getChainConstant(MARKETPLACE_ZAP, network),
        provider,
      });
      const { gasEstimate } = await (standard === 'ERC1155'
        ? contract.estimate.sell1155({
            account: userAddress,
            args: [
              BigInt(vault.vaultId),
              tokenIdsIn.map(BigInt),
              amountsIn.map(BigInt),
              executeCalldata,
              userAddress,
              false,
            ],
          })
        : contract.estimate.sell721({
            account: userAddress,
            args: [
              BigInt(vault.vaultId),
              tokenIdsIn.map(BigInt),
              executeCalldata,
              userAddress,
              false,
            ],
          }));
      estimatedGas = gasEstimate;
    } catch {
      // Could not estimate gas
    }

    const result: MarketplaceQuote = {
      type: 'sell',
      price,
      vTokenPrice,
      feePrice,
      premiumPrice: Zero,
      route,
      routeString,
      items,
      estimatedGas,
      approveContracts,
      methodParameters: {
        executeCalldata,
        to: userAddress,
        tokenIdsIn,
        amountsIn,
        tokenIdsOut: [],
        amountsOut: [],
        value: value.toString(),
        vaultAddress: vault.id,
        vaultId: vault.vaultId,
        standard,
        premiumLimit: '',
      },
    };

    return result;
  };

const quoteVaultSell = makeQuoteVaultSell({
  fetchAmmQuote,
  fetchVTokenToEth,
});

export default quoteVaultSell;
