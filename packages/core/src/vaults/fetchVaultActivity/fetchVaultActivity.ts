import config from '@nftx/config';
import type { Address } from '@nftx/types';
import type { GetAll } from './getAll';

export default ({ getAll }: { getAll: GetAll }) =>
  function fetchVaultActivity({
    network = config.network,
    fromTimestamp = 0,
    vaultAddress,
    vaultAddresses = vaultAddress ? [vaultAddress] : undefined,
    toTimestamp,
  }: {
    network?: number;
    vaultAddress?: Address;
    vaultAddresses?: Address[];
    fromTimestamp?: number;
    toTimestamp?: number;
  }) {
    const roundedTimestamp = Math.floor(
      Math.round(fromTimestamp / 3600) * 3600
    );
    return getAll({
      network,
      vaultAddresses,
      fromTimestamp: roundedTimestamp,
      toTimestamp,
    });
  };
