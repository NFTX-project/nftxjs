import config from '@nftx/config';
import type { Address, VaultActivity } from '@nftx/types';
import { queryApi } from '../utils';

/** Get recent vault activity across all vaults */
const fetchActivity = ({
  network = config.network,
  fromTimestamp,
  vaultAddress,
  vaultAddresses,
  vaultId,
  vaultIds,
}: {
  network?: number;
  /** Timestamp (in seconds). The given timestamp will be rounded to the nearest hour */
  fromTimestamp?: number;
  vaultAddress?: Address;
  vaultAddresses?: Address[];
  vaultId?: string;
  vaultIds?: string[];
}) => {
  if (fromTimestamp != null) {
    // Round timestamps to the nearest 60m
    fromTimestamp = Math.floor(Math.round(fromTimestamp / 3600) * 3600);
  }

  return queryApi<VaultActivity[]>({
    url: `/${network}/activity`,
    query: {
      fromTimestamp,
      ids: vaultAddress ? [vaultAddress] : vaultAddresses,
      vaultIds: vaultId ? [vaultId] : vaultIds,
    },
  });
};

export default fetchActivity;
