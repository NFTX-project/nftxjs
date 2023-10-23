import config from '@nftx/config';
import { queryApi } from '../utils';
import {
  WithdrawLiquidityQuote,
  WithdrawLiquidityQuoteParams,
} from '@nftx/types';

const quoteWithdrawLiquidity = ({
  network = config.network,
  ...query
}: WithdrawLiquidityQuoteParams & { network?: number }) => {
  return queryApi<WithdrawLiquidityQuote>({
    url: `/${network}/quote/withdraw-liquidity`,
    method: 'POST',
    query,
  });
};

export default quoteWithdrawLiquidity;
