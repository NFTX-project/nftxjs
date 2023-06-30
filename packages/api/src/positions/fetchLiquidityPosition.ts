import config from '@nftx/config';
import type { Address, LiquidityPosition } from '@nftx/types';
import { queryApi } from '../utils';

/** Get a position for specific user and vault */
const fetchLiquidityPosition = ({
  network = config.network,
  positionId,
}: {
  network?: number;
  positionId: Address;
}) => {
  return queryApi<LiquidityPosition>({
    url: `/${network}/positions/liquidity/${positionId}`,
  });
};

export default fetchLiquidityPosition;
