import config from '@nftx/config';
import type { Address, Provider, Vault } from '@nftx/types';
import fetchUserCollectionAssets from '../fetchUserCollectionAssets';
import { processAssetItems } from './utils';

const fetchUserVaultAssets = async ({
  network = config.network,
  vaults,
  userAddress,
  cursor,
  provider,
}: {
  network?: number;
  userAddress: Address;
  cursor?: string;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'eligibilityModule' | 'features'>[];
  provider: Provider;
}) => {
  const assetAddresses = [...new Set(vaults.map((v) => v.asset.id))];

  const { assets: allAssets, cursor: newCursor } =
    await fetchUserCollectionAssets({
      assetAddresses,
      network,
      userAddress,
      cursor,
    });

  const assets = await processAssetItems({
    items: allAssets,
    network,
    provider,
    vaults,
  });

  return { assets, cursor: newCursor };
};

export default fetchUserVaultAssets;
