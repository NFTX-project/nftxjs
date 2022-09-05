import { Zero } from '@ethersproject/constants';
import {
  doesVaultHaveRandomSwapFee,
  doesVaultHaveTargetSwapFee,
  Vault,
} from '../vaults';

const calculateSwapFee = ({
  vault,
  targetSwaps,
  randomSwaps,
}: {
  vault: {
    fees: Pick<Vault['fees'], 'randomSwapFee' | 'targetSwapFee'>;
  };
  targetSwaps?: number;
  randomSwaps?: number;
}) => {
  /** For swaps the price is purely for the swap fee
   * so we just have to work out the total fees for the intended target/random counts
   */
  let amount = Zero;

  if (targetSwaps != null || randomSwaps != null) {
    if (targetSwaps) {
      amount = amount.add(vault.fees.targetSwapFee.mul(targetSwaps));
    }
    if (randomSwaps) {
      amount = amount.add(vault.fees.randomSwapFee.mul(randomSwaps));
    }
    /** If you don't specificy a number of swaps, we assume you want to know the price of
     * 1 random or 1 target swap (dependent on the vault)
     */
  } else if (
    doesVaultHaveRandomSwapFee(vault) &&
    !doesVaultHaveTargetSwapFee(vault)
  ) {
    amount = amount.add(vault.fees.randomSwapFee);
  } else if (doesVaultHaveTargetSwapFee(vault)) {
    amount = amount.add(vault.fees.targetSwapFee);
  }

  return amount;
};

export default calculateSwapFee;
