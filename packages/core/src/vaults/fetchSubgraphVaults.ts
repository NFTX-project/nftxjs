import config from '@nftx/config';
import { buildWhere, gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

export type Response = {
  globals: Array<{
    fees: {
      mintFee: string;
      redeemFee: string;
      swapFee: string;
    };
  }>;
  vaults: Array<{
    vaultId: string;
    id: Address;
    is1155: boolean;
    isFinalized: boolean;
    totalHoldings: string;
    totalMints: string;
    totalRedeems: string;
    totalFees: string;
    createdAt: string;
    holdings: Array<{
      id: string;
      tokenId: `${number}`;
      amount: `${number}`;
      dateAdded: string;
    }>;
    token: {
      id: Address;
      name: string;
      symbol: string;
    };
    fees: {
      mintFee: string;
      redeemFee: string;
      swapFee: string;
    };
    usesFactoryFees: boolean;
    asset: {
      id: Address;
      name: string;
      symbol: string;
    };
    manager: {
      id: Address;
    };
    createdBy: {
      id: Address;
    };
    eligibilityModule: {
      id: Address;
      name: string;
      eligibleIds: string[];
      eligibleRange: [string, string];
    };
    features: {
      enableMint: boolean;
      enableRedeem: boolean;
      enableSwap: boolean;
    };
    inventoryStakingPool: {
      id: Address;
      dividendToken: {
        id: Address;
        name: string;
        symbol: string;
      };
    };
    lpStakingPool: {
      id: Address;
      stakingToken: {
        id: Address;
        name: string;
        symbol: string;
      };
      dividendToken: {
        id: Address;
        name: string;
        symbol: string;
      };
    };
    shutdownDate: string;
  }>;
};

const fetchSubgraphVaults = async ({
  network = config.network,
  vaultAddresses,
  vaultIds,
  manager,
  finalisedOnly = true,
  includeEmptyVaults = false,
  lastId = 0,
  retryCount = 0,
}: {
  network?: number;
  vaultAddresses?: Address[];
  vaultIds?: string[];
  includeEmptyVaults?: boolean;
  finalisedOnly?: boolean;
  manager?: Address;
  lastId?: number;
  retryCount?: number;
}): Promise<Response> => {
  const where = buildWhere({
    isFinalized: finalisedOnly || null,
    totalHoldings_gte: includeEmptyVaults ? null : 1,
    vaultId: vaultIds != null && vaultIds.length === 1 ? vaultIds[0] : null,
    vaultId_in: vaultIds != null && vaultIds.length > 1 ? vaultIds : null,
    id:
      vaultAddresses != null && vaultAddresses.length === 1
        ? vaultAddresses[0]
        : null,
    id_in:
      vaultAddresses != null && vaultAddresses.length > 1
        ? vaultAddresses.map((x) => x.toLowerCase())
        : null,
    manager: manager?.toLowerCase(),
    vaultId_gte: lastId,
  });

  const query = gql<Response>`{
    globals {
      fees {
        mintFee
        randomRedeemFee
        targetRedeemFee
        randomSwapFee
        targetSwapFee
      }
    }
    vaults(
      first: 1000,
      where: ${where}
    ) {
      vaultId
      id
      is1155
      isFinalized
      totalHoldings
      totalMints
      totalRedeems
      totalFees
      createdAt
      shutdownDate
      holdings(
        first: 1000,
        orderBy: tokenId,
        orderDirection: asc
      ) {
        id
        tokenId
        amount
        dateAdded
      }
      token {
        id
        name
        symbol
      }
      fees {
        mintFee
        randomRedeemFee
        targetRedeemFee
        randomSwapFee
        targetSwapFee
      }
      usesFactoryFees
      asset {
        id
        name
        symbol
      }
      manager {
        id
      }
      createdBy {
        id
      }
      eligibilityModule {
        id
        name
        eligibleIds
        eligibleRange
      }
      features {
        enableMint
        enableRandomRedeem
        enableTargetRedeem
        enableRandomSwap
        enableTargetSwap
      }
      inventoryStakingPool {
        id
        dividendToken {
          id
          name
          symbol
        }
      }
      lpStakingPool {
        id
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
      }
    }
  }`;

  let data: Response;

  try {
    data = await querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_SUBGRAPH, network),
      query,
    });

    if (data?.vaults?.length === 1000) {
      const lastVault = data.vaults[data.vaults.length - 1];
      const lastId = Number(lastVault.vaultId) + 1;
      const moreVaults = await fetchSubgraphVaults({
        finalisedOnly,
        includeEmptyVaults,
        manager,
        network,
        vaultAddresses,
        vaultIds,
        retryCount: 0,
        lastId,
      });

      data = {
        ...data,
        vaults: [...data.vaults, ...(moreVaults?.vaults ?? [])],
      };
    }
  } catch (e) {
    console.error(e);
    if (retryCount < 3) {
      return fetchSubgraphVaults({
        network,
        finalisedOnly,
        includeEmptyVaults,
        lastId,
        manager,
        vaultAddresses,
        vaultIds,
        retryCount: retryCount + 1,
      });
    }
    throw e;
  }

  return data;
};

export default fetchSubgraphVaults;
