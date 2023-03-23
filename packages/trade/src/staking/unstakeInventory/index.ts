import makeWithdrawNfts from './withdrawNfts';
import makeWithdrawVToken from './withdrawVToken';
import makeUnstakeInventory from './unstakeInventory';
import type { getContract } from '@nftx/utils';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) => {
  const withdrawNfts = makeWithdrawNfts({
    getContract,
  });
  const withdrawVToken = makeWithdrawVToken({ getContract });

  const unstakeInventory = makeUnstakeInventory({
    withdrawNfts,
    withdrawVToken,
  });

  return unstakeInventory;
};
