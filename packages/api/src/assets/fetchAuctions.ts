import config from '@nftx/config';
import { Asset } from '@nftx/types';
import { queryApi } from '../utils';

const fetchAuctions = ({
  network = config.network,
}: { network?: number } = {}) => {
  const url = `/${network}/auctions`;
  type Response = { assets: Asset[] };

  return queryApi<Response>({ url });
};

export default fetchAuctions;
