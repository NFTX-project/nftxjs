import { WeiPerEther, Zero } from '@ethersproject/constants';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Vault } from '../vaults';
import fetchBuyPrice from './fetchBuyPrice';

/** Fetches the buy price for a vault
 * Accounts for vault fees and buying multiple targets/randoms
 */
const fetchVaultBuyPrice = async ({
  vault,
  network = config.network,
  provider,
  targetBuys,
  randomBuys,
}: {
  vault: Pick<Vault, 'id' | 'fees' | 'features' | 'reserveVtoken'>;
  network?: number;
  provider: Provider;
  /** The number of target buys we are doing */
  targetBuys?: number;
  /** The number of random buys we are doing */
  randomBuys?: number;
}) => {
  const targetPrice = vault.fees.targetRedeemFee;
  const randomPrice = vault.fees.randomRedeemFee;

  let amount = Zero;
  /** Vault buys come with a per-vault fee
   * so to buy 1 punk nft you have to redeem 1.05 PUNK
   * and to complicate things further, random buys have different fees to target buys
   */
  if (targetBuys != null || randomBuys != null) {
    if (targetBuys) {
      const quantity = WeiPerEther.mul(targetBuys);
      const fee = targetPrice.mul(targetBuys);
      amount = amount.add(quantity).add(fee);
    }
    if (randomBuys) {
      const quantity = WeiPerEther.mul(randomBuys);
      const fee = randomPrice.mul(randomBuys);
      amount = amount.add(quantity).add(fee);
    }
    /** if we haven't specified target/random buys,
     * we assume we're either getting the price for 1 random or 1 target redeem
     */
  } else if (
    vault.features.enableRandomRedeem &&
    !vault.features.enableTargetRedeem
  ) {
    amount = amount.add(WeiPerEther).add(randomPrice);
  } else {
    amount = amount.add(WeiPerEther).add(targetPrice);
  }

  const hasLiquidity = vault.reserveVtoken.gt(amount);

  // You can't buy anything if there isn't enough liquidity in the pool
  if (!hasLiquidity) {
    return Zero;
  }

  return fetchBuyPrice({
    network,
    provider,
    tokenAddress: vault.id,
    quote: 'ETH',
    amount,
  });
};

export default fetchVaultBuyPrice;
