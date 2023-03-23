import config from '@nftx/config';
import type { Address, Provider } from '@nftx/types';
import fetchVaults from './fetchVaults';

async function fetchVault({
  network = config.network,
  provider,
  vaultAddress,
  vaultId,
}: {
  network?: number;
  provider: Provider;
  vaultAddress?: Address;
  vaultId?: string;
}) {
  const vaults = await fetchVaults({
    network,
    provider,
    vaultIds: vaultId == null ? undefined : [vaultId],
    vaultAddresses: vaultAddress == null ? undefined : [vaultAddress],
    enabledOnly: false,
    finalisedOnly: false,
    includeEmptyVaults: true,
  });

  return vaults?.[0];
}

export default fetchVault;
