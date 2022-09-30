import makeFetchClaimableTokens from './fetchClaimableTokens';
import makeFetchLifetimeFees from './fetchLifetimeFees';
import makeFetchCumulativeFees from './fetchCumulativeFees';
import makeFetchLifetimeEarnings from './fetchLifetimeEarnings';
export { default as fetchLockTime } from './fetchLockTime';
import { querySubgraph } from '@nftx/subgraph';
import { fetchVaults } from '../vaults';
import { fetchBlockNumberByTimestamp, getContract } from '@nftx/utils';
export * from './types';

export const fetchClaimableTokens = makeFetchClaimableTokens({ getContract });
export const fetchLifetimeFees = makeFetchLifetimeFees({ querySubgraph });
export const fetchCumulativeFees = makeFetchCumulativeFees({
  querySubgraph,
  fetchBlockNumberByTimestamp,
});
export const fetchLifetimeEarnings = makeFetchLifetimeEarnings({
  fetchVaults,
  querySubgraph,
});
