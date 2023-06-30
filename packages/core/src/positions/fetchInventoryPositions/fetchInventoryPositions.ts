import config from '@nftx/config';
import type { Address, InventoryPosition, Provider, Vault } from '@nftx/types';
import { fetchVaults } from '../../vaults';
import fetchPositionsSet from './fetchPositionsSet';

const getVaultAddressesForVaultIds = (
  vaults: Pick<Vault, 'vaultId' | 'id'>[],
  vaultIds?: string[]
) => {
  if (vaultIds) {
    return vaults
      .filter((vault) => vaultIds.includes(vault.vaultId))
      .map((vault) => vault.id);
  }
};

const fetchInventoryPositions = async ({
  network = config.network,
  provider,
  positionIds,
  userAddresses,
  vaultIds,
  vaults: givenVaults,
}: {
  userAddresses?: Address[];
  vaultIds?: string[];
  positionIds?: Address[];
  network?: number;
  provider: Provider;
  vaults?: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
}): Promise<InventoryPosition[]> => {
  const vaults = givenVaults ?? (await fetchVaults({ network, provider }));
  const vaultAddresses = getVaultAddressesForVaultIds(vaults, vaultIds);

  const positions: InventoryPosition[] = [];
  let lastId: Address | undefined;

  do {
    let morePositions: InventoryPosition[];

    [morePositions, lastId] = await fetchPositionsSet({
      network,
      vaults,
      lastId,
      positionIds,
      userAddresses,
      vaultAddresses,
    });

    positions.push(...morePositions);
  } while (lastId);

  return positions;
};

export default fetchInventoryPositions;
