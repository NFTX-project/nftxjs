import config from '@nftx/config';
import type { Position } from '@nftx/types';
import { queryApi } from '../utils';

const fetchUserPositions = ({
  userAddress,
  network = config.network,
}: {
  network?: number;
  userAddress: string;
}) => {
  return queryApi<Position[]>({
    url: `/${network}/users/${userAddress}/positions`,
  });
};

export default fetchUserPositions;
