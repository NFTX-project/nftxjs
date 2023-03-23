import config from '@nftx/config';
import type { Address, TokenReserve } from '@nftx/types';
import { queryApi } from '../utils';

/** Get token reserves for a contract address */
const fetchReserve = ({
  network = config.network,
  address,
}: {
  network?: number;
  address: Address;
}) => {
  return queryApi<TokenReserve>({
    url: `/${network}/reserves/${address}`,
  });
};

export default fetchReserve;
