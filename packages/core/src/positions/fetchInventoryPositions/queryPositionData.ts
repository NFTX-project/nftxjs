import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import type { InventoryPositionsResponse } from './types';
import { getChainConstant } from '@nftx/utils';
import config from '@nftx/config';

const queryPositionData = ({
  network,
  positionIds,
  userAddresses,
  vaultAddresses,
  lastId,
}: {
  userAddresses?: Address[];
  positionIds?: Address[];
  vaultAddresses?: Address[];
  network: number;
  lastId?: Address;
}) => {
  const where = buildWhere({
    vault: vaultAddresses,
    id: positionIds,
    user: userAddresses,
    id_gt: lastId,
  });

  const query = gql<InventoryPositionsResponse>`{
    inventoryPositions(
      first: 1000
      orderBy: id
      orderDirection: asc
      where: ${where}
    ) {
      id
      positionId
      vault {
        id
        vaultId
      }
      nftIds
      amount
      user {
        id
      }
      merged
      closed
      isParent
      parent {
        id
      }
      children {
        id
      }
    }
  }`;

  return querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });
};

export default queryPositionData;
