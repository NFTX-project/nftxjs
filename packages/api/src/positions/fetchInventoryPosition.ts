import config from '@nftx/config';
import { queryApi } from '../utils';
import type { InventoryPosition } from '@nftx/types';

const fetchInventoryPosition = ({
  network = config.network,
  positionId,
}: {
  network?: number;
  positionId?: string;
}) => {
  return queryApi<InventoryPosition>({
    url: `/${network}/positions/inventory/${positionId}`,
  });
};

export default fetchInventoryPosition;
