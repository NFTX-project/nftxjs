import config from '@nftx/config';
import {
  IncreaseLiquidityQuote,
  IncreaseLiquidityQuoteParams,
} from '@nftx/types';
import { queryApi } from '../utils';

const quoteIncreaseLiquidity = ({
  network = config.network,
  ...query
}: IncreaseLiquidityQuoteParams & { network?: number }) => {
  return queryApi<IncreaseLiquidityQuote>({
    url: `/${network}/quote/increase-liquidity`,
    method: 'POST',
    query,
  });
};

export default quoteIncreaseLiquidity;
