import config from '@nftx/config';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '@nftx/utils';
import type { LiquidityPoolsResponse } from './types';
import type { Address, Vault } from '@nftx/types';

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

const queryPoolData = ({
  network,
  vaults,
  poolIds,
  vaultAddresses,
  vaultIds,
}: {
  network: number;
  vaults: Pick<Vault, 'id' | 'vaultId'>[];
  poolIds?: Address[];
  vaultAddresses?: Address[];
  vaultIds?: string[];
}) => {
  if (vaultIds) {
    vaultAddresses = getAddressesForVaultIds(vaultIds, vaults);
  }

  const where = buildWhere({
    id_in: poolIds,
    inputTokens: {
      id_in: vaultAddresses,
    },
  });

  const query = gql<LiquidityPoolsResponse>`{
    liquidityPools(
      first: 1000
      orderBy: id
      orderDirection: asc
      where: ${where}
    ) {
      id
      name
      fees {
        id
        feeType
        percentage
      }
      tick
      totalLiquidity
      activeLiquidity
      inputTokens {
        id
        symbol
        name
      }
    }
  }`;

  return querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_UNISWAP_SUBGRAPH, network),
    query,
  });
};

export default queryPoolData;
