import config from '@nftx/config';
import type { Position } from '@nftx/types';
import { queryApi } from '../utils';

/** Get all positions for a given vault */
const fetchVaultPositions = ({
  vaultId,
  network = config.network,
}: {
  network?: number;
  vaultId: string;
}) => {
  return queryApi<Position[]>({
    url: `/${network}/vaults/${vaultId}/positions`,
  });
};

export default fetchVaultPositions;
