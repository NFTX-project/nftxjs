import type { InventoryPool } from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';

const fetchInventoryPool = ({
  network = config.network,
  vaultId,
}: {
  network?: number;
  vaultId: string;
}) => {
  return queryApi<InventoryPool>({
    url: `/${network}/pools/inventory/${vaultId}`,
  });
};

export default fetchInventoryPool;
