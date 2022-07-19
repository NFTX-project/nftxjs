import config from '@nftx/config';
import type { VaultAddress } from '../types';
import { getAll } from './getAll';

function fetchVaultActivity({
  network = config.network,
  fromTimestamp,
  vaultAddress,
  vaultAddresses = vaultAddress ? [vaultAddress] : undefined,
}: {
  network?: number;
  vaultAddress?: VaultAddress;
  vaultAddresses?: VaultAddress[];
  fromTimestamp?: number;
}) {
  const roundedTimestamp = fromTimestamp
    ? Math.floor(Math.round(fromTimestamp / 30) * 30)
    : undefined;
  return getAll({ network, vaultAddresses, fromTimestamp: roundedTimestamp });
}

export default fetchVaultActivity;
