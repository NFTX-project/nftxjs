import config from '@nftx/config';
import type { Pool } from '@nftx/types';
import { queryApi } from '../utils';

/** Get all pools that match the given criteria. If no arguments are given, it will return all pools */
const fetchPools = ({
  network = config.network,
  liquidityPoolId,
  liquidityPoolIds,
  vaultAddress,
  vaultAddresses,
  vaultId,
  vaultIds,
}: {
  network?: number;
  /** Get a pool based on its liquidity pool address */
  liquidityPoolId?: string;
  /** Get pools that match the given liquidity pool addresses */
  liquidityPoolIds?: string[];
  /** Get a pool that matches the given vault address */
  vaultAddress?: string;
  /** Get pools that match the given vault addresses */
  vaultAddresses?: string[];
  /** Get a pool for a specific vault id */
  vaultId?: string;
  /** Get pools that match the given vault ids */
  vaultIds?: string[];
} = {}) => {
  return queryApi<Pool[]>({
    url: `/${network}/pools`,
    query: {
      liquidityPoolId: liquidityPoolId ?? liquidityPoolIds,
      id: vaultAddress ?? vaultAddresses,
      vaultId: vaultId ?? vaultIds,
    },
  });
};
export default fetchPools;
