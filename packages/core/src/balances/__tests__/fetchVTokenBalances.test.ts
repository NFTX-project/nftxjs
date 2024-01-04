import { makeFetchVTokenBalances } from '../fetchVTokenBalances';

let erc20BalancesResponse: any;
let querySubgraph: jest.Mock;
let fetchVTokenBalances: ReturnType<typeof makeFetchVTokenBalances>;
let args: Parameters<typeof fetchVTokenBalances>[0];
let run: () => ReturnType<typeof fetchVTokenBalances>;

beforeEach(() => {
  erc20BalancesResponse = {
    erc20Balances: [
      {
        id: '0x0000000',
        valueExact: '1000000000000000000',
        contract: {
          id: '0x0000000',
          asVaultAsset: {
            vaultId: '0',
          },
        },
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(erc20BalancesResponse);
  fetchVTokenBalances = makeFetchVTokenBalances({ querySubgraph });
  args = {
    userAddresses: ['0x0000000'],
  };
  run = () => fetchVTokenBalances(args);
});

it('returns a list of all vToken balances for a given address', async () => {
  const result = await run();
  expect(result).toEqual([
    {
      type: 'vToken',
      id: '0x0000000',
      vaultId: '0',
      balance: BigInt('1000000000000000000'),
    },
  ]);
});

it('returns a list of vToken balances for a vault address', async () => {
  args.vaultAddresses = ['0x0000000'];
  const result = await run();

  expect(result).toEqual([
    {
      type: 'vToken',
      id: '0x0000000',
      vaultId: '0',
      balance: BigInt('1000000000000000000'),
    },
  ]);
});

it('returns a list of vToken balances for a vaultId', async () => {
  args.vaultIds = ['1'];
  const result = await run();

  expect(result).toEqual([]);
});

describe('when there are more than 1000 balances', () => {
  beforeEach(() => {
    const response = {
      erc20Balances: new Array(1000).fill(
        erc20BalancesResponse.erc20Balances[0]
      ),
    };
    querySubgraph.mockResolvedValueOnce(response);
  });

  it('recusively fetches all balances', async () => {
    const result = await run();

    expect(result.length).toEqual(1001);
    expect(querySubgraph).toHaveBeenCalledTimes(2);
  });
});
