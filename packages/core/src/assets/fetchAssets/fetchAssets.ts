import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import fetchAssetsAlchemy from './fetchAssetsAlchemy';
import fetchAssetsSubgraph from './fetchAssetsSubgraph';

const fetchAssets = async ({
  network,
  vaults,
  userAddress,
  cursor,
  provider,
}: {
  network: number;
  userAddress: string;
  cursor?: string;
  vaults: Pick<Vault, 'asset' | 'vaultId' | 'eligibilityModule' | 'features'>[];
  provider: Provider;
}) => {
  const assetAddresses = [...new Set(vaults.map((v) => v.asset.id))];

  if (
    getChainConstant(config.urls.ALCHEMY_URL, network, null) &&
    config.keys.ALCHEMY
  ) {
    console.debug('fetching assets from alchemy');
    try {
      return await fetchAssetsAlchemy({
        assetAddresses,
        cursor,
        network,
        provider,
        userAddress,
        vaults,
      });
    } catch (e) {
      if (e.message?.includes?.('falling back to subgraph')) {
        console.info(e.message);
      } else if (cursor == null) {
        console.info('Alchemy failed, falling back to subgraph');
      } else {
        throw e;
      }
    }
  }

  console.debug('fetching assets from subgraph');
  return fetchAssetsSubgraph({
    assetAddresses,
    network,
    userAddress,
    vaults,
    cursor,
    provider,
  });
};

export default fetchAssets;
