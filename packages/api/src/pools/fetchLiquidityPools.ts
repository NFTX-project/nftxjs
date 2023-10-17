import config from '@nftx/config';
import type { Address, LiquidityPool } from '@nftx/types';
import { queryApi } from '../utils';

/** Get all liquidity pools that match the given criteria. If no arguments are given, it will return all pools */
const fetchLiquidityPools = ({
  network = config.network,
  poolIds,
  vaultAddress,
  vaultAddresses,
  vaultId,
  vaultIds,
  exists,
}: {
  network?: number;
  /** Get pools that match the given liquidity pool addresses */
  poolIds?: string[];
  /** Get a pool that matches the given vault address */
  vaultAddress?: Address;
  /** Get pools that match the given vault addresses */
  vaultAddresses?: Address[];
  /** Get a pool for a specific vault id */
  vaultId?: string;
  /** Get pools that match the given vault ids */
  vaultIds?: string[];
  /** Only return pools that actually exist */
  exists?: boolean;
} = {}) => {
  return queryApi<LiquidityPool[]>({
    url: `/${network}/pools/liquidity`,
    query: {
      liquidityPoolId: poolIds,
      id: vaultAddress ?? vaultAddresses,
      vaultId: vaultId ?? vaultIds,
      exists,
    },
  });
};
export default fetchLiquidityPools;
