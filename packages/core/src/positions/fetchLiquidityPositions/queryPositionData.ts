import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import type { PositionsResponse } from './types';
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
  const where = buildWhere({
    account_in: userAddresses,
    pool_in: poolIds,
    id_in: positionIds,
    id_gt: lastId,
  });

  const query = gql<PositionsResponse>`{
  positions(
    first: 1000
    orderBy: id
    where: ${where}
  ) {
    id
    liquidity
    pool {
      id
      tick
      inputTokens {
        id
      }
    }
    tickUpper
    tickLower
    account {
      id
    }
    cumulativeDepositTokenAmounts
    cumulativeWithdrawTokenAmounts
  }
}`;

  return querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_UNISWAP_SUBGRAPH, network),
    query,
  });
};

export default queryPositionData;
