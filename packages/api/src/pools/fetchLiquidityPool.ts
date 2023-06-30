import config from '@nftx/config';
import { queryApi } from '../utils';
import type { LiquidityPool } from '@nftx/types';

/** Get a specific liquidity pool */
const fetchLiquidityPool = ({
  network = config.network,
  poolId,
}: {
  network?: number;
  poolId: string;
}) => {
  return queryApi<LiquidityPool>({
    url: `/${network}/pools/liquidity/${poolId}`,
  });
};

export default fetchLiquidityPool;
