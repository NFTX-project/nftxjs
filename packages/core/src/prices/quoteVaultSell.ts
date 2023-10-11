import { MARKETPLACE_ZAP, WeiPerEther, Zero } from '@nftx/constants';
import { fetchTokenSellPrice } from '@nftx/trade';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
} from '@nftx/types';
import { parseEther } from 'viem';
import {
  fetchVTokenToEth,
  getChainConstant,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/utils';
import {
  calculateFeePricePerItem,
  calculateTotalFeePrice,
  getApproveContracts,
} from './common';
import { ValidationError } from '@nftx/errors';

type FetchTokenSellPrice = typeof fetchTokenSellPrice;
type FetchVTokenToEth = typeof fetchVTokenToEth;

export const makeQuoteVaultSell =
  ({
    fetchTokenSellPrice,
    fetchVTokenToEth,
  }: {
    fetchVTokenToEth: FetchVTokenToEth;
    fetchTokenSellPrice: FetchTokenSellPrice;
  }) =>
  async ({
    network,
    provider,
    tokenIds,
    userAddress,
    vault,
  }: {
    vault: Pick<Vault, 'id' | 'fees' | 'asset' | 'vaultId' | 'is1155'>;
    network: number;
    tokenIds: TokenId[] | [TokenId, number][];
    userAddress: Address;
    provider: Provider;
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
      methodParameters: { calldata: executeCalldata },
    } = await fetchTokenSellPrice({
      tokenAddress: vault.id,
      amount: sellAmount,
      network,
      userAddress: getChainConstant(MARKETPLACE_ZAP, network),
      quote: 'WETH',
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
      vault,
      tokenIds: tokenIdsIn,
      spender: getChainConstant(MARKETPLACE_ZAP, network),
    });

    const result: MarketplaceQuote = {
      type: 'sell',
      price,
      vTokenPrice,
      feePrice,
      premiumPrice: Zero,
      items,
      approveContracts,
      methodParameters: {
        executeCalldata,
        to: userAddress,
        tokenIdsIn,
        amountsIn,
        tokenIdsOut: [],
        amountsOut: [],
        value: feePrice.toString(),
        vaultAddress: vault.id,
        vaultId: vault.vaultId,
        standard,
        premiumLimit: '',
      },
    };

    return result;
  };

export default makeQuoteVaultSell({ fetchTokenSellPrice, fetchVTokenToEth });
