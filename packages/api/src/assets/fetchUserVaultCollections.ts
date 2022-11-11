import config from '@nftx/config';
import { queryApi } from '../utils';

type Response = { vaultId: string; assetAddress: string }[];

const fetchUserVaultCollections = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: string;
}) => {
  const url = `/${network}/users/${userAddress}/vault-collections`;
  return queryApi<Response>({
    url,
  });
};

export default fetchUserVaultCollections;
