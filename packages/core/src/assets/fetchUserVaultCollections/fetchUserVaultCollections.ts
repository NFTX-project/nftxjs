import type { Vault } from '@nftx/types';
import fetchUserVaultCollectionsAlchemy from './alchemy';

const fetchUserVaultCollections = async ({
  network,
  userAddress,
  vaults,
}: {
  network: number;
  userAddress: string;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'features' | 'eligibilityModule'>[];
}) => {
  return fetchUserVaultCollectionsAlchemy({ network, userAddress, vaults });
};

export default fetchUserVaultCollections;
