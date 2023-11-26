import config from '@nftx/config';
import { Address, Asset, Provider, TokenId, Vault } from '@nftx/types';
import fetchAssetsFromReservoir from './fetchAssetsFromReservoir';

const fetchAssets = async ({
  network = config.network,
  cursor,
  provider,
  vaults,
  assets,
}: {
  network?: number;
  cursor?: string;
  provider: Provider;
  vaults: Pick<Vault, 'asset' | 'features' | 'eligibilityModule' | 'vaultId'>[];
  assets: Array<{ assetAddress: Address; tokenIds: TokenId[] }>;
}): Promise<{ assets: Asset[]; cursor?: string }> => {
  if (!assets.length) {
    return { assets: [] };
  }

  return fetchAssetsFromReservoir({
    assets,
    cursor,
    network,
    provider,
    vaults,
  });
};

export default fetchAssets;
