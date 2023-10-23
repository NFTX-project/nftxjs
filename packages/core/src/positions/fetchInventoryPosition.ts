import type { Address, InventoryPosition, Provider, Vault } from '@nftx/types';
import fetchInventoryPositions from './fetchInventoryPositions';

type FetchInventoryPositions = typeof fetchInventoryPositions;

export const makeFetchInventoryPosition = ({
  fetchInventoryPositions,
}: {
  fetchInventoryPositions: FetchInventoryPositions;
}) => {
  function fetchPosition(args: {
    network?: number;
    provider: Provider;
    positionId: Address;
    vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
  }): Promise<InventoryPosition>;
  function fetchPosition(args: {
    network?: number;
    provider: Provider;
    userAddress: Address;
    vaultId: string;
    vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
  }): Promise<InventoryPosition>;
  async function fetchPosition({
    network,
    positionId,
    userAddress,
    vaultId,
    vaults,
    provider,
  }: {
    network?: number;
    userAddress?: Address;
    vaultId?: string;
    positionId?: Address;
    vaults: Pick<Vault, 'id' | 'vaultId' | 'vTokenToEth'>[];
    provider: Provider;
  }) {
    const [position] = await fetchInventoryPositions({
      network,
      positionIds: positionId ? [positionId] : undefined,
      userAddresses: userAddress ? [userAddress] : undefined,
      vaultIds: vaultId ? [vaultId] : undefined,
      vaults,
      provider,
    });

    return position;
  }

  return fetchPosition;
};

const fetchInventoryPosition = makeFetchInventoryPosition({
  fetchInventoryPositions,
});

export default fetchInventoryPosition;
