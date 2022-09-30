import { getContract } from '../web3';
export { default as fetchUserTimelock } from './fetchUserTimelock';
import makeFetchMaxInventoryWithdraw from './fetchMaxInventoryWithdraw';

export const fetchMaxInventoryWithdraw = makeFetchMaxInventoryWithdraw({
  getContract,
});
