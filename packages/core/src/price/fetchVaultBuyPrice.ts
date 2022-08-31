import { WeiPerEther, Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import config from '@nftx/config';
import type { Vault } from '../vaults';
import calculateBuyFee from './calculateBuyFee';
import fetchBuyPrice from './fetchBuyPrice';
import type { Price } from './types';

/** Fetches the buy price for a vault
 * Accounts for vault fees and buying multiple targets/randoms
 */
const fetchVaultBuyPrice = async ({
  vault,
  network = config.network,
  provider,
  targetBuys,
  randomBuys,
  critical,
}: {
  vault: Pick<Vault, 'id' | 'reserveVtoken'> & {
    fees: Pick<Vault['fees'], 'randomRedeemFee' | 'targetRedeemFee'>;
    features: Pick<
      Vault['features'],
      'enableRandomRedeem' | 'enableTargetRedeem'
    >;
  };
  network?: number;
  provider: Provider;
  /** The number of target buys we are doing */
  targetBuys?: number;
  /** The number of random buys we are doing */
  randomBuys?: number;
  critical?: boolean;
}): Promise<Price> => {
  const fee = calculateBuyFee({ vault, randomBuys, targetBuys });

  let amount = fee;

  if (targetBuys || randomBuys) {
    if (targetBuys) {
      amount = amount.add(parseEther(`${targetBuys}`));
    }
    if (randomBuys) {
      amount = amount.add(parseEther(`${randomBuys}`));
    }
  } else {
    amount = amount.add(WeiPerEther);
  }

  const hasLiquidity = vault.reserveVtoken.gt(amount);

  // You can't buy anything if there isn't enough liquidity in the pool
  if (!hasLiquidity) {
    return { price: Zero };
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

export default fetchVaultBuyPrice;
