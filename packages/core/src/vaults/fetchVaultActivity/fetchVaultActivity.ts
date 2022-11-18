import config from '@nftx/config';
import { getAll } from './getAll';

function fetchVaultActivity({
  network = config.network,
  fromTimestamp,
  vaultAddress,
  vaultAddresses = vaultAddress ? [vaultAddress] : undefined,
  toTimestamp,
}: {
  network?: number;
  vaultAddress?: string;
  vaultAddresses?: string[];
  fromTimestamp?: number;
  toTimestamp?: number;
}) {
  const roundedTimestamp = fromTimestamp
    ? Math.floor(Math.round(fromTimestamp / 3600) * 3600)
    : undefined;
  return getAll({
    network,
    vaultAddresses,
    fromTimestamp: roundedTimestamp,
    toTimestamp,
  });
}

export default fetchVaultActivity;
