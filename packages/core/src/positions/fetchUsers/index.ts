import makeFetchUsers from './fetchUsers';
import makeFetchErc20Contracts from './fetchErc20Contracts';
import makeFetchContractBalances from './fetchContractBalances';
import { querySubgraph } from '@nftx/subgraph';

const fetchContractBalances = makeFetchContractBalances({ querySubgraph });
const fetchErc20Contracts = makeFetchErc20Contracts({
  fetchContractBalances,
  querySubgraph,
});
const fetchUsers = makeFetchUsers({ fetchErc20Contracts });

export default fetchUsers;
