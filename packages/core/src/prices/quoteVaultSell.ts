import { MARKETPLACE_ZAP, PERMIT2, WeiPerEther, Zero } from '@nftx/constants';
import { fetchTokenSellPrice } from '@nftx/trade';
import type {
  Address,
  MarketplaceQuote,
  Provider,
  TokenId,
  Vault,
} from '@nftx/types';
import { parseEther } from 'viem';
import fetchVTokenToEth from '../vaults/fetchVaults/fetchVTokenToEth';
import {
  getChainConstant,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/utils';
import { calculateFeePricePerItem, calculateTotalFeePrice } from './common';

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
      userAddress,
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
      };

      return item;
    });

    const standard = vault.is1155 ? 'ERC1155' : 'ERC721';

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
      },
    };

    return result;
  };

export default makeQuoteVaultSell({ fetchTokenSellPrice, fetchVTokenToEth });
