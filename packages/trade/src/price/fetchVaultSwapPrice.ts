import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Price, Vault } from '@nftx/types';
import calculateSwapFee from './calculateSwapFee';
import fetchBuyPrice from './fetchBuyPrice';

/**
 * Fetches the swap price for a vault.
 */
const fetchVaultSwapPrice = async (args: {
  network?: number;
  provider: Provider;
  vault: Pick<Vault, 'id'> & {
    fees: Pick<Vault['fees'], 'randomSwapFee' | 'targetSwapFee'>;
  };
  targetSwaps?: number;
  randomSwaps?: number;
  critical?: boolean;
}): Promise<Price> => {
  const {
    network = config.network,
    provider,
    vault,
    targetSwaps,
    randomSwaps,
    critical,
  } = args;

  /** For swaps the price is purely for the swap fee
   * so we just have to work out the total fees for the intended target/random counts
   */
  const amount = calculateSwapFee({ vault, randomSwaps, targetSwaps });

  // No fees for this vault
  if (amount.isZero()) {
    return { price: amount };
  }

  return fetchBuyPrice({
    network,
    provider,
    tokenAddress: vault.id,
    quote: 'ETH',
    amount,
    critical,
  });
};

export default fetchVaultSwapPrice;
