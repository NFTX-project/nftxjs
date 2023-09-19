import config from '@nftx/config';
import type { Address, Collection } from '@nftx/types';
import { queryApi } from '../utils';

const fetchCollections = ({
  userAddress,
  mintable,
  network = config.network,
}: {
  network?: number;
  userAddress: Address;
  mintable?: boolean;
}) => {
  return queryApi<Collection[]>({
    url: `/${network}/collections`,
    query: {
      userAddress,
      mintable,
    },
  });
};

export default fetchCollections;
