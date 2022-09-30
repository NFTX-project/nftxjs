import type { Asset, Vault } from '@nftx/types';
import fetchAssets from '../fetchAssets';

const fetchUserCollectionsArbitrum = async ({
  network,
  userAddress,
  vaults,
}: {
  network: number;
  userAddress: string;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'features' | 'eligibilityModule'>[];
}) => {
  let cursor: string = null;
  const ownedAssets: Asset[] = [];

  do {
    const data = await fetchAssets({
      network,
      provider: null,
      userAddress,
      vaults,
      cursor,
    });

    ownedAssets.push(...data.assets);
    cursor = data.cursor;
  } while (cursor != null);

  const groupedAssets = ownedAssets.reduce((acc, asset) => {
    const key = `${asset.assetAddress}/${asset.vaultId}`;
    if (!acc[key]) {
      acc[key] = { vaultId: asset.vaultId, assetAddress: asset.assetAddress };
    }
    return acc;
  }, {} as Record<string, { vaultId: string; assetAddress: string }>);

  return Object.values(groupedAssets);
};

export default fetchUserCollectionsArbitrum;
