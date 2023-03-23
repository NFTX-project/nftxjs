import { Zero } from '@nftx/constants';
import type { Vault } from '@nftx/types';

const calculateBuyFee = ({
  vault,
  targetBuys,
  randomBuys,
}: {
  vault: {
    fees: Pick<Vault['fees'], 'randomRedeemFee' | 'targetRedeemFee'>;
    features: Pick<
      Vault['features'],
      'enableRandomRedeem' | 'enableTargetRedeem'
    >;
  };
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
      const fee = targetPrice * BigInt(targetBuys);
      amount = amount + fee;
    }
    if (randomBuys) {
      const fee = randomPrice * BigInt(randomBuys);
      amount = amount + fee;
    }
    /** if we haven't specified target/random buys,
     * we assume we're either getting the price for 1 random or 1 target redeem
     */
  } else if (
    vault.features.enableRandomRedeem &&
    !vault.features.enableTargetRedeem
  ) {
    amount = amount + randomPrice;
  } else {
    amount = amount + targetPrice;
  }

  return amount;
};

export default calculateBuyFee;
