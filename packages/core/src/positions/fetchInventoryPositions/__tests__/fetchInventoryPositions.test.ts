import { formatEther, parseEther } from 'viem';
import { makeFetchClaimableAmount } from '../fetchClaimableAmount';
import { makeFetchInventoryPositions } from '../fetchInventoryPositions';
import { makeFetchPositionsSet } from '../fetchPositionsSet';
import { makeQueryPositionData } from '../queryPositionData';

let subgraphResponse: any;
let querySubgraph: jest.Mock;
let queryPositionData: ReturnType<typeof makeQueryPositionData>;
let contract: any;
let getContract: jest.Mock;
let fetchClaimableAmount: ReturnType<typeof makeFetchClaimableAmount>;
let fetchPositionsSet: ReturnType<typeof makeFetchPositionsSet>;
let fetchInventoryPositions: ReturnType<typeof makeFetchInventoryPositions>;
let run: () => ReturnType<typeof fetchInventoryPositions>;
let args: Parameters<typeof fetchInventoryPositions>[0];

beforeEach(() => {
  subgraphResponse = {
    inventoryPositions: [
      {
        id: '0x1',
        positionId: '1',
        vault: {
          id: '0x1',
          vaultId: '1',
        },
        amount: `${parseEther('1')}`,
        user: {
          id: '0x1',
        },
        merged: false,
        closed: false,
        isParent: false,
        timeLock: false,
        timeLockUntil: '0',
        vTokenTimeLockUntil: '0',
      },
      {
        id: '0x2',
        positionId: '2',
        vault: {
          id: '0x1',
          vaultId: '1',
        },
        amount: '200',
        user: {
          id: '0x2',
        },
        merged: false,
        closed: false,
        isParent: false,
        timeLock: false,
        timeLockUntil: '0',
        vTokenTimeLockUntil: '0',
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(subgraphResponse);
  queryPositionData = makeQueryPositionData({ querySubgraph });

  contract = {
    read: {
      wethBalance: jest.fn().mockResolvedValue(parseEther('1')),
    },
  };
  getContract = jest.fn().mockReturnValue(contract);
  fetchClaimableAmount = makeFetchClaimableAmount({ getContract });

  fetchPositionsSet = makeFetchPositionsSet({
    fetchClaimableAmount,
    queryPositionData,
  });

  fetchInventoryPositions = makeFetchInventoryPositions({
    fetchPositionsSet,
  });

  run = () => fetchInventoryPositions(args);

  args = {
    network: 1,
    vaults: [
      {
        vaultId: '1',
        vTokenToEth: parseEther('1'),
        id: '0x1',
      },
    ],
    provider: {} as any,
  };
});

it('fetches all inventory positions', async () => {
  const positions = await run();

  expect(positions).toHaveLength(2);
  expect(positions[0].id).toBe('0x1');
  expect(positions[0].tokenId).toBe('1');
  expect(formatEther(positions[0].vToken)).toBe('1');
  expect(formatEther(positions[0].vTokenValue)).toBe('1');
});

it('fetches the claimable amount for each position', async () => {
  const positions = await run();

  expect(formatEther(positions[0].claimableRewards)).toBe('1');
  expect(formatEther(positions[1].claimableRewards)).toBe('1');
});

describe('when there are more than 1000 inventory positions', () => {
  beforeEach(() => {
    querySubgraph.mockResolvedValueOnce({
      ...subgraphResponse,
      inventoryPositions: new Array(1000).fill(
        subgraphResponse.inventoryPositions[0]
      ),
    });
  });

  it('recusrively fetches all positions', async () => {
    const positions = await run();

    expect(positions.map((p) => p.id)).toHaveLength(1002);
  });
});

describe('when vaultIds are provided', () => {
  beforeEach(() => {
    args.vaultIds = ['1'];
  });

  it('queries only those vaults', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();

    expect(query).toContain('vault_in: ["0x1"]');
  });
});

describe('when userAddresses are provided', () => {
  beforeEach(() => {
    args.userAddresses = ['0x89'];
  });

  it('queries only those users', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();

    expect(query).toContain('user_in: ["0x89"]');
  });
});

describe('when positionIds are provided', () => {
  beforeEach(() => {
    args.positionIds = ['0x77'];
  });

  it('queries only those positions', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();

    expect(query).toContain('id_in: ["0x77"]');
  });
});
