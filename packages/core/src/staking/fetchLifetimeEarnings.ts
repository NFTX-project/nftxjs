import config from '@nftx/config';
import { WeiPerEther, Zero } from '@nftx/constants';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { Address, Provider, Vault } from '@nftx/types';
import { addressEqual, getChainConstant } from '@nftx/utils';
import type { fetchVaults } from '../vaults';
import { parseAggregatedFee } from './fetchLifetimeFees';

type QuerySubgraph = typeof querySubgraph;
type FetchVaults = typeof fetchVaults;

export default ({
  querySubgraph,
  fetchVaults,
}: {
  querySubgraph: QuerySubgraph;
  fetchVaults: FetchVaults;
}) => {
  const fetchFeesFromSubgraph = async ({
    lastId = '0',
    network,
    userAddress,
  }: {
    lastId?: string;
    network: number;
    userAddress: Address;
  }) => {
    type Response = {
      userVaultFeeAggregates: Array<{
        id: string;
        aggregatedVaultFees: `${number}`;
        vault: {
          address: Address;
        };
      }>;
    };
    type Vars = { lastId: string; userAddress: Address };

    const query = gql<Response, Vars>`
      {
        userVaultFeeAggregates(
          first: 1000
          where: { id_gt: $lastId, user: $userAddress }
          orderBy: id
          orderDirection: asc
        ) {
          id
          aggregatedVaultFees
          vault {
            address
          }
        }
      }
    `;

    const response = await querySubgraph({
      url: getChainConstant(config.subgraph.NFTX_FEE_TRACKER_SUBGRAPH, network),
      query,
      variables: {
        lastId,
        userAddress,
      },
    });

    let fees = response?.userVaultFeeAggregates ?? [];

    if (fees.length === 1000) {
      const lastId = response?.userVaultFeeAggregates?.slice?.()?.pop?.()?.id;
      const moreFees = await fetchFeesFromSubgraph({
        lastId,
        network,
        userAddress,
      });

      fees = [...fees, ...moreFees];
    }

    return fees;
  };

  /** Fetch the lifetime fees a user has earned in ETH */
  return async function fetchLifetimeEarnings({
    userAddress,
    vaults,
    network = config.network,
    provider,
  }: {
    userAddress: Address;
    vaults?: Pick<Vault, 'reserveWeth' | 'rawPrice' | 'id'>[];
    network?: number;
    provider: Provider;
  }) {
    const fees = await fetchFeesFromSubgraph({ network, userAddress });

    if (vaults == null) {
      const vaultAddresses = fees.map((fee) => fee.vault.address);
      vaults = await fetchVaults({ network, vaultAddresses, provider });
    }

    return fees.reduce((total, fee) => {
      const vault = vaults?.find((vault) =>
        addressEqual(vault.id, fee.vault.address)
      );
      if (vault == null) {
        return total;
      }
      if (vault.reserveWeth < WeiPerEther) {
        return total;
      }

      const spotPrice = vault.rawPrice;
      const amount = parseAggregatedFee(fee.aggregatedVaultFees);
      const value = (amount * spotPrice) / WeiPerEther;

      return total + value;
    }, Zero);
  };
};
