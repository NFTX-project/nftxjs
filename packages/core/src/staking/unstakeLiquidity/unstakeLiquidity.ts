import type { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import type { Signer } from 'ethers';
import type { VaultId } from '../../vaults';
import type exitLiquidity from './exitLiquidity';
import type withdrawLiquidity from './withdrawLiquidity';

type ExitLiquidity = ReturnType<typeof exitLiquidity>;
type WithdrawLiquidity = ReturnType<typeof withdrawLiquidity>;

export default ({
  exitLiquidity,
  withdrawLiquidity,
}: {
  exitLiquidity: ExitLiquidity;
  withdrawLiquidity: WithdrawLiquidity;
}) =>
  /** Unstake an LP position
   * if the amount to withdraw is the maximum, we will exit the position
   */
  function unstakeLiquidity({
    vaultId,
    slpAmount,
    max,
    network = config.network,
    signer,
  }: {
    network?: number;
    signer: Signer;
    vaultId: VaultId;
    /** The amount of xSlp to withdraw */
    slpAmount?: BigNumber;
    /** The maximum amount of xSlp that can be withdrawn, i.e. your balance */
    max?: BigNumber;
  }) {
    // If we're unstaking everything we can just exit the position entirely
    if (slpAmount && max && slpAmount.gte(max)) {
      return exitLiquidity({ network, signer, vaultId });
    }
    // If you don't provide an amount, completely exit the position
    if (!slpAmount) {
      return exitLiquidity({ network, signer, vaultId });
    }
    return withdrawLiquidity({
      slpAmount,
      network,
      signer,
      vaultId,
    });
  };
