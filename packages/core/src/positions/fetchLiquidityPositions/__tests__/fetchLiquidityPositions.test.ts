import { formatEther, parseEther } from 'viem';
import { makeFetchLiquidityPositions } from '../fetchLiquidityPositions';
import { makeFetchPositionsSet } from '../fetchPositionsSet';
import { makeQueryPositionData } from '../queryPositionData';
import { getChainConstant } from '@nftx/utils';
import { MAX_TICK, MIN_TICK, WETH_TOKEN } from '@nftx/constants';
import { MAX_PRICE } from '@nftx/constants';
import { MIN_PRICE } from '@nftx/constants';
import { NftxV3Uniswap } from '@nftx/types';

let subggraphResponse: { positions: NftxV3Uniswap.Position[] };
let querySubgraph: jest.Mock;
let queryPositionData: ReturnType<typeof makeQueryPositionData>;
let fetchClaimableAmount: jest.Mock;
let fetchPoolIdsForVaultIds: jest.Mock;
let fetchPositionsSet: ReturnType<typeof makeFetchPositionsSet>;
let fetchLiquidityPositions: ReturnType<typeof makeFetchLiquidityPositions>;
let args: Parameters<typeof fetchLiquidityPositions>[0];
let run: () => ReturnType<typeof fetchLiquidityPositions>;

beforeEach(() => {
  const _token = {} as NftxV3Uniswap.Token;
  const _pool = {} as NftxV3Uniswap.Pool;
  const _owner = {} as NftxV3Uniswap.Account;
  const _position = {} as NftxV3Uniswap.Position;

  subggraphResponse = {
    positions: [
      {
        ..._position,
        id: '0x1',
        tokenId: '1',
        liquidity: '5431575616225859850',
        depositedToken0: '100',
        depositedToken1: '100',
        withdrawnToken0: '100',
        withdrawnToken1: '100',
        lockedUntil: '0',
        tickUpper: -23160,
        tickLower: -36960,
        pool: {
          ..._pool,
          id: '0x2',
          tick: '-24000',
          inputTokens: [
            { ..._token, id: '0xe770493b2663004b356d3374ec23ea52f6c82ca6' },
            { ..._token, id: getChainConstant(WETH_TOKEN, 1) },
          ],
        },
        owner: { ..._owner, id: '0x4' },
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(subggraphResponse);
  queryPositionData = makeQueryPositionData({ querySubgraph });

  fetchClaimableAmount = jest
    .fn()
    .mockResolvedValue([parseEther('1'), parseEther('0.5')]);

  fetchPoolIdsForVaultIds = jest
    .fn()
    .mockResolvedValue([subggraphResponse.positions[0].pool.id]);
  fetchPositionsSet = makeFetchPositionsSet({
    fetchClaimableAmount,
    queryPositionData,
  });
  fetchLiquidityPositions = makeFetchLiquidityPositions({
    fetchPoolIdsForVaultIds,
    fetchPositionsSet,
  });
  args = {
    provider: {} as any,
    vaults: [
      {
        id: '0xe770493b2663004b356d3374ec23ea52f6c82ca6',
        vaultId: '0',
        vTokenToEth: BigInt('88179692777707444'),
      },
      {
        id: '0x6',
        vaultId: '1',
        vTokenToEth: parseEther('1'),
      },
    ],
  };
  run = () => fetchLiquidityPositions(args);
});

it('returns all liquidity positions', async () => {
  const positions = await run();

  expect(positions.length).toBe(1);
  expect(positions[0].id).toBe('0x1');
  expect(positions[0].poolId).toBe('0x2');
  expect(positions[0].tokenId).toBe('1');
  expect(formatEther(positions[0].liquidity)).toBe('5.43157561622585985');
});

describe('when vaultIds are provided', () => {
  beforeEach(() => {
    args.vaultIds = ['1'];
  });

  it('fetches poolIds for vaultIds', async () => {
    await run();

    expect(fetchPoolIdsForVaultIds).toHaveBeenCalledWith({
      network: 1,
      vaultIds: ['1'],
      vaults: args.vaults,
    });
  });
});

describe('when poolIds are provided', () => {
  beforeEach(() => {
    args.poolIds = ['0x2'];
  });

  it('fetches positions by poolIds', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();

    expect(query).toContain('pool_in: ["0x2"]');
  });
});

describe('when positionIds are provided', () => {
  beforeEach(() => {
    args.positionIds = ['0x1'];
  });

  it('fetches positions by positionIds', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();

    expect(query).toContain('id_in: ["0x1"]');
  });
});

describe('when userAddresses are provided', () => {
  beforeEach(() => {
    args.userAddresses = ['0x4'];
  });

  it('fetches positions by userAddresses', async () => {
    await run();

    const query = querySubgraph.mock.calls[0][0].query.toString();

    expect(query).toContain('owner_in: ["0x4"]');
  });
});

describe('when more than 1000 positions are returned', () => {
  beforeEach(() => {
    querySubgraph.mockResolvedValueOnce({
      ...subggraphResponse,
      positions: Array.from({ length: 1000 }).map((_, i) => ({
        ...subggraphResponse.positions[0],
        id: `0x${i}`,
      })),
    });
  });

  it('recursively fetches all positions', async () => {
    const positions = await run();

    expect(positions.length).toBe(1001);
  });
});

describe('when in range', () => {
  it('sets inRange to true', async () => {
    const positions = await run();

    expect(positions[0].inRange).toBe(true);
  });
});

describe('when out of range', () => {
  beforeEach(() => {
    subggraphResponse.positions[0].pool.tick = '200';
  });

  it('sets inRange to false', async () => {
    const positions = await run();

    expect(positions[0].inRange).toBe(false);
  });
});

it('calculates eth and vToken and ETH values', async () => {
  const positions = await run();

  expect(formatEther(positions[0].eth)).toBe('0.780222862082123967');
  expect(formatEther(positions[0].vToken)).toBe('0.741639611548487752');
  expect(formatEther(positions[0].vTokenValue)).toBe('0.065397553098123939');
  expect(formatEther(positions[0].value)).toBe('0.845620415180247906');
});

it('calculate the tick values', async () => {
  const positions = await run();

  expect(formatEther(positions[0].tickLowerValue)).toBe('0.024827205966373578');
  expect(formatEther(positions[0].tickValue)).toBe('0.090728839371226339');
  expect(formatEther(positions[0].tickUpperValue)).toBe('0.098678892777293698');
  expect(positions[0].isFullRange).toBe(false);
});

describe('when position has an infinite range', () => {
  beforeEach(() => {
    subggraphResponse.positions[0].tickLower = MIN_TICK;
    subggraphResponse.positions[0].tickUpper = MAX_TICK;
  });

  it('sets infiniteRange to true', async () => {
    const positions = await run();

    expect(positions[0].tickUpperValue >= MAX_PRICE).toBe(true);
    expect(positions[0].tickLowerValue <= MIN_PRICE).toBe(true);
    expect(positions[0].isFullRange).toBe(true);
  });
});
