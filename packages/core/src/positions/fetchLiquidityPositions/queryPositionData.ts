import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { NftxV3Uniswap, Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import config from '@nftx/config';

const queryPositionData = ({
  lastId,
  network,
  poolIds,
  positionIds,
  userAddresses,
}: {
  userAddresses?: Address[];
  poolIds?: Address[];
  positionIds?: Address[];
  lastId?: Address;
  network: number;
}) => {
  const query = createQuery<NftxV3Uniswap.Query>()
    .positions.first(1000)
    .orderBy('id')
    .where((w) => [
      w.account.in(userAddresses),
      w.pool.in(poolIds),
      w.id.in(positionIds),
      w.id.gt(lastId),
    ])
    .select((s) => [
      s.id,
      s.liquidity,
      s.tickUpper((tick) => [tick.index]),
      s.tickLower((tick) => [tick.index]),
      s.cumulativeDepositTokenAmounts,
      s.cumulativeWithdrawTokenAmounts,
      s.pool((pool) => [
        pool.id,
        pool.tick,
        pool.inputTokens((token) => [token.id]),
      ]),
      s.account((account) => [account.id]),
    ]);

  return querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_UNISWAP_SUBGRAPH, network),
    query,
  });
};

export default queryPositionData;
