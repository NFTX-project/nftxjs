import config from '@nftx/config';
import type { Collection } from '@nftx/types';
import { queryApi } from '../utils';

type Response = Collection[];

const fetchUserCollections = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: string;
}) => {
  const url = `/${network}/users/${userAddress}/collections`;
  return queryApi<Response>({
    url,
  });
};

export default fetchUserCollections;
