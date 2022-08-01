import makeWithdrawNfts from './withdrawNfts';
import makeWithdrawVToken from './withdrawVToken';
import makeUnstakeInventory from './unstakeInventory';
import type { estimateGasAndFees } from '../../trade';
import type { getContract } from '../../web3';

type EstimateGasAndFees = typeof estimateGasAndFees;
type GetContract = typeof getContract;

export default ({
  estimateGasAndFees,
  getContract,
}: {
  estimateGasAndFees: EstimateGasAndFees;
  getContract: GetContract;
}) => {
  const withdrawNfts = makeWithdrawNfts({
    estimateGasAndFees,
    getContract,
  });
  const withdrawVToken = makeWithdrawVToken({ getContract });

  const unstakeInventory = makeUnstakeInventory({
    withdrawNfts,
    withdrawVToken,
  });

  return unstakeInventory;
};
