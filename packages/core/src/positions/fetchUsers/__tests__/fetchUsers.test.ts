import type { Response as ContractsResponse } from '../fetchErc20Contracts';
import makeFetchUsers from '../fetchUsers';
import makeFetchContractBalances from '../fetchContractBalances';
import makeFetchErc20Contracts from '../fetchErc20Contracts';

let queryBalancesSubgraph: jest.Mock;
let queryContractsSubgraph: jest.Mock;
let contractsResponse: ContractsResponse;
let fetchUsers: ReturnType<typeof makeFetchUsers>;
let run: () => ReturnType<typeof fetchUsers>;
let vaults: Parameters<typeof fetchUsers>['0']['vaults'];

beforeEach(() => {
  contractsResponse = {
    erc20Contracts: [
      {
        id: '0x01',
        balances: [
          {
            id: '',
            account: {
              id: '0x03',
            },
          },
          {
            id: '',
            account: { id: '0x04' },
          },
        ],
      },
      {
        id: '0x02',
        balances: [
          {
            id: '',
            account: {
              id: '0x03',
            },
          },
          {
            id: '',
            account: {
              id: '0x05',
            },
          },
        ],
      },
    ],
  };
  vaults = [
    {
      vaultId: '0',
      lpStakingPool: {
        dividendToken: {
          id: '0x01',
        },
      },
      inventoryStakingPool: {
        id: '0x02',
      },
    },
  ];

  queryBalancesSubgraph = jest.fn();
  queryContractsSubgraph = jest.fn().mockResolvedValue(contractsResponse);

  fetchUsers = makeFetchUsers({
    fetchErc20Contracts: makeFetchErc20Contracts({
      querySubgraph: queryContractsSubgraph,
      fetchContractBalances: makeFetchContractBalances({
        querySubgraph: queryBalancesSubgraph,
      }),
    }),
  });
  run = () => fetchUsers({ vaults });
});

it('fetches all staking user addresses for a collection of vaults', async () => {
  const result = await run();

  expect(result).toEqual([
    {
      vaultId: '0',
      users: ['0x03', '0x04', '0x05'],
    },
  ]);
});

describe('when there are more than 1000 contracts', () => {
  beforeEach(() => {
    const firstResponse = {
      ...contractsResponse,
      erc20Contracts: contractsResponse.erc20Contracts
        .flatMap((x) => {
          return new Array(1000).fill(x);
        })
        .slice(0, 1000),
    };
    queryContractsSubgraph.mockResolvedValueOnce(firstResponse);
  });
  it('fetches more contracts recursively', async () => {
    const result = await run();

    expect(queryContractsSubgraph).toBeCalledTimes(2);

    expect(result).toEqual([
      {
        vaultId: '0',
        users: ['0x03', '0x04', '0x05'],
      },
    ]);
  });
});

describe('when there are more than 1000 balances for a single contract', () => {
  beforeEach(() => {
    contractsResponse.erc20Contracts[0].balances = new Array(1000).fill(
      contractsResponse.erc20Contracts[0].balances[0]
    );
    queryBalancesSubgraph.mockResolvedValue({
      erc20Contract: {
        balances: [
          {
            id: '',
            account: {
              id: '0x06',
            },
          },
        ],
      },
    });
  });

  it('fetches more balances recursively', async () => {
    const result = await run();

    expect(queryBalancesSubgraph).toBeCalledTimes(1);
    expect(result).toEqual([
      {
        vaultId: '0',
        users: new Array(1000).fill('0x03').concat(['0x06', '0x05']),
      },
    ]);
  });
});
