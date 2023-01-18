import makeFetchReservesForToken from './fetchReservesForToken';
import makeFetchReservesForTokens from './fetchReservesForTokens';
import { querySubgraph } from '@nftx/subgraph';

export const fetchReservesForTokens = makeFetchReservesForTokens({
  querySubgraph,
});

export const fetchReservesForToken = makeFetchReservesForToken({
  fetchReservesForTokens,
});
