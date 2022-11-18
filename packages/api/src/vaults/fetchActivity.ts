import config from '@nftx/config';
import type { VaultActivity } from '@nftx/types';
import { queryApi } from '../utils';

const fetchActivity = ({
  network = config.network,
  fromTimestamp,
  vaultAddress,
  vaultAddresses,
  vaultId,
  vaultIds,
}: {
  network?: number;
  fromTimestamp?: number;
  vaultAddress?: string;
  vaultAddresses?: string[];
  vaultId?: string;
  vaultIds?: string[];
}) => {
  if (fromTimestamp) {
    // Round timestamps to the nearest 60m
    fromTimestamp = Math.floor(Math.round(fromTimestamp / 3600) * 3600);
  }

  return queryApi<VaultActivity[]>({
    url: `/${network}/vault-activity`,
    query: {
      fromTimestamp,
      id: vaultAddress ?? vaultAddresses,
      vaultId: vaultId ?? vaultIds,
    },
  });
};

export default fetchActivity;
