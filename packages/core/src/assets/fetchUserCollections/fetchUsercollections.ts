import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import fetchUserCollectionsAlchemy from './alchemy';
import fallback from './fallback';

const fetchUserCollections = async ({
  network,
  userAddress,
  vaults,
}: {
  network: number;
  userAddress: string;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'features' | 'eligibilityModule'>[];
}) => {
  if (
    getChainConstant(config.urls.ALCHEMY_URL, network, null) &&
    config.keys.ALCHEMY
  ) {
    console.debug('fetching collections from alchemy');
    return fetchUserCollectionsAlchemy({ network, userAddress, vaults });
  }
  console.debug('fetching collections the hard way');
  return fallback({ network, userAddress, vaults });
};

export default fetchUserCollections;
