import makeExitLiquidity from './exitLiquidity';
import makeWithdrawLiquidity from './withdrawLiquidity';
import makeUnstakeLiquidity from './unstakeLiquidity';
import type { getContract } from '@nftx/utils';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) => {
  const exitLiquidity = makeExitLiquidity({ getContract });
  const withdrawLiquidity = makeWithdrawLiquidity({ getContract });
  const unstakeLiquidity = makeUnstakeLiquidity({
    exitLiquidity,
    withdrawLiquidity,
  });

  return unstakeLiquidity;
};
