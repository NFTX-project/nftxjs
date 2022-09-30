import { estimateGasAndFees } from '../trade';
import makeUnstakeLiquidity from './unstakeLiquidity';
import makeUnstakeInventory from './unstakeInventory';
import makeStakeLiquidity from './stakeLiquidity';
import makeStakeSlp from './stakeSlp';
import makeStakeVToken from './stakeVToken';
import makeStakeInventory from './stakeInventory';
import makeClaimRewards from './claimRewards';
import { getContract } from '@nftx/utils';

export const stakeVToken = makeStakeVToken({ getContract });
export const stakeSlp = makeStakeSlp({ getContract });
export const stakeLiquidity = makeStakeLiquidity({
  getContract,
  estimateGasAndFees,
});
export const stakeInventory = makeStakeInventory({ getContract });
export const claimRewards = makeClaimRewards({ getContract });
export const unstakeLiquidity = makeUnstakeLiquidity({ getContract });
export const unstakeInventory = makeUnstakeInventory({
  estimateGasAndFees,
  getContract,
});
