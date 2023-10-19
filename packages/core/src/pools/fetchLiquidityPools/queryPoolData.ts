import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import type { NftxV3Uniswap, Address, Vault } from '@nftx/types';

const ONE_DAY = 60 * 60 * 24;
const ONE_WEEK = ONE_DAY * 7;

const getAddressesForVaultIds = (
  vaultIds: string[],
  vaults: Pick<Vault, 'id' | 'vaultId'>[]
) => {
  return vaults.reduce((acc, vault) => {
    if (vaultIds.includes(vault.vaultId)) {
      return [...acc, vault.id];
    }
    return acc;
  }, [] as Address[]);
};

const queryPoolData = ({
  network,
  vaults,
  poolIds,
  vaultAddresses,
  vaultIds,
}: {
  network: number;
  vaults: Pick<Vault, 'id' | 'vaultId'>[];
  poolIds?: Address[];
  vaultAddresses?: Address[];
  vaultIds?: string[];
}) => {
  if (vaultIds) {
    vaultAddresses = getAddressesForVaultIds(vaultIds, vaults);
  }

  const now = Math.floor(Date.now() / 1000);
  const oneDayAgo = now - ONE_DAY;
  const oneWeekAgo = now - ONE_WEEK;

  const q = createQuery<NftxV3Uniswap.Query>();
  const query = q.liquidityPools
    .first(1000)
    .orderBy('id')
    .where((w) => [
      w.id.in(poolIds),
      w.inputTokens((w) => [w.id.in(vaultAddresses)]),
    ])
    .select((s) => [
      s.id,
      s.name,
      s.tick,
      s.totalLiquidity,
      s.activeLiquidity,
      s.inputTokenBalances,
      s.totalValueLockedETH,
      s.fees((fee) => [fee.id, fee.feePercentage, fee.feeType]),
      s.inputTokens((token) => [token.id, token.symbol, token.name]),
      s.hourlySnapshots(
        q.liquidityPoolHourlySnapshots
          .where((w) => [w.timestamp.gte(`${oneDayAgo}`)])
          .first(1000)
          .orderBy('hour')
          .orderDirection('desc')
          .select((s) => [s.hourlyVolumeByTokenAmount, s.id])
      ),
      s.dailySnapshots(
        q.liquidityPoolDailySnapshots
          .where((w) => [w.timestamp.gte(`${oneWeekAgo}`)])
          .first(1000)
          .orderBy('day')
          .orderDirection('desc')
          .select((s) => [s.id, s.day, s.dailyVolumeByTokenAmount])
      ),
      s.openPositionCount,
    ]);

  return querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_UNISWAP_SUBGRAPH, network),
    query,
  });
};

export default queryPoolData;
