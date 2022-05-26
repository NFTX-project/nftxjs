import config from '@nftx/config';
import fetchLiquidityPools from './fetchLiquidityPools';

/** Fetches a single pool */
const fetchLiquidityPool = async ({
  network = config.network,
  vaultAddress,
}: {
  network?: number;
  vaultAddress: string;
}) => {
  const pools = await fetchLiquidityPools({ network, vaultAddress });

  return pools?.[0];
};

export default fetchLiquidityPool;
