import { makeFetchPoolIdsForVaultIds } from '../fetchPoolIdsForVaultIds';

const trim = (s: string) => {
  return s.replace(/[\s\n]/g, '');
};

let subgraphResponse: any;
let querySubgraph: jest.Mock;
let fetchPoolIdsForVaultIds: ReturnType<typeof makeFetchPoolIdsForVaultIds>;
let run: () => ReturnType<typeof fetchPoolIdsForVaultIds>;
let args: Parameters<typeof fetchPoolIdsForVaultIds>[0];

beforeEach(() => {
  subgraphResponse = {
    liquidityPools: [
      {
        id: '0x3',
      },
      {
        id: '0x4',
      },
      {
        id: '0x5',
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(subgraphResponse);

  fetchPoolIdsForVaultIds = makeFetchPoolIdsForVaultIds({ querySubgraph });
  run = () => fetchPoolIdsForVaultIds(args);

  args = {
    network: 1,
    vaultIds: ['0', '1'],
    vaults: [
      {
        id: '0x0',
        vaultId: '0',
      },
      {
        id: '0x1',
        vaultId: '1',
      },
      {
        id: '0x2',
        vaultId: '2',
      },
    ],
  };
});

it('takes a set of vaultIds and returns poolIds for them', async () => {
  const poolIds = await run();

  expect(poolIds).toEqual(['0x3', '0x4', '0x5']);
});

it('uses the the vault addresses to match up with pool input tokens', async () => {
  await run();

  expect(querySubgraph).toHaveBeenCalled();
  const query = querySubgraph.mock.calls[0][0].query.toString();

  expect(trim(query)).toContain(
    trim(`where:
      {
        inputTokens_: {
          id_in: ["0x0", "0x1"]
        }
      }
    `)
  );
});

describe('when there are more than 1000 pools', () => {
  beforeEach(() => {
    querySubgraph.mockResolvedValueOnce({
      liquidityPools: Array(1000).fill({ id: '0x3' }),
    });
  });

  it('recursively fetches all poolIds for vaultIds', async () => {
    const poolIds = await run();

    expect(poolIds.length).toEqual(1003);
  });
});
