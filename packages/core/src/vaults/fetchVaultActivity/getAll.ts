import config from '@nftx/config';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { createMintsQuery, Mint, processMints } from './mints';
import { createRedeemsQuery, processRedeems, Redeem } from './redeems';
import { createSwapsQuery, processSwaps, Swap } from './swaps';

export const getAll = async ({
  fromTimestamp,
  toTimestamp,
  vaultAddresses,
  network,
}: {
  network: number;
  vaultAddresses?: Address[];
  fromTimestamp?: number;
  toTimestamp?: number;
}) => {
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
