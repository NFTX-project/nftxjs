import config from '@nftx/config';
import {
  CreateInventoryPositionQuote,
  CreateInventoryPositionQuoteParams,
} from '@nftx/types';
import { queryApi } from '../utils';

const quoteCreateInventoryPosition = ({
  network = config.network,
  ...query
}: CreateInventoryPositionQuoteParams & { network?: number }) => {
  return queryApi<CreateInventoryPositionQuote>({
    url: `/${network}/quote/create-inventory-position`,
    method: 'POST',
    query,
  });
};

export default quoteCreateInventoryPosition;
