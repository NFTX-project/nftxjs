import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { Address, Vault } from '@nftx/types';
import type { PoolIdsResponse } from './types';
import { getChainConstant } from '@nftx/utils';
import { NFTX_UNISWAP_SUBGRAPH } from '@nftx/constants';

const fetchPoolIdsNextSet = async ({
  lastId,
  network,
  addresses,
}: {
  lastId: Address | undefined;
  addresses: Address[];
  network: number;
}) => {
  const where = buildWhere({
    inputTokens: {
      id_in: addresses,
      id_gt: lastId,
    },
  });

  const query = gql<PoolIdsResponse>`{
    liquidityPools(
      first: 1000
      orderBy: id
      where: ${where}
    ) {
      id
    }
  }`;

  const data = await querySubgraph({
    url: getChainConstant(NFTX_UNISWAP_SUBGRAPH, network),
    query,
  });

  const poolIds = data.liquidityPools.map((pool) => pool.id);
  let nextId: Address | undefined;

  if (data.liquidityPools.length === 1000) {
    nextId = data.liquidityPools.pop()?.id;
  }

  return [poolIds, nextId] as const;
};

const fetchPoolIdsByInputToken = async ({
  addresses,
  network,
}: {
  network: number;
  addresses: Address[];
}) => {
  const poolIds: Address[] = [];
  let lastId: Address | undefined;

  do {
    let morePoolIds: Address[];

    [morePoolIds, lastId] = await fetchPoolIdsNextSet({
      lastId,
      network,
      addresses,
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

const fetchPoolIdsForVaultIds = ({
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
  const poolIds = fetchPoolIdsByInputToken({ network, addresses });

  return poolIds;
};

export default fetchPoolIdsForVaultIds;
