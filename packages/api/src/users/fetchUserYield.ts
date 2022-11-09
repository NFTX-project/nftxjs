import config from '@nftx/config';
import type { BigNumber } from '@ethersproject/bignumber';
import { queryApi } from '../utils';

type Response = {
  lifetimeYield: BigNumber;
};

const fetchUserYield = ({
  network = config.network,
  userAddress,
}: {
  network?: number;
  userAddress: string;
}) => {
  return queryApi<Response>({
    url: `/${network}/users/${userAddress}/yield`,
  });
};

export default fetchUserYield;