import config from '@nftx/config';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '../../web3';
import type { VaultAddress } from '../types';
import { createMintsQuery, Mint, processMints } from './mints';
import { createRedeemsQuery, processRedeems, Redeem } from './redeems';
import { createSwapsQuery, processSwaps, Swap } from './swaps';

export const getAll = async ({
  fromTimestamp,
  vaultAddresses,
  network,
}: {
  network: number;
  vaultAddresses?: VaultAddress[];
  fromTimestamp?: number;
}) => {
  const where = buildWhere({
    date_gt: fromTimestamp,
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

  const mints = await processMints(response, network, vaultAddresses);
  const redeems = await processRedeems(response, network, vaultAddresses);
  const swaps = await processSwaps(response, network, vaultAddresses);
  const activity = [...mints, ...redeems, ...swaps].sort(
    (a, b) => a.date - b.date
  );

  return { mints, swaps, redeems, activity };
};
