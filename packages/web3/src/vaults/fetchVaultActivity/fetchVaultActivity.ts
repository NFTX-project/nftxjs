import type { VaultAddress } from '../types';
import { getAll } from './getAll';

function fetchVaultActivity({
  network,
  fromTimestamp,
  vaultAddress,
  vaultAddresses = [vaultAddress],
}: {
  network: number;
  vaultAddress?: VaultAddress;
  vaultAddresses?: VaultAddress[];
  fromTimestamp?: number;
}) {
  return getAll({ network, vaultAddresses, fromTimestamp });
}

export default fetchVaultActivity;
