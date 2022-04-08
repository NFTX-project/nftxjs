import fetchVaults from './fetchVaults';
import type { VaultAddress, VaultId } from './types';

async function fetchVault({
  network,
  vaultAddress,
  vaultId,
}: {
  network: number;
  vaultAddress?: VaultAddress;
  vaultId?: VaultId;
}) {
  const vaults = await fetchVaults({
    network,
    vaultIds: vaultId == null ? null : [vaultId],
    vaultAddresses: vaultAddress == null ? null : [vaultAddress],
  });

  return vaults?.[0];
}

export default fetchVault;
