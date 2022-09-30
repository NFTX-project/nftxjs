import type { TokenReserve } from '@nftx/types';
import { queryApi } from '../utils';

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
