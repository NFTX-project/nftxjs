import config from '@nftx/config';
import { queryApi } from '../utils';
import {
  WithdrawInventoryQuote,
  WithdrawInventoryQuoteParams,
} from '@nftx/types';

const quoteWithdrawInventory = ({
  network = config.network,
  ...query
}: { network?: number } & WithdrawInventoryQuoteParams) => {
  return queryApi<WithdrawInventoryQuote>({
    url: `/${network}/quote/withdraw-inventory`,
    method: 'POST',
    query,
  });
};

export default quoteWithdrawInventory;
