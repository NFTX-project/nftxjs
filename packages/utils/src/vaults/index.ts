import { querySubgraph } from '@nftx/subgraph';
import { balanceOf } from '../web3';
import makeFetchUserVaultBalances from './fetchUserVaultBalances';
import makeFetchUserVaultBalance from './fetchUserVaultBalance';

export { default as calculateVaultApr } from './calculateVaultApr';
export { default as fetchXTokenShare } from './fetchXTokenShare';
export { default as fetchXTokenShares } from './fetchXTokenShares';
export * from './utils';

export const fetchUserVaultBalances = makeFetchUserVaultBalances({
  querySubgraph,
});

export const fetchUserVaultBalance = makeFetchUserVaultBalance({
  fetchUserVaultBalances,
  balanceOf,
});
