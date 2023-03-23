import config from '@nftx/config';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import fetchContractBalances from './fetchContractBalances';

type Account = { id: Address };
type Balance = {
  id: string;
  account: Account;
};
type Erc20Contract = {
  id: Address;
  balances: Balance[];
};

type Response = {
  erc20Contracts: Erc20Contract[];
};
type Args = {
  addresses: Address[];
  lastId: string;
};

const fetchErc20Contracts = async ({
  contractAddresses,
  network = config.network,
  lastId = '0',
}: {
  contractAddresses: Address[];
  lastId?: string;
  retryCount?: number;
  network?: number;
}): Promise<Erc20Contract[]> => {
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
    url: getChainConstant(config.subgraph.NFTX_TOKEN_BALANCE_SUBGRAPH, network),
    query,
    variables: {
      addresses: contractAddresses,
      lastId,
    },
  });
  let contracts = response.erc20Contracts ?? [];

  if (contracts.length === 1000) {
    const lastId = contracts[contracts.length - 1].id;
    const moreContracts = await fetchErc20Contracts({
      contractAddresses,
      lastId,
    });
    contracts = [...contracts, ...moreContracts];
  }

  for (const contract of contracts) {
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

export default fetchErc20Contracts;
