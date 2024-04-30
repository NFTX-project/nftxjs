import { fetchAmmQuote } from '@nftx/trade';
import type {
  MarketplacePrice,
  Provider,
  TokenIds,
  Vault,
  VaultHolding,
} from '@nftx/types';
import { parseEther } from 'viem';
import { calculateTotalFeePrice } from './common';
import quoteVaultBuy from './quoteVaultBuy';
import {
  estimateTotalPremiumPrice,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/utils';
import { InsufficientLiquidityError, ValidationError } from '@nftx/errors';

type FetchAmmQuote = typeof fetchAmmQuote;
type QuoteVaultBuy = typeof quoteVaultBuy;

const checkLiquidity = <P extends { vTokenPrice: bigint }>(price: P) => {
  if (!price.vTokenPrice) {
    throw new InsufficientLiquidityError();
  }
  return price;
};

const getIndexedPrice = ({
  holdings,
  tokenIds,
  vault,
  now,
  network,
}: {
  vault: Pick<Vault, 'vTokenToEth' | 'prices'>;
  tokenIds: TokenIds;
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  now: number;
  network: number;
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
  const [, premiumPrice] = estimateTotalPremiumPrice({
    holdings,
    tokenIds,
    vTokenToEth,
    now,
    network,
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
  fetchAmmQuote,
  now,
}: {
  tokenIds: TokenIds;
  holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded'>[];
  vault: Pick<Vault, 'vTokenToEth' | 'fees' | 'id'>;
  network: number;
  fetchAmmQuote: FetchAmmQuote;
  now: number;
}) => {
  // Calculate the price manually
  // This doesn't need to be as accurate and up-to-the-block accurate as a quote
  // So we can use a couple of shortcuts and avoid api/web3 calls
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const { vTokenToEth } = vault;
  const buyAmount = parseEther(`${totalTokenIds}`);

  const {
    price: vTokenPrice,
    route,
    routeString,
  } = await fetchAmmQuote({
    network,
    buyToken: vault.id,
    buyAmount,
    sellToken: 'ETH',
  });
  const feePrice = calculateTotalFeePrice(
    vault.fees.redeemFee,
    vTokenToEth,
    buyAmount
  );
  const [, premiumPrice] = estimateTotalPremiumPrice({
    holdings,
    tokenIds,
    vTokenToEth,
    now,
    network,
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
    route,
    routeString,
  };

  return result;
};

export const makePriceVaultBuy =
  ({
    fetchAmmQuote,
    quoteVaultBuy,
  }: {
    fetchAmmQuote: FetchAmmQuote;
    quoteVaultBuy: QuoteVaultBuy;
  }) =>
  async ({
    network,
    tokenIds,
    vault,
    bypassIndexedPrice,
    holdings: allHoldings,
    provider,
  }: {
    network: number;
    tokenIds: TokenIds;
    vault: Pick<
      Vault,
      'prices' | 'vTokenToEth' | 'fees' | 'id' | 'is1155' | 'vaultId'
    >;
    bypassIndexedPrice?: boolean;
    holdings: Pick<VaultHolding, 'tokenId' | 'dateAdded' | 'quantity'>[];
    provider: Provider;
  }): Promise<MarketplacePrice> => {
    const now = Math.floor(Date.now() / 1000);
    const totalTokenIds = getTotalTokenIds(tokenIds);
    const uniqueTokenIds = getUniqueTokenIds(tokenIds);
    const holdings = allHoldings.filter((x) =>
      uniqueTokenIds.includes(x.tokenId)
    );

    ValidationError.validate({
      tokenIds: () => !!totalTokenIds || 'Required',
    });

    if (vault.is1155) {
      // If we've been given dummy token ids that don't match actual vault holdings
      // We a) can't get a quote, and b) don't care about premiums
      if (holdings.length) {
        // If there aren't any holdings with more than 1 item then actually it doesn't matter
        if (holdings.some((x) => x.quantity > 1n)) {
          // For ERC1155s we don't have any way to determine the premium of an asset when
          // there are multiple items per token id.
          // The simplest solution is to instead fire off an on-chain quote.
          return quoteVaultBuy({
            holdings: allHoldings,
            provider,
            tokenIds,
            userAddress: '0x',
            vault,
            network,
          }).then(checkLiquidity);
        }
      }
    }

    if (bypassIndexedPrice !== true && totalTokenIds <= 5) {
      const result = getIndexedPrice({
        holdings,
        tokenIds,
        vault,
        now,
        network,
      });
      if (result) {
        return checkLiquidity(result);
      }
    }

    return getRoughPrice({
      holdings,
      network,
      tokenIds,
      vault,
      fetchAmmQuote: fetchAmmQuote,
      now,
    }).then(checkLiquidity);
  };

const priceVaultBuy = makePriceVaultBuy({
  fetchAmmQuote,
  quoteVaultBuy,
});

export default priceVaultBuy;
