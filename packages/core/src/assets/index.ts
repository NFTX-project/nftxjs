import { checkEligible, fetchMerkleLeaves } from '@nftx/utils';
import fetchUserCollectionAssets from './fetchUserCollectionAssets';
import fetchUserCollections from './fetchUserCollections';
import makeFetchUserVaultAssets from './fetchUserVaultAssets';
import fetchUserVaultCollections from './fetchUserVaultCollections';
export * from './types';

export {
  fetchUserCollectionAssets,
  fetchUserCollections,
  fetchUserVaultCollections,
};

export const fetchUserVaultAssets = makeFetchUserVaultAssets({
  fetchUserCollectionAssets,
  checkEligible,
  fetchMerkleLeaves,
});
