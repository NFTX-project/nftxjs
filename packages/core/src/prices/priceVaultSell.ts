import { fetchAmmQuote } from '@nftx/trade';
import type { MarketplacePrice, TokenIds, Vault } from '@nftx/types';
import { parseEther } from 'viem';
import { calculateTotalFeePrice } from './common';
import { Zero } from '@nftx/constants';
import { getTotalTokenIds } from '@nftx/utils';
import {
  InsufficientLiquidityError,
  MintFeeExceedsValueError,
  ValidationError,
} from '@nftx/errors';

type FetchAmmQuote = typeof fetchAmmQuote;

const checkLiquidity = (price: MarketplacePrice) => {
  if (!price.vTokenPrice) {
    throw new InsufficientLiquidityError();
  }
  if (price.price < Zero) {
    throw new MintFeeExceedsValueError();
  }
};

const getIndexedPrice = ({
  tokenIds,
  vault,
  bypassLiquidityCheck,
}: {
  tokenIds: TokenIds;
  vault: Pick<Vault, 'prices'>;
  bypassLiquidityCheck: boolean | undefined;
}) => {
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const price = vault.prices?.[totalTokenIds - 1]?.mint;
  // We don't need to worry about premium pricing on sells
  // Check the price has enough liquidity
  if (price && !bypassLiquidityCheck) {
    checkLiquidity(price);
  }
  return price;
};

const getRoughPrice = async ({
  network,
  tokenIds,
  vault,
  bypassLiquidityCheck,
  fetchAmmQuote,
}: {
  network: number;
  tokenIds: TokenIds;
  vault: Pick<Vault, 'vTokenToEth' | 'id' | 'fees'>;
  bypassLiquidityCheck: boolean | undefined;
  fetchAmmQuote: FetchAmmQuote;
}) => {
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const { vTokenToEth } = vault;
  const sellAmount = parseEther(`${totalTokenIds}`);

  const {
    price: vTokenPrice,
    route,
    routeString,
  } = await fetchAmmQuote({
    sellToken: vault.id,
    sellAmount,
    buyToken: 'ETH',
    network,
    throwOnError: !bypassLiquidityCheck,
  });
  const feePrice = calculateTotalFeePrice(
    vault.fees.mintFee,
    vTokenToEth,
    sellAmount
  );
  const price = vTokenPrice - feePrice;

  const result: MarketplacePrice = {
    type: 'sell',
    // The total amount of ETH you'll receive (vToken sale, less fees)
    price,
    // The amount of ETH you'll get for selling the vToken
    vTokenPrice,
    // The amount of ETH you'll pay in fees
    feePrice,
    // There is never any premium price for selling
    premiumPrice: Zero,
    route,
    routeString,
  };

  // Check the price has enough liquidity
  if (!bypassLiquidityCheck) {
    checkLiquidity(result);
  }

  return result;
};

export const makePriceVaultSell =
  ({ fetchAmmQuote }: { fetchAmmQuote: FetchAmmQuote }) =>
  async ({
    bypassIndexedPrice,
    network,
    tokenIds,
    vault,
    bypassLiquidityCheck,
  }: {
    network: number;
    tokenIds: TokenIds;
    vault: Pick<Vault, 'id' | 'prices' | 'vTokenToEth' | 'fees'>;
    bypassIndexedPrice?: boolean;
    bypassLiquidityCheck?: boolean;
  }) => {
    const totalTokenIds = getTotalTokenIds(tokenIds);

    ValidationError.validate({
      tokenIds: () => !!totalTokenIds || 'Required',
    });

    if (bypassIndexedPrice !== true && totalTokenIds <= 5) {
      const result = getIndexedPrice({ tokenIds, vault, bypassLiquidityCheck });
      if (result) {
        return result;
      }
    }

    return getRoughPrice({
      network,
      tokenIds,
      vault,
      fetchAmmQuote,
      bypassLiquidityCheck,
    });
  };

export default makePriceVaultSell({ fetchAmmQuote });
