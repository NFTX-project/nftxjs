import type { TokenReserve } from '@nftx/types';
import { queryApi } from '../utils';

/** Get token reserves for the given contract addresses */
const fetchReserves = ({
  network,
  addresses,
}: {
  network?: number;
  addresses?: string[];
}) => {
  return queryApi<TokenReserve[]>({
    url: `/${network}/reserves`,
    query: {
      address: addresses,
    },
  });
};

export default fetchReserves;
