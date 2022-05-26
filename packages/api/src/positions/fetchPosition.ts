import config from '@nftx/config';
import type { Position } from '@nftx/types';
import { queryApi } from '../utils';

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
