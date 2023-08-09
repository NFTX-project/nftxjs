import { getTotalTokenIds } from '@nftx/trade';
import type { MarketplacePrice, Vault, VaultHolding } from '@nftx/types';
import { calculateTotalFeePrice, estimateTotalPremiumPrice } from './common';
import { parseEther } from 'viem';
import { Zero } from '@nftx/constants';

const getIndexedPrice = ({
  holdings,
  tokenIds,
  vault,
  now,
}: {
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  tokenIds: `${number}`[];
  vault: Pick<Vault, 'prices' | 'vTokenToEth'>;
  now: number;
}) => {
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const { vTokenToEth } = vault;
  const price = vault.prices?.[totalTokenIds - 1]?.swap;
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
const getRoughPrice = ({
  buyTokenIds,
  holdings,
  vault,
  now,
}: {
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  buyTokenIds: `${number}`[];
  vault: Pick<Vault, 'fees' | 'vTokenToEth'>;
  now: number;
}) => {
  const totalTokenIds = getTotalTokenIds(buyTokenIds);
  const { vTokenToEth } = vault;
  const buyAmount = parseEther(`${totalTokenIds}`);

  const feePrice = calculateTotalFeePrice(
    vault.fees.swapFee,
    vTokenToEth,
    buyAmount
  );
  const premiumPrice = estimateTotalPremiumPrice({
    holdings,
    tokenIds: buyTokenIds,
    vTokenToEth,
    now,
  });
  const price = feePrice + premiumPrice;

  const result: MarketplacePrice = {
    type: 'swap',
    price,
    vTokenPrice: Zero,
    feePrice,
    premiumPrice,
  };

  return result;
};

export const makePriceVaultSwap =
  () =>
  async ({
    buyTokenIds,
    holdings: allHoldings,
    vault,
    bypassIndexedPrice,
  }: {
    vault: Pick<Vault, 'vTokenToEth' | 'prices' | 'fees'>;
    sellTokenIds: `${number}`[];
    buyTokenIds: `${number}`[];
    holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
    bypassIndexedPrice?: boolean;
  }) => {
    const now = Math.floor(Date.now() / 1000);
    const totalTokenIds = getTotalTokenIds(buyTokenIds);
    const holdings = allHoldings.filter((x) => buyTokenIds.includes(x.tokenId));

    if (bypassIndexedPrice !== true && totalTokenIds <= 5) {
      const result = getIndexedPrice({
        holdings,
        tokenIds: buyTokenIds,
        vault,
        now,
      });
      if (result) {
        return result;
      }
    }

    return getRoughPrice({ holdings, buyTokenIds, vault, now });
  };

export default makePriceVaultSwap();
