import type { Address, Collection } from '@nftx/types';
import { queryApi } from '../utils';

const fetchCollection = ({
  collectionAddress,
  network,
}: {
  network?: number;
  collectionAddress: Address;
}) => {
  return queryApi<Collection>({
    url: `/${network}/collections/${collectionAddress}`,
  });
};

export default fetchCollection;
