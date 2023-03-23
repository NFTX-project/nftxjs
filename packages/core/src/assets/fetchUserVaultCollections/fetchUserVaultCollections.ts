import config from '@nftx/config';
import type { Address, Vault } from '@nftx/types';
import fetchUserVaultCollectionsAlchemy from './alchemy';

const fetchUserVaultCollections = async ({
  network = config.network,
  userAddress,
  vaults,
}: {
  network?: number;
  userAddress: Address;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'features' | 'eligibilityModule'>[];
}) => {
  return fetchUserVaultCollectionsAlchemy({ network, userAddress, vaults });
};

export default fetchUserVaultCollections;
