import {
  estimateTotalPremiumPrice,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '@nftx/utils';
import type {
  MarketplacePrice,
  Provider,
  TokenIds,
  Vault,
  VaultHolding,
} from '@nftx/types';
import { calculateTotalFeePrice } from './common';
import { parseEther } from 'viem';
import { Zero } from '@nftx/constants';
import quoteVaultSwap from './quoteVaultSwap';
import { ValidationError } from '@nftx/errors';

type QuoteVaultSwap = typeof quoteVaultSwap;

const getIndexedPrice = ({
  holdings,
  tokenIds,
  vault,
  now,
  network,
}: {
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  tokenIds: TokenIds;
  vault: Pick<Vault, 'prices' | 'vTokenToEth'>;
  now: number;
  network: number;
}) => {
  const totalTokenIds = getTotalTokenIds(tokenIds);
  const { vTokenToEth } = vault;
  const price = vault.prices?.[totalTokenIds - 1]?.swap;
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
const getRoughPrice = ({
  buyTokenIds,
  holdings,
  vault,
  now,
  network,
}: {
  holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId'>[];
  buyTokenIds: TokenIds;
  vault: Pick<Vault, 'fees' | 'vTokenToEth'>;
  now: number;
  network: number;
}) => {
  const totalTokenIds = getTotalTokenIds(buyTokenIds);
  const { vTokenToEth } = vault;
  const buyAmount = parseEther(`${totalTokenIds}`);

  const feePrice = calculateTotalFeePrice(
    vault.fees.swapFee,
    vTokenToEth,
    buyAmount
  );
  const [, premiumPrice] = estimateTotalPremiumPrice({
    holdings,
    tokenIds: buyTokenIds,
    vTokenToEth,
    now,
    network,
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
  ({ quoteVaultSwap }: { quoteVaultSwap: QuoteVaultSwap }) =>
  async ({
    network,
    provider,
    buyTokenIds,
    sellTokenIds,
    holdings: allHoldings,
    vault,
    bypassIndexedPrice,
  }: {
    network: number;
    provider: Provider;
    vault: Pick<
      Vault,
      'vTokenToEth' | 'prices' | 'fees' | 'is1155' | 'id' | 'vaultId' | 'asset'
    >;
    sellTokenIds: TokenIds;
    buyTokenIds: TokenIds;
    holdings: Pick<VaultHolding, 'dateAdded' | 'tokenId' | 'quantity'>[];
    bypassIndexedPrice?: boolean;
  }) => {
    const now = Math.floor(Date.now() / 1000);
    const totalIn = getTotalTokenIds(sellTokenIds);
    const totalOut = getTotalTokenIds(buyTokenIds);
    const totalTokenIds = totalOut;
    const uniqueTokenIds = getUniqueTokenIds(buyTokenIds);
    const holdings = allHoldings.filter((x) =>
      uniqueTokenIds.includes(x.tokenId)
    );

    ValidationError.validate({
      buyTokenIds: () => {
        if (!totalOut) {
          return 'Required';
        }
        if (totalIn && totalIn !== totalOut) {
          return 'You must redeem the same amount of items as you are minting';
        }
      },
      sellTokenIds: () => !!totalIn || 'Required',
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
          return quoteVaultSwap({
            buyTokenIds,
            holdings: allHoldings,
            network,
            provider,
            sellTokenIds,
            userAddress: '0x',
            vault,
          });
        }
      }
    }

    if (bypassIndexedPrice !== true && totalTokenIds <= 5) {
      const result = getIndexedPrice({
        holdings,
        tokenIds: buyTokenIds,
        vault,
        now,
        network,
      });
      if (result) {
        return result;
      }
    }

    return getRoughPrice({ holdings, buyTokenIds, vault, now, network });
  };

const priceVaultSwap = makePriceVaultSwap({ quoteVaultSwap });

export default priceVaultSwap;
