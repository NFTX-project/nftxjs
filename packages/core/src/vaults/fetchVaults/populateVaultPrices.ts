import type { Provider, TokenId, Vault, VaultHolding } from '@nftx/types';
import { priceVaultBuy, priceVaultSell, priceVaultSwap } from '../../prices';

const PRICE_COUNT = 5;

const populateVault__Prices = async (
  key: 'redeem' | 'mint' | 'swap',
  vault: Vault,
  cb: (args: { tokenIds: TokenId[] }) => Promise<Vault['prices'][0]['mint']>
) => {
  for (let i = 0; i < PRICE_COUNT; i++) {
    try {
      const tokenIds = new Array(i + 1)
        .fill(null)
        .map((_, i) => `999${i}` as `${number}`);

      const price = await cb({
        tokenIds,
      });

      vault.prices[i][key] = price;
    } catch (e) {
      console.warn(
        `Couldn't get ${key} price [${i}] for vault ${vault.vaultId}`
      );
      console.warn(e);
      return;
    }
  }
};

const populateVaultBuyPrices = async (
  vault: Vault,
  network: number,
  holdings: VaultHolding[],
  provider: Provider
) => {
  await populateVault__Prices('redeem', vault, ({ tokenIds }) =>
    priceVaultBuy({
      holdings,
      network,
      provider,
      tokenIds,
      vault,
      bypassIndexedPrice: true,
    })
  );
};

const populateVaultSellPrices = async (vault: Vault, network: number) => {
  await populateVault__Prices('mint', vault, async ({ tokenIds }) =>
    priceVaultSell({ network, tokenIds, vault, bypassIndexedPrice: true })
  );
};

const populateVaultSwaprices = async (
  vault: Vault,
  network: number,
  holdings: VaultHolding[],
  provider: Provider
) => {
  await populateVault__Prices('swap', vault, ({ tokenIds }) =>
    priceVaultSwap({
      buyTokenIds: tokenIds,
      holdings,
      network,
      provider,
      sellTokenIds: tokenIds,
      vault,
      bypassIndexedPrice: true,
    })
  );
};

const populateVaultPrices = async (
  vault: Vault,
  network: number,
  holdings: VaultHolding[],
  provider: Provider
) => {
  await populateVaultBuyPrices(vault, network, holdings, provider);
  await populateVaultSellPrices(vault, network);
  await populateVaultSwaprices(vault, network, holdings, provider);
};

export default populateVaultPrices;
