import type { Vault } from '../vaults';

const calculateSellFee = ({
  vault,
  amount: sells = 1,
}: {
  vault: { fees: Pick<Vault['fees'], 'mintFee'> };
  amount?: number;
}) => {
  /** When you sell an NFT there's a mint fee that's deducted from the final price
   * so if you sell one punk NFT, we mint 1 PUNK, give 0.05 PUNKs to the stakers
   * and trade 0.95 PUNKs for ETH
   */
  return vault.fees.mintFee.mul(sells);
};

export default calculateSellFee;
