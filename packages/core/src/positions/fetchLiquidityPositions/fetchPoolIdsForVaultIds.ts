import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { NftxV3Uniswap, Address, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { NFTX_UNISWAP_SUBGRAPH } from '@nftx/constants';

type QuerySubgraph = typeof querySubgraph;

const fetchPoolIdsNextSet = async ({
  lastId,
  network,
  addresses,
  querySubgraph,
}: {
  lastId: Address | undefined;
  addresses: Address[];
  network: number;
  querySubgraph: QuerySubgraph;
}) => {
  const query = createQuery<NftxV3Uniswap.Query>()
    .liquidityPools.first(1000)
    .orderBy('id')
    .where((w) => [
      w.inputTokens((token) => [token.id.in(addresses), token.id.gt(lastId)]),
    ])
    .select((s) => [s.id]);

  const data = await querySubgraph({
    url: getChainConstant(NFTX_UNISWAP_SUBGRAPH, network),
    query,
  });

  const poolIds = data.liquidityPools.map((pool) => pool.id as Address);
  let nextId: Address | undefined;

  if (data.liquidityPools.length === 1000) {
    nextId = data.liquidityPools.pop()?.id as Address;
  }

  return [poolIds, nextId] as const;
};

const fetchPoolIdsByInputToken = async ({
  addresses,
  network,
  querySubgraph,
}: {
  network: number;
  addresses: Address[];
  querySubgraph: QuerySubgraph;
}) => {
  const poolIds: Address[] = [];
  let lastId: Address | undefined;

  do {
    let morePoolIds: Address[];

    [morePoolIds, lastId] = await fetchPoolIdsNextSet({
      lastId,
      network,
      addresses,
      querySubgraph,
    });
    poolIds.push(...morePoolIds);
  } while (lastId);

  return poolIds;
};

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

export const makeFetchPoolIdsForVaultIds =
  ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  ({
    network,
    vaultIds,
    vaults,
  }: {
    network: number;
    vaultIds: string[];
    vaults: Pick<Vault, 'id' | 'vaultId'>[];
  }) => {
    // We can't directly query positions on vaultId
    // so we need to get the vault addresses (which is the vToken address)
    // then use that to get the pool ids
    // then use that to fetch positions by pool id
    const addresses = getAddressesForVaultIds(vaultIds, vaults);
    const poolIds = fetchPoolIdsByInputToken({
      network,
      addresses,
      querySubgraph,
    });

    return poolIds;
  };

const fetchPoolIdsForVaultIds = makeFetchPoolIdsForVaultIds({ querySubgraph });

export default fetchPoolIdsForVaultIds;
