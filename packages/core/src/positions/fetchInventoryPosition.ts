import type { Address, InventoryPosition, Provider } from '@nftx/types';
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
  }): Promise<InventoryPosition>;
  function fetchPosition(args: {
    network?: number;
    provider: Provider;
    userAddress: Address;
    vaultId: string;
  }): Promise<InventoryPosition>;
  async function fetchPosition({
    provider,
    network,
    positionId,
    userAddress,
    vaultId,
  }: {
    network?: number;
    provider: Provider;
    userAddress?: Address;
    vaultId?: string;
    positionId?: Address;
  }) {
    const [position] = await fetchInventoryPositions({
      network,
      provider,
      positionIds: positionId ? [positionId] : undefined,
      userAddresses: userAddress ? [userAddress] : undefined,
      vaultIds: vaultId ? [vaultId] : undefined,
    });

    return position;
  }

  return fetchPosition;
};

export default makeFetchInventoryPosition({ fetchInventoryPositions });
