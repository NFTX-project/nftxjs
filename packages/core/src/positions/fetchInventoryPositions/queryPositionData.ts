import { buildWhere, createQuery, gql, querySubgraph } from '@nftx/subgraph';
import type { NftxV3, Address } from '@nftx/types';
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
  const query = createQuery<NftxV3.Query>()
    .inventoryPositions.first(1000)
    .orderBy('id')
    .where((w) => [
      w.vault.in(vaultAddresses),
      w.id.in(positionIds),
      w.user.in(userAddresses),
      w.id.gt(lastId),
    ])
    .select((p) => [
      p.id,
      p.positionId,
      p.vault((v) => [v.id, v.vaultId]),
      p.amount,
      p.amount,
      p.user((u) => [u.id]),
      p.merged,
      p.closed,
      p.isParent,
      p.parent((p) => [p.id]),
      p.children((c) => [c.id]),
    ]);

  return querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });
};

export default queryPositionData;
