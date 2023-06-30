import type { Address, InventoryPosition } from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';

const fetchInventoryPositions = ({
  network = config.network,
  userAddress,
  vaultId,
}: {
  network?: number;
  userAddress?: Address;
  vaultId?: string;
}) => {
  const url = `/${network}/positions/inventory`;
  const query = { userAddress, vaultId };

  return queryApi<InventoryPosition[]>({ url, query });
};

export default fetchInventoryPositions;
