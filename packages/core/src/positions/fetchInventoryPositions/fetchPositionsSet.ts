import type { Address, Vault } from '@nftx/types';
import queryPositionData from './queryPositionData';
import transformPosition from './transformPosition';

const getVaultByVaultId = <V extends Pick<Vault, 'vaultId'>>(
  vaults: V[],
  vaultId: string
) => {
  const vault = vaults.find((vault) => vault.vaultId === vaultId);
  if (vault == null) {
    throw new Error(`Could not find vault ${vaultId}`);
  }
  return vault;
};

const fetchPositionsSet = async ({
  network,
  lastId,
  positionIds,
  userAddresses,
  vaultAddresses,
  vaults,
}: {
  network: number;
  lastId?: Address;
  positionIds?: Address[];
  userAddresses?: Address[];
  vaultAddresses?: Address[];
  vaults: Pick<Vault, 'vaultId' | 'vTokenToEth'>[];
}) => {
  const data = await queryPositionData({
    network,
    lastId,
    positionIds,
    userAddresses,
    vaultAddresses,
  });

  const positions = data.inventoryPositions.map((position) => {
    const vault = getVaultByVaultId(vaults, position.vault.vaultId);
    return transformPosition(position, vault);
  });

  let nextId: Address | undefined;

  if (data.inventoryPositions.length === 1000) {
    nextId = data.inventoryPositions.pop()?.id;
  }

  return [positions, nextId] as const;
};

export default fetchPositionsSet;
