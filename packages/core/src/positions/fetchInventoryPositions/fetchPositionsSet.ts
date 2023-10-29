import type { Address, Provider, Vault } from '@nftx/types';
import { NotFoundError } from '@nftx/errors';
import queryPositionData from './queryPositionData';
import transformPosition from './transformPosition';
import fetchClaimableAmount from './fetchClaimableAmount';

const getVaultByVaultId = <V extends Pick<Vault, 'vaultId'>>(
  vaults: V[],
  vaultId: string
) => {
  const vault = vaults.find((vault) => vault.vaultId === vaultId);
  if (vault == null) {
    throw new NotFoundError('vault', vaultId);
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
  provider,
}: {
  network: number;
  lastId?: Address;
  positionIds?: Address[];
  userAddresses?: Address[];
  vaultAddresses?: Address[];
  vaults: Pick<Vault, 'vaultId' | 'vTokenToEth'>[];
  provider: Provider;
}) => {
  const data = await queryPositionData({
    network,
    lastId,
    positionIds,
    userAddresses,
    vaultAddresses,
  });

  const positions = await Promise.all(
    data.inventoryPositions.map(async (position) => {
      const vault = getVaultByVaultId(vaults, position.vault.vaultId);
      const claimableRewards = await fetchClaimableAmount({
        positionId: position.positionId,
        provider,
        network,
      });

      return transformPosition(position, vault, claimableRewards);
    })
  );

  let nextId: Address | undefined;

  if (data.inventoryPositions.length === 1000) {
    nextId = data.inventoryPositions.pop()?.id as Address;
  }

  return [positions, nextId] as const;
};

export default fetchPositionsSet;
