import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import fetchVaults from './fetchVaults';
import type { VaultAddress, VaultId } from './types';

async function fetchVault({
  network = config.network,
  provider,
  vaultAddress,
  vaultId,
}: {
  network?: number;
  provider: Provider;
  vaultAddress?: VaultAddress;
  vaultId?: VaultId;
}) {
  const vaults = await fetchVaults({
    network,
    provider,
    vaultIds: vaultId == null ? null : [vaultId],
    vaultAddresses: vaultAddress == null ? null : [vaultAddress],
    enabledOnly: false,
    finalisedOnly: false,
    includeEmptyVaults: true,
  });

  return vaults?.[0];
}

export default fetchVault;
