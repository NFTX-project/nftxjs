import { Zero } from '@nftx/constants';
import type { Vault } from '@nftx/types';

const calculateBuyFee = ({
  vault,
  targetBuys,
}: {
  vault: {
    fees: Pick<Vault['fees'], 'targetRedeemFee'>;
    features: Pick<Vault['features'], 'enableTargetRedeem'>;
  };
  /** The number of target buys we are doing */
  targetBuys?: number;
}) => {
  const targetPrice = vault.fees.targetRedeemFee;

  let amount = Zero;
  /** Vault buys come with a per-vault fee
   * so to buy 1 punk nft you have to redeem 1.05 PUNK
   */
  if (targetBuys != null) {
    const fee = targetPrice * BigInt(targetBuys);
    amount = amount + fee;
    /** if we haven't specified target buys,
     * we assume we're either getting the price for or 1 target redeem
     */
    amount = amount + targetPrice;
  }

  return amount;
};

export default calculateBuyFee;
