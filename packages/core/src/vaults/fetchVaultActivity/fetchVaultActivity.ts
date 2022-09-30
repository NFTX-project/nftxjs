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
    ? Math.floor(Math.round(fromTimestamp / 60) * 60)
    : undefined;
  return getAll({
    network,
    vaultAddresses,
    fromTimestamp: roundedTimestamp,
    toTimestamp,
  });
}

export default fetchVaultActivity;
