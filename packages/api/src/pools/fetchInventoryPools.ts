import type { Address, InventoryPool } from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';

const fetchInventoryPools = async ({
  network = config.network,
  vaultAddresses,
  vaultIds,
}: {
  network?: number;
  vaultAddresses?: Address[];
  vaultIds?: string[];
}) => {
  return queryApi<InventoryPool[]>({
    url: `/${network}/pools/inventory`,
    query: {
      vaultAddresses,
      vaultIds,
    },
  });
};

export default fetchInventoryPools;
