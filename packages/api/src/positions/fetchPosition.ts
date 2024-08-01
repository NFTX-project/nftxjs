import config from '@nftx/config';
import type { Position } from '@nftx/types';
import { queryApi } from '../utils';

/** Get a position for specific user and vault */
const fetchPosition = ({
  userAddress,
  vaultId,
  network = config.network,
}: {
  network?: number;
  userAddress: string;
  vaultId: string;
}) => {
  return queryApi<Position>({
    url: `/${network}/users/${userAddress}/positions/${vaultId}`,
  });
};

export default fetchPosition;