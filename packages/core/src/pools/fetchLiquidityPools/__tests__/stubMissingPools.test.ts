import { FeeTier } from '@nftx/constants';
import { makeStubMissingPools } from '../stubMissingPools';

const computePool = async ({
  args: [vaultAddress, feeTier],
}: {
  args: [string, FeeTier];
}) => {
  return `${vaultAddress}-${feeTier}`;
};

let contract: any;
let getContract: jest.Mock;
let stubMissingPools: ReturnType<typeof makeStubMissingPools>;
let args: Parameters<typeof stubMissingPools>[0];
let run: () => ReturnType<typeof stubMissingPools>;

beforeEach(() => {
  contract = { read: { computePool } };
  getContract = jest.fn().mockReturnValue(contract);
  args = {
    vaults: [
      {
        id: '0x0',
        vaultId: '0',
        token: {
          id: '0x0',
          symbol: '0x0',
          name: '0x0',
        },
      },
      {
        id: '0x1',
        vaultId: '1',
        token: {
          id: '0x1',
          symbol: '0x1',
          name: '0x1',
        },
      },
      {
        id: '0x2',
        vaultId: '2',
        token: {
          id: '0x2',
          symbol: '0x2',
          name: '0x2',
        },
      },
    ],
    provider: {} as any,
    network: 1,
    pools: [
      {
        feeTier: 3_000,
        vaultId: '1',
      },
      {
        feeTier: 3_000,
        vaultId: '2',
      },
      {
        feeTier: 10_000,
        vaultId: '2',
      },
      {
        feeTier: 30_000,
        vaultId: '2',
      },
    ],
  };
  stubMissingPools = makeStubMissingPools({ getContract });
  run = () => stubMissingPools(args);
});

it('stubs missing pools', async () => {
  const pools = await run();

  expect(pools.map((p) => [p.vaultId, p.feeTier])).toEqual([
    ['0', 3_000],
    ['0', 10_000],
    ['0', 30_000],
    ['1', 10_000],
    ['1', 30_000],
  ]);
});

it('sets exists to false', async () => {
  const pools = await run();

  expect(pools.every((p) => p.exists === false)).toBe(true);
});

it('calculates the pool address', async () => {
  const pools = await run();

  expect(pools.map((p) => p.id)).toEqual([
    '0x0-3000',
    '0x0-10000',
    '0x0-30000',
    '0x1-10000',
    '0x1-30000',
  ]);
});

describe('when all pools already exist for a vault', () => {
  beforeEach(() => {
    args.pools = [
      {
        feeTier: 3_000,
        vaultId: '0',
      },
      {
        feeTier: 10_000,
        vaultId: '0',
      },
      {
        feeTier: 30_000,
        vaultId: '0',
      },
    ];
    args.vaults = [args.vaults[0]];
  });

  it('does not stub any pools', async () => {
    const pools = await run();

    expect(pools).toHaveLength(0);
  });
});

describe('when vaultIds are provided', () => {
  beforeEach(() => {
    args.vaultIds = ['1'];
  });

  it('only stubs pools for the specified vaults', async () => {
    const pools = await run();

    expect(pools).toHaveLength(2);
    expect(pools.every((p) => p.vaultId === '1')).toBe(true);
  });
});

describe('when vaultAddresses are provided', () => {
  beforeEach(() => {
    args.vaultAddresses = ['0x0'];
  });

  it('only stubs pools for the specified vaults', async () => {
    const pools = await run();

    expect(pools).toHaveLength(3);
    expect(pools.every((p) => p.vaultId === '0')).toBe(true);
  });
});

describe('when poolIds are provided', () => {
  beforeEach(() => {
    args.poolIds = ['0x0-3000'];
  });

  it('does not stub any pools', async () => {
    const pools = await run();

    expect(pools).toHaveLength(0);
  });
});
