import config from '@nftx/config';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import type fetchContractBalances from './fetchContractBalances';

type FetchContractBalances = ReturnType<typeof fetchContractBalances>;
type QuerySubgraph = typeof querySubgraph;

type Account = { id: Address };
type Balance = {
  id: string;
  account: Account;
};
type Erc20Contract = {
  id: Address;
  balances: Balance[];
};

export type Response = {
  erc20Contracts: Erc20Contract[];
};
type Args = {
  addresses: Address[];
  lastId: string;
};

// Fetch all contracts and balances for the given addresses
export default ({
  fetchContractBalances,
  querySubgraph,
}: {
  querySubgraph: QuerySubgraph;
  fetchContractBalances: FetchContractBalances;
}) =>
  async function fetchErc20Contracts({
    contractAddresses,
    network = config.network,
    lastId = '0',
  }: {
    contractAddresses: Address[];
    lastId?: string;
    retryCount?: number;
    network?: number;
  }): Promise<Erc20Contract[]> {
    const query = gql<Response, Args>`
      {
        erc20Contracts(
          first: 1000
          orderBy: id
          orderDirection: asc
          where: { id_in: $addresses, id_gt: $lastId }
        ) {
          id
          balances(first: 1000, orderBy: valueExact, orderDirection: asc) {
            id
            account {
              id
            }
          }
        }
      }
    `;

    const response = await querySubgraph({
      url: getChainConstant(
        config.subgraph.NFTX_TOKEN_BALANCE_SUBGRAPH,
        network
      ),
      query,
      variables: {
        addresses: contractAddresses,
        lastId,
      },
    });
    let contracts = response.erc20Contracts ?? [];

    // Handle contract pagination
    if (contracts.length === 1000) {
      const lastId = contracts[contracts.length - 1].id;
      const moreContracts = await fetchErc20Contracts({
        contractAddresses,
        lastId,
      });
      contracts = [...contracts, ...moreContracts];
    }

    for (const contract of contracts) {
      // Handle balance pagination
      if (contract.balances.length === 1000) {
        const lastId = contract.balances[contract.balances.length - 1].id;
        const moreBalances = await fetchContractBalances({
          id: contract.id,
          lastId,
        });
        contract.balances = [...contract.balances, ...moreBalances];
      }
    }

    return contracts;
  };
