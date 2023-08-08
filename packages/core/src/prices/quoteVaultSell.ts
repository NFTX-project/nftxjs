import { MARKETPLACE_ZAP, PERMIT2, WeiPerEther, Zero } from '@nftx/constants';
import {
  fetchTokenSellPrice,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/trade';
import type { Address, MarketplaceQuote, Provider, Vault } from '@nftx/types';
import { parseEther } from 'viem';
import fetchVTokenToEth from '../vaults/fetchVaults/fetchVTokenToEth';
import { getChainConstant } from '@nftx/utils';
import { calculateFeePricePerItem, calculateTotalFeePrice } from './utils';

const quoteVaultSell = async ({
  network,
  provider,
  tokenIds,
  userAddress,
  vault,
}: {
  vault: Pick<Vault, 'id' | 'fees' | 'asset' | 'vaultId'>;
  network: number;
  tokenIds: `${number}`[];
  userAddress: Address;
  provider: Provider;
}) => {
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const sellAmount = parseEther(`${totalTokenIds}`);
  const tokenIdsIn = getUniqueTokenIds(tokenIds);

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
    vTokenPrice,
    sellAmount
  );

  const price = vTokenPrice - feePrice;

  const items = tokenIdsIn.map((tokenId) => {
    const item: MarketplaceQuote['items'][0] = {
      tokenId,
      vTokenPrice: vTokenPricePerItem,
      feePrice: feePricePerItem,
      premiumPrice: Zero,
    };

    return item;
  });

  const approveContracts: MarketplaceQuote['approveContracts'] = [
    {
      tokenAddress: vault.asset.id,
      spenderAddress: getChainConstant(MARKETPLACE_ZAP, network),
      // TODO: 1155?
      standard: 'ERC721',
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
      tokenIdsOut: [],
      value: feePrice.toString(),
      vaultAddress: vault.id,
      vaultId: vault.vaultId,
    },
  };

  return result;
};

export default quoteVaultSell;
