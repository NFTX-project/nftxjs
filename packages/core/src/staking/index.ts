import { estimateGasAndFees } from '../trade';
import { getContract } from '../web3';
import makeFetchClaimableTokens from './fetchClaimableTokens';
export { default as fetchLockTime } from './fetchLockTime';
export { default as fetchUserTimelock } from './fetchUserTimelock';
import makeFetchMaxInventoryWithdraw from './fetchMaxInventoryWithdraw';
import makeUnstakeLiquidity from './unstakeLiquidity';
import makeUnstakeInventory from './unstakeInventory';
import makeStakeLiquidity from './stakeLiquidity';
import makeStakeSlp from './stakeSlp';
import makeStakeVToken from './stakeVToken';
import makeStakeInventory from './stakeInventory';
import makeClaimRewards from './claimRewards';

export const fetchClaimableTokens = makeFetchClaimableTokens({ getContract });
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
export const fetchMaxInventoryWithdraw = makeFetchMaxInventoryWithdraw({
  getContract,
});
