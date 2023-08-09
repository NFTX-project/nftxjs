import { fetchTokenSellPrice, getTotalTokenIds } from '@nftx/trade';
import type { MarketplacePrice, Vault } from '@nftx/types';
import { parseEther } from 'viem';
import { calculateTotalFeePrice } from './common';
import { Zero } from '@nftx/constants';

type FetchTokenSellPrice = typeof fetchTokenSellPrice;

const getIndexedPrice = ({
  tokenIds,
  vault,
}: {
  tokenIds: `${number}`[];
  vault: Pick<Vault, 'prices'>;
}) => {
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const price = vault.prices?.[totalTokenIds - 1]?.mint;
  // We don't need to worry about premium pricing on sells
  return price;
};

const getRoughPrice = async ({
  network,
  tokenIds,
  vault,
  fetchTokenSellPrice,
}: {
  network: number;
  tokenIds: `${number}`[];
  vault: Pick<Vault, 'vTokenToEth' | 'id' | 'fees'>;
  fetchTokenSellPrice: FetchTokenSellPrice;
}) => {
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const { vTokenToEth } = vault;
  const sellAmount = parseEther(`${totalTokenIds}`);

  const { price: vTokenPrice } = await fetchTokenSellPrice({
    tokenAddress: vault.id,
    amount: sellAmount,
    network,
  });
  const feePrice = calculateTotalFeePrice(
    vault.fees.mintFee,
    vTokenToEth,
    sellAmount
  );
  const price = vTokenPrice - feePrice;

  const result: MarketplacePrice = {
    type: 'sell',
    price,
    vTokenPrice,
    feePrice,
    premiumPrice: Zero,
  };

  return result;
};

export const makePriceVaultSell =
  ({ fetchTokenSellPrice }: { fetchTokenSellPrice: FetchTokenSellPrice }) =>
  ({
    bypassIndexedPrice,
    network,
    tokenIds,
    vault,
  }: {
    network: number;
    tokenIds: `${number}`[];
    vault: Pick<Vault, 'id' | 'prices' | 'vTokenToEth' | 'fees'>;
    bypassIndexedPrice?: boolean;
  }) => {
    const totalTokenIds = getTotalTokenIds(tokenIds);

    if (bypassIndexedPrice !== true && totalTokenIds <= 5) {
      const result = getIndexedPrice({ tokenIds, vault });
      if (result) {
        return result;
      }
    }

    return getRoughPrice({ network, tokenIds, vault, fetchTokenSellPrice });
  };

export default makePriceVaultSell({ fetchTokenSellPrice });
