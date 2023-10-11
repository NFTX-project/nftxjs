import config from '@nftx/config';
import type { Address, InventoryPosition, Vault } from '@nftx/types';
import fetchPositionsSet from './fetchPositionsSet';
import { WeiPerEther, Zero } from '@nftx/constants';

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

function updatePoolShares(positions: InventoryPosition[]) {
  // First we need to get the total vToken for each pool
  const poolVTokens: Record<string, bigint> = {};
  positions.forEach((position) => {
    const { vaultId: id, vToken } = position;
    const current = poolVTokens[id] ?? Zero;
    const updated = current + vToken;

    poolVTokens[position.vaultId] = updated;
  });
  // Then we need to work out the share of each position
  positions.forEach((position) => {
    const { vToken, vaultId: id } = position;
    const total = poolVTokens[id];

    if (!total) {
      return;
    }
    const share = (vToken * WeiPerEther) / total;

    position.poolShare = share;
  });
}

const fetchInventoryPositions = async ({
  network = config.network,
  positionIds,
  userAddresses,
  vaultIds,
  vaults,
}: {
  userAddresses?: Address[];
  vaultIds?: string[];
  positionIds?: Address[];
  network?: number;
  vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
}): Promise<InventoryPosition[]> => {
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

  // We can't calculate pool share until we've got all data
  updatePoolShares(positions);

  return positions;
};

export default fetchInventoryPositions;
