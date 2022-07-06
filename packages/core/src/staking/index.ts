import { estimateGasAndFees } from '../trade';
import { getContract } from '../web3';
import makeFetchClaimableTokens from './fetchClaimableTokens';
export { default as fetchLockTime } from './fetchLockTime';
export { default as fetchUserTimelock } from './fetchUserTimelock';
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
