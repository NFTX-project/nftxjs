import type { Address, LiquidityPosition } from '@nftx/types';
import { queryApi } from '../utils';
import config from '@nftx/config';

const fetchLiquidityPositions = ({
  network = config.network,
  userAddress,
  vaultId,
}: {
  network?: number;
  userAddress?: Address;
  vaultId?: string;
}) => {
  const url = `/${network}/positions/liquidity`;
  const query = { userAddress, vaultId };

  return queryApi<LiquidityPosition[]>({ url, query });
};

export default fetchLiquidityPositions;
