import { fetchTokenBuyPrice, getTotalTokenIds } from '@nftx/trade';
import type { MarketplacePrice, Vault, VaultHolding } from '@nftx/types';
import { parseEther } from 'viem';
import { calculateTotalFeePrice, estimateTotalPremiumPrice } from './common';

type FetchTokenBuyPrice = typeof fetchTokenBuyPrice;

const getIndexedPrice = ({
  holdings,
  tokenIds,
  vault,
  now,
}: {
  vault: Pick<Vault, 'vTokenToEth' | 'prices'>;
  tokenIds: `${number}`[];
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  now: number;
}) => {
  // We store the prices for buying up to 5 NFTs
  // so we can save ourselves from having to make additional calls/calculations
  // We just pull out the stored price, and add a premium if necessary
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const { vTokenToEth } = vault;
  const price = vault.prices?.[totalTokenIds - 1]?.redeem;
  if (!price) {
    return;
  }
  const premiumPrice = estimateTotalPremiumPrice({
    holdings,
    tokenIds,
    vTokenToEth,
    now,
  });

  return {
    ...price,
    premiumPrice,
    price: price.price + premiumPrice,
  };
};

const getRoughPrice = async ({
  holdings,
  network,
  tokenIds,
  vault,
  fetchTokenBuyPrice,
  now,
}: {
  tokenIds: `${number}`[];
  holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded'>[];
  vault: Pick<Vault, 'vTokenToEth' | 'fees' | 'id'>;
  network: number;
  fetchTokenBuyPrice: FetchTokenBuyPrice;
  now: number;
}) => {
  // Calculate the price manually
  // This doesn't need to be as accurate and up-to-the-block accurate as a quote
  // So we can use a couple of shortcuts and avoid api/web3 calls
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const { vTokenToEth } = vault;
  const buyAmount = parseEther(`${totalTokenIds}`);

  const { price: vTokenPrice } = await fetchTokenBuyPrice({
    network,
    tokenAddress: vault.id,
    amount: buyAmount,
  });
  const feePrice = calculateTotalFeePrice(
    vault.fees.redeemFee,
    vTokenToEth,
    buyAmount
  );
  const premiumPrice = estimateTotalPremiumPrice({
    holdings,
    tokenIds,
    vTokenToEth,
    now,
  });

  const price = vTokenPrice + feePrice + premiumPrice;

  const result: MarketplacePrice = {
    type: 'buy',
    // The total amount of ETH you'll pay
    price,
    // The amount of ETH you'll pay to buy vToken
    vTokenPrice,
    // The amount of ETH you'll pay in fees
    feePrice,
    // The amount of ETH you'll pay in premiums
    premiumPrice,
  };

  return result;
};

export const makePriceVaultBuy =
  ({ fetchTokenBuyPrice }: { fetchTokenBuyPrice: FetchTokenBuyPrice }) =>
  async ({
    network,
    tokenIds,
    vault,
    bypassIndexedPrice,
    holdings: allHoldings,
  }: {
    network: number;
    tokenIds: `${number}`[];
    vault: Pick<Vault, 'prices' | 'vTokenToEth' | 'fees' | 'id'>;
    bypassIndexedPrice?: boolean;
    holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded'>[];
  }): Promise<MarketplacePrice> => {
    const now = Math.floor(Date.now() / 1000);
    const totalTokenIds = getTotalTokenIds(tokenIds);
    const holdings = allHoldings.filter((x) => tokenIds.includes(x.tokenId));

    if (bypassIndexedPrice !== true && totalTokenIds <= 5) {
      const result = getIndexedPrice({ holdings, tokenIds, vault, now });
      if (result) {
        return result;
      }
    }

    return getRoughPrice({
      holdings,
      network,
      tokenIds,
      vault,
      fetchTokenBuyPrice,
      now,
    });
  };

export default makePriceVaultBuy({ fetchTokenBuyPrice });
