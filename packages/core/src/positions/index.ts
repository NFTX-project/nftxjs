export { default as adjustPosition } from './adjustPosition';
import { fetchPool, fetchPools } from '../pools';
import { fetchClaimableTokens } from '../staking';
import { fetchReservesForToken, fetchReservesForTokens } from '../tokens';
import {
  fetchVault,
  fetchVaultAprs,
  fetchXTokenShare,
  fetchUserVaultBalance,
  fetchUserVaultBalances,
  fetchVaults,
  fetchXTokenShares,
} from '../vaults';
import { fetchTotalSupply } from '../web3';
import makeFetchPosition from './fetchPosition';
import makeFetchPositions from './fetchPositions';
export * from './types';

export const fetchPosition = makeFetchPosition({
  fetchClaimableTokens,
  fetchPool,
  fetchReservesForToken,
  fetchTotalSupply,
  fetchUserVaultBalance,
  fetchVault,
  fetchVaultAprs,
  fetchXTokenShare,
});

export const fetchPositions = makeFetchPositions({
  fetchPools,
  fetchPosition,
  fetchReservesForTokens,
  fetchUserVaultBalances,
  fetchVaultAprs,
  fetchVaults,
  fetchXTokenShares,
});
