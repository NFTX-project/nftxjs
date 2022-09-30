import config from '@nftx/config';
import type { Position } from '@nftx/types';
import { queryApi } from '../utils';

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
