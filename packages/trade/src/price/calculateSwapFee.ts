import { Zero } from '@nftx/constants';
import type { Vault } from '@nftx/types';
import { doesVaultHaveTargetSwapFee } from '@nftx/utils';

const calculateSwapFee = ({
  vault,
  targetSwaps,
}: {
  vault: {
    fees: Pick<Vault['fees'], 'swapFee'>;
  };
  targetSwaps?: number;
}) => {
  /** For swaps the price is purely for the swap fee
   * so we just have to work out the total fees for the intended target counts
   */
  let amount = Zero;

  if (targetSwaps != null) {
    amount = amount + vault.fees.swapFee * BigInt(targetSwaps);
  } else if (doesVaultHaveTargetSwapFee(vault)) {
    amount = amount + vault.fees.swapFee;
  }

  return amount;
};

export default calculateSwapFee;
