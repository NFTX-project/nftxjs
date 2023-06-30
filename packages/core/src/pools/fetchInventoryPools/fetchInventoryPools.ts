import config from '@nftx/config';
import type {
  Address,
  InventoryPool,
  InventoryPosition,
  Provider,
  Vault,
} from '@nftx/types';
import { fetchVaults } from '../../vaults';
import { fetchInventoryPositions } from '../../positions';
import filterVaults from './filterVaults';
import transformPool from './transformPool';

const fetchInventoryPools = async ({
  network = config.network,
  vaultAddresses,
  vaultIds,
  provider,
  vaults: givenVaults,
  positions: givenPositions,
}: {
  network?: number;
  vaultAddresses?: Address[];
  vaultIds?: string[];
  provider: Provider;
  vaults?: Pick<Vault, 'vaultId' | 'id' | 'vTokenToEth'>[];
  positions?: InventoryPosition[];
}): Promise<InventoryPool[]> => {
  const allVaults = givenVaults ?? (await fetchVaults({ network, provider }));

  const vaults = filterVaults({
    vaults: allVaults,
    vaultAddresses,
    vaultIds,
  });

  const positions =
    givenPositions ??
    (await fetchInventoryPositions({
      provider,
      network,
      vaultIds: vaults.map((v) => v.vaultId),
      vaults: allVaults,
    }));

  return vaults.map((vault) => {
    return transformPool({ positions, vault });
  });
};

export default fetchInventoryPools;
