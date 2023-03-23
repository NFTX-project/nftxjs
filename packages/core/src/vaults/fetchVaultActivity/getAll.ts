import config from '@nftx/config';
import { buildWhere, gql, type querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { createMintsQuery, type Mint, type ProcessMints } from './mints';
import {
  createRedeemsQuery,
  type ProcessRedeems,
  type Redeem,
} from './redeems';
import { createSwapsQuery, type ProcessSwaps, type Swap } from './swaps';

type QuerySubgraph = typeof querySubgraph;

const makeGetAll = ({
  processMints,
  processRedeems,
  processSwaps,
  querySubgraph,
}: {
  querySubgraph: QuerySubgraph;
  processMints: ProcessMints;
  processRedeems: ProcessRedeems;
  processSwaps: ProcessSwaps;
}) =>
  async function getAll({
    fromTimestamp,
    toTimestamp,
    vaultAddresses,
    network,
  }: {
    network: number;
    vaultAddresses?: Address[];
    fromTimestamp?: number;
    toTimestamp?: number;
  }) {
    const where = buildWhere({
      date_gt: fromTimestamp,
      date_lte: toTimestamp,
      vault: vaultAddresses?.length === 1 ? vaultAddresses[0] : null,
      vault_in: vaultAddresses?.length === 1 ? null : vaultAddresses,
    });
    const query = gql<{
      mints: Mint[];
      redeems: Redeem[];
      swaps: Swap[];
    }>`{
    ${createMintsQuery(where)}
    ${createRedeemsQuery(where)}
    ${createSwapsQuery(where)}
  }`;

    const response = await querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      query,
    });

    const mints = await processMints({
      response,
      network,
      vaultAddresses,
      toTimestamp,
    });
    const redeems = await processRedeems({
      response,
      network,
      vaultAddresses,
      toTimestamp,
    });
    const swaps = await processSwaps({
      response,
      network,
      vaultAddresses,
      toTimestamp,
    });
    const activity = [...mints, ...redeems, ...swaps].sort(
      (a, b) => a.date - b.date
    );

    return { mints, swaps, redeems, activity };
  };

export default makeGetAll;

export type GetAll = ReturnType<typeof makeGetAll>;
