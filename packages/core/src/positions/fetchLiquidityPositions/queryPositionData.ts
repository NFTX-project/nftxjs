import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { NftxV3Uniswap, Address, TokenId } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import config from '@nftx/config';

type QuerySubgraph = typeof querySubgraph;

export const makeQueryPositionData =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  ({
    lastId,
    network,
    poolIds,
    positionIds,
    userAddresses,
    tokenIds,
  }: {
    userAddresses?: Address[];
    poolIds?: Address[];
    positionIds?: Address[];
    tokenIds?: TokenId[];
    lastId?: Address;
    network: number;
  }) => {
    const query = createQuery<NftxV3Uniswap.Query>()
      .positions.first(1000)
      .orderBy('id')
      .where((w) => [
        w.owner.in(userAddresses),
        w.pool.in(poolIds),
        w.id.in(positionIds),
        w.id.gt(lastId),
        w.tokenId.in(tokenIds),
      ])
      .select((s) => [
        s.id,
        s.tokenId,
        s.liquidity,
        s.depositedToken0,
        s.depositedToken1,
        s.withdrawnToken0,
        s.withdrawnToken1,
        s.lockedUntil,
        s.nfpmAddress,
        s.tickUpper,
        s.tickLower,
        s.pool((pool) => [
          pool.id,
          pool.tick,
          pool.name,
          pool.inputTokens((token) => [token.id]),
        ]),
        s.owner((account) => [account.id]),
      ]);

    return querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_UNISWAP_SUBGRAPH, network),
      query,
    });
  };

const queryPositionData = makeQueryPositionData({ querySubgraph });

export default queryPositionData;
