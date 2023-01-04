import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import type { Signer } from 'ethers';
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
  /**
   * Unstake a Liquidity Position (LP)
   * This will remove your liquidity from NFTX and return it as SLP.
   * If the amount to withdraw is the maximum, we will exit the position.
   */
  function unstakeLiquidity(args: {
    network?: number;
    signer: Signer;
    vaultId: string;
    /** The amount of xSlp to withdraw */
    slpAmount?: BigNumber;
    /** The maximum amount of xSlp that can be withdrawn, i.e. your balance */
    max?: BigNumber;
  }): Promise<ContractTransaction> {
    const { vaultId, slpAmount, max, network = config.network, signer } = args;

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
