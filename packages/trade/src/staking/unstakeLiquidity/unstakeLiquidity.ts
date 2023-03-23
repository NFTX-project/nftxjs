import config from '@nftx/config';
import type { Provider, Signer } from '@nftx/types';
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
    provider: Provider;
    signer: Signer;
    vaultId: string;
    /** The amount of xSlp to withdraw */
    slpAmount?: bigint;
    /** The maximum amount of xSlp that can be withdrawn, i.e. your balance */
    max?: bigint;
  }) {
    const {
      vaultId,
      slpAmount,
      max,
      network = config.network,
      provider,
      signer,
    } = args;

    // If we're unstaking everything we can just exit the position entirely
    if (slpAmount && max && slpAmount > max) {
      return exitLiquidity({ network, provider, signer, vaultId });
    }
    // If you don't provide an amount, completely exit the position
    if (!slpAmount) {
      return exitLiquidity({ network, signer, provider, vaultId });
    }
    return withdrawLiquidity({
      slpAmount,
      network,
      provider,
      signer,
      vaultId,
    });
  };
