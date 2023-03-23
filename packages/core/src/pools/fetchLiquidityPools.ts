import { Network } from '@nftx/constants';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { LiquidityPool } from './types';
import config from '@nftx/config';
import type { Address, Token, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

type Response = {
  pools: Array<{
    id: Address;
    vault: Pick<Vault, 'id' | 'vaultId'>;
    deployBlock: string;
    stakingToken: Token;
    dividendToken: Token;
    rewardToken: Token;
  }>;
};

function getSafeStakingBlockHeight(network: number) {
  switch (network) {
    case Network.Mainnet:
      return 13011203;
    case Network.Rinkeby:
      return 9087000;
    default:
      return 0;
  }
}

const ARBITRUM_EXCEPTION_POOL_ID = '0xc5d592305a8ac4cce16485ab46b6b8bf593f5bce';

/** Fetches all NFTX pools */
const fetchLiquidityPools = async ({
  network = config.network,
  vaultAddress,
  vaultIds,
}: {
  network?: number;
  /** Only return pools for a specific vault */
  vaultAddress?: string;
  /** Only return pools for specific vault ids */
  vaultIds?: string[];
}) => {
  const deployBlock = getSafeStakingBlockHeight(network);

  const where = buildWhere({
    vault: vaultAddress,
    vault_: vaultIds?.length
      ? {
          vaultId_in: vaultIds,
        }
      : null,
    deployBlock_gte: deployBlock,
    id_not: ARBITRUM_EXCEPTION_POOL_ID,
  });

  const query = gql<Response>`{
    pools(
      first: 1000,
      where: ${where}
    ) {
      id
      vault {
        id
        vaultId
      }
      deployBlock
      stakingToken {
        id
        name
        symbol
      }
      dividendToken {
        id
        name
        symbol
      }
      rewardToken {
        id
        name
        symbol
      }
    }
  }`;
  const data = await querySubgraph({
    url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
    query,
  });

  return data?.pools?.map(
    ({
      id,
      deployBlock,
      dividendToken,
      rewardToken,
      stakingToken,
      vault: { id: vaultAddress, vaultId },
    }) => {
      const pool: LiquidityPool = {
        id,
        deployBlock,
        dividendToken,
        rewardToken,
        stakingToken,
        vaultAddress,
        vaultId,
      };
      return pool;
    }
  );
};

export default fetchLiquidityPools;
