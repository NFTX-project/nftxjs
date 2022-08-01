import { querySubgraph } from '@nftx/subgraph';
import { fetchTokenBalance } from '../web3';
import makeFetchUserVaultBalances from './fetchUserVaultBalances';
import makeFetchUserVaultBalance from './fetchUserVaultBalance';

export { default as calculateVaultApr } from './calculateVaultApr';
export { default as fetchVaultActivity } from './fetchVaultActivity';
export { default as fetchVaults } from './fetchVaults';
export { default as fetchSubgraphVaults } from './fetchSubgraphVaults';
export { default as fetchVault } from './fetchVault';
export { default as fetchVaultApr } from './fetchVaultApr';
export { default as fetchVaultAprs } from './fetchVaultAprs';
export { default as fetchVaultFees } from './fetchVaultFees';
export { default as fetchVaultHoldings } from './fetchVaultHoldings';
export { default as fetchXTokenShare } from './fetchXTokenShare';
export { default as fetchXTokenShares } from './fetchXTokenShares';
export { default as filterMintableAssets } from './filterMintableAssets';
export * from './utils';
export * from './types';

export const fetchUserVaultBalances = makeFetchUserVaultBalances({
  fetchTokenBalance,
  querySubgraph,
});

export const fetchUserVaultBalance = makeFetchUserVaultBalance({
  fetchUserVaultBalances,
});
