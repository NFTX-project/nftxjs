import type { Provider, TokenId, Vault, VaultHolding } from '@nftx/types';
import { priceVaultBuy, priceVaultSell, priceVaultSwap } from '../../prices';

type PriceVaultBuy = typeof priceVaultBuy;
type PriceVaultSell = typeof priceVaultSell;
type PriceVaultSwap = typeof priceVaultSwap;

// Basically we want to get the buy/sell/swap prices for 1-5 items

const PRICE_COUNT = 5;

const populateVaultXPrices = async ({
  fetchPrice,
  key,
  vault,
}: {
  key: 'redeem' | 'mint' | 'swap';
  vault: Vault;
  fetchPrice: (args: {
    tokenIds: TokenId[];
  }) => Promise<Vault['prices'][0]['mint']>;
}) => {
  for (let i = 0; i < PRICE_COUNT; i++) {
    try {
      // Generate some duff tokenIDs, 9991, 9992, 9993, etc.
      // There is the potential that these tokenIDs could be real and in the vault
      const tokenIds = new Array(i + 1)
        .fill(null)
        .map((_, i) => `999${i}` as `${number}`);

      const price = await fetchPrice({
        tokenIds,
      });

      vault.prices[i][key] = price;
    } catch (e) {
      // If the price calc fails, we'll just let it fall back to the default price (0)
      // There are many, many reasons why it might fail. The pricing API could be down,
      // there could be insufficient liquidity, etc.
      console.warn(
        `Couldn't get ${key} price [${i}] for vault ${vault.vaultId}`
      );
      console.warn(e);
      return;
    }
  }
};

export const makePopulateVaultPrices =
  ({
    priceVaultBuy,
    priceVaultSell,
    priceVaultSwap,
  }: {
    priceVaultBuy: PriceVaultBuy;
    priceVaultSell: PriceVaultSell;
    priceVaultSwap: PriceVaultSwap;
  }) =>
  async (
    vault: Vault,
    network: number,
    holdings: VaultHolding[],
    provider: Provider
  ) => {
    await populateVaultXPrices({
      key: 'redeem',
      vault,
      fetchPrice: ({ tokenIds }) =>
        priceVaultBuy({
          holdings,
          network,
          provider,
          tokenIds,
          vault,
          bypassIndexedPrice: true,
        }),
    });

    await populateVaultXPrices({
      key: 'mint',
      vault,
      fetchPrice: ({ tokenIds }) =>
        priceVaultSell({ network, tokenIds, vault, bypassIndexedPrice: true }),
    });

    await populateVaultXPrices({
      key: 'swap',
      vault,
      fetchPrice: ({ tokenIds }) =>
        priceVaultSwap({
          buyTokenIds: tokenIds,
          holdings,
          network,
          provider,
          sellTokenIds: tokenIds,
          vault,
          bypassIndexedPrice: true,
        }),
    });
  };

const populateVaultPrices = makePopulateVaultPrices({
  priceVaultBuy,
  priceVaultSell,
  priceVaultSwap,
});

export default populateVaultPrices;
