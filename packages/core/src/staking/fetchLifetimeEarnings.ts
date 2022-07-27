import { WeiPerEther, Zero } from '@ethersproject/constants';
import config from '@nftx/config';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { fetchVaults, Vault } from '../vaults';
import { Address, getChainConstant } from '../web3';
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
        aggregatedVaultFees: string;
        vault: {
          address: string;
        };
      }>;
    };
    type Vars = { lastId: string; userAddress: string };

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
      const lastId = response.userVaultFeeAggregates.slice().pop().id;
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
  return async function fetchLifetimeFees({
    userAddress,
    vaults,
    network = config.network,
  }: {
    userAddress: Address;
    vaults?: Vault[];
    network?: number;
  }) {
    const fees = await fetchFeesFromSubgraph({ network, userAddress });

    if (vaults == null) {
      const vaultAddresses = fees.map((fee) => fee.vault.address);
      vaults = await fetchVaults({ network, vaultAddresses });
    }

    return fees.reduce((total, fee) => {
      const vault = vaults.find((vault) => vault.id === fee.vault.address);
      if (vault == null) {
        return total;
      }
      const spotPrice = vault.rawPrice;
      const amount = parseAggregatedFee(fee.aggregatedVaultFees);
      const value = amount.mul(spotPrice).div(WeiPerEther);

      return total.add(value);
    }, Zero);
  };
};
