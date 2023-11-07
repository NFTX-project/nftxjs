import config from '@nftx/config';
import {
  CreateLiquidityPositionQuote,
  CreateLiquidityPositionQuoteParams,
} from '@nftx/types';
import { queryApi } from '../utils';

const quoteCreateLiquidityPosition = ({
  network = config.network,
  ...query
}: CreateLiquidityPositionQuoteParams & { network?: number }) => {
  return queryApi<CreateLiquidityPositionQuote>({
    url: `/${network}/quote/create-liquidity-position`,
    method: 'POST',
    query,
  });
};

export default quoteCreateLiquidityPosition;
