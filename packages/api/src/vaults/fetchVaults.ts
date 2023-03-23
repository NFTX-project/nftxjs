import config from '@nftx/config';
import type { Address, Vault } from '@nftx/types';
import { queryApi } from '../utils';

const fetchVaults = ({
  vaultId,
  vaultIds,
  vaultAddress,
  vaultAddresses,
  manager,
  includeEmptyVaults,
  finalisedOnly,
  enabledOnly,
  network = config.network,
}: {
  network?: number;
  vaultId?: string;
  vaultIds?: string[];
  vaultAddress?: Address;
  vaultAddresses?: Address[];
  manager?: Address;
  includeEmptyVaults?: boolean;
  finalisedOnly?: boolean;
  enabledOnly?: boolean;
}) => {
  return queryApi<Vault[]>({
    url: `/${network}/vaults`,
    query: {
      enabledOnly,
      finalisedOnly,
      includeEmptyVaults,
      manager,
      id: vaultAddress ?? vaultAddresses,
      vaultId: vaultId ?? vaultIds,
    },
  });
};

export default fetchVaults;
