import { getTotalTokenIds } from '@nftx/trade';
import type { MarketplacePrice, Vault, VaultHolding } from '@nftx/types';
import { calculateTotalFeePrice, estimateTotalPremiumPrice } from './utils';
import { parseEther } from 'viem';
import { Zero } from '@nftx/constants';

const getIndexedPrice = ({
  holdings,
  tokenIds,
  vault,
}: {
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  tokenIds: `${number}`[];
  vault: Pick<Vault, 'prices' | 'vTokenToEth'>;
}) => {
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
}: {
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  buyTokenIds: `${number}`[];
  vault: Pick<Vault, 'fees' | 'vTokenToEth'>;
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

const priceVaultSwap = async ({
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
  const totalTokenIds = getTotalTokenIds(buyTokenIds);
  const holdings = allHoldings.filter((x) => buyTokenIds.includes(x.tokenId));

  if (bypassIndexedPrice !== true && totalTokenIds <= 5) {
    const result = getIndexedPrice({ holdings, tokenIds: buyTokenIds, vault });
    if (result) {
      return result;
    }
  }

  return getRoughPrice({ holdings, buyTokenIds, vault });
};

export default priceVaultSwap;
