import config from '@nftx/config';
import { getChainConstant } from '../web3';
import query from './query';
import { RESERVOIR_URL } from '@nftx/constants';

type Args = Omit<Parameters<typeof query>[0], 'url'> & {
  network?: number;
  path: string;
};

const queryReservoir = <T>({
  path,
  network = config.network,
  ...rest
}: Args) => {
  const base = getChainConstant(RESERVOIR_URL, network);
  const uri = new URL(path, base);
  const headers: Record<string, string> = {};
  const apiKey = getChainConstant(config.keys.RESERVOIR, network, null);
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  return query<T>({
    url: uri.toString(),
    headers,
    ...rest,
  });
};

export default queryReservoir;
