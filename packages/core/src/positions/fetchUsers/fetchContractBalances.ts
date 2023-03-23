import config from '@nftx/config';
import { gql, type querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

type QuerySubgraph = typeof querySubgraph;

type Account = { id: Address };
type Balance = {
  id: string;
  account: Account;
};
type Erc20Contract = {
  balances: Balance[];
};

type Response = {
  erc20Contract: Erc20Contract;
};
type Args = {
  id: Address;
  lastId: string;
};

// Fetch balances for a single contract
// We only use this when a contract in fetchEerc20Contracts has more than 1000 balances
// and we need to fetch the next page
export default ({ querySubgraph }: { querySubgraph: QuerySubgraph }) =>
  async function fetchContractBalances({
    id,
    lastId = '0',
    network = config.network,
  }: {
    id: Address;
    lastId?: string;
    retryCount?: number;
    network?: number;
  }): Promise<Balance[]> {
    const query = gql<Response, Args>`
      {
        erc20Contract(id: $id) {
          balances(
            first: 1000
            orderBy: valueExact
            orderDirection: asc
            where: { id_gt: $lastId }
          ) {
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
        id,
        lastId,
      },
    });

    let balances = response?.erc20Contract?.balances ?? [];

    // Handle pagination
    if (balances.length === 1000) {
      const lastId = balances[balances.length - 1].id;
      const moreBalances = await fetchContractBalances({
        id,
        lastId,
      });
      balances = [...balances, ...moreBalances];
    }

    return balances;
  };
