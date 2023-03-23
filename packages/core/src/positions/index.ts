import {
  balanceOf,
  fetchReservesForToken,
  fetchReservesForTokens,
  fetchUserVaultBalance,
  fetchUserVaultBalances,
  fetchXTokenShare,
  fetchXTokenShares,
  totalSupply,
} from '@nftx/utils';
import { fetchLiquidityPool, fetchLiquidityPools } from '../pools';
import { fetchClaimableTokens } from '../staking';
import { fetchVault, fetchVaultFees, fetchVaults } from '../vaults';
import fetchVaultAprs from '../vaults/fetchVaultAprs';
import makeFetchPosition from './fetchPosition';
import makeFetchPositions from './fetchPositions';

export { default as fetchUsers } from './fetchUsers';

export const fetchPosition = makeFetchPosition({
  fetchClaimableTokens,
  fetchPool: fetchLiquidityPool,
  fetchReservesForToken,
  fetchTotalSupply: totalSupply,
  fetchUserVaultBalance,
  fetchVault,
  fetchVaultAprs,
  fetchXTokenShare,
  balanceOf,
  fetchVaultFees,
});

export const fetchPositions = makeFetchPositions({
  fetchPools: fetchLiquidityPools,
  fetchPosition,
  fetchReservesForTokens,
  fetchUserVaultBalances,
  fetchVaultAprs,
  fetchVaults,
  fetchXTokenShares,
});
