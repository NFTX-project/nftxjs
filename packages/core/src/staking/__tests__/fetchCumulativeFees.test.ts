import type { Address } from '@nftx/types';
import { formatEther, parseEther } from 'viem';
import makeFetchCumulativeFees, { type Response } from '../fetchCumulativeFees';

let blockNumber: number;
let queryResponse: Response;
let timestampFrom: number;
let userAddress: Address;
let vaultIds: Address[];
let querySubgraph: jest.Mock;
let fetchBlockNumberByTimestamp: jest.Mock;
let fetchCumulativeFees: ReturnType<typeof makeFetchCumulativeFees>;
let run: () => ReturnType<typeof fetchCumulativeFees>;

beforeEach(() => {
  blockNumber = 0;
  timestampFrom = 0;
  userAddress = '0x00';
  vaultIds = ['0x0'];
  queryResponse = {
    userVaultFeeAggregates: [
      {
        vault: {
          id: '0x01',
          vaultId: '0',
        },
        aggregatedVaultFees: parseEther('1').toString() as `${number}`,
      },
    ],
    user: {
      earnings: [
        {
          vault: {
            id: '0x',
            address: '0x01',
            ticker: 'PUNK',
            vaultId: '0',
          },
          action: {
            id: 'mint',
            label: 'MINT',
          },
          amount: parseEther('1').toString() as `${number}`,
          timestamp: '0',
        },
        {
          vault: {
            id: '0x',
            address: '0x01',
            ticker: 'PUNK',
            vaultId: '0',
          },
          action: {
            id: 'mint',
            label: 'MINT',
          },
          amount: parseEther('1').toString() as `${number}`,
          timestamp: '0',
        },
        {
          vault: {
            id: '0x',
            address: '0x01',
            ticker: 'PUNK',
            vaultId: '0',
          },
          action: {
            id: 'swap',
            label: 'SWAP',
          },
          amount: parseEther('1').toString() as `${number}`,
          timestamp: '0',
        },
        {
          vault: {
            id: '0x',
            address: '0x01',
            ticker: 'PUNK',
            vaultId: '0',
          },
          action: {
            id: 'swap',
            label: 'SWAP',
          },
          amount: parseEther('1').toString() as `${number}`,
          timestamp: '7200',
        },
        {
          vault: {
            id: '0x',
            address: '0x01',
            ticker: 'PUNK',
            vaultId: '0',
          },
          action: {
            id: 'swap',
            label: 'SWAP',
          },
          amount: parseEther('1').toString() as `${number}`,
          timestamp: '7230',
        },
      ],
    },
  };
  querySubgraph = jest.fn().mockResolvedValue(queryResponse);
  fetchBlockNumberByTimestamp = jest.fn().mockResolvedValue(blockNumber);

  fetchCumulativeFees = makeFetchCumulativeFees({
    fetchBlockNumberByTimestamp,
    querySubgraph,
  });
  run = () =>
    fetchCumulativeFees({ timestampFrom, userAddress, vaultIds, network: 1 });
});

it('returns a list of cumulative fees', async () => {
  const result = await run();

  expect(result).toHaveLength(3);

  expect(result[0]).toHaveProperty('amount');
  expect(result[0]).toHaveProperty('timestamp');
  expect(result[0]).toHaveProperty('txnId');
  expect(result[0]).toHaveProperty('type');
});

it('sorts fees by most recent', async () => {
  const result = await run();

  const timestamps = result.map((x) => x.timestamp);

  expect(timestamps).toEqual([7200, 0, 0]);
});

it('adds together fees earned in the same timestamp and type', async () => {
  const result = await run();

  const types = result.map((x) => x.type);
  const amounts = result.map((x) => formatEther(x.amount));

  expect(types).toEqual(['swap', 'mint', 'swap']);
  expect(amounts).toEqual(['2', '2', '1']);
});

it('passes hex-encoded vault, IP, and LP ids to the subgraph request', async () => {
  await run();

  const variables = querySubgraph.mock.calls[0][0].variables;
  // Vault ID as a hex
  expect(variables.vaultHexIds).toEqual(['0x0']);
  // Vault ID hex + user address + IP/LP (0/1)
  expect(variables.ids).toEqual(['0x0-0x00-0x1', '0x0-0x00-0x0']);
});

describe('when timestamp is a fractional number', () => {
  beforeEach(() => {
    timestampFrom = 100.5;
  });

  it('rounds the timestamp down', async () => {
    await run();

    const variables = querySubgraph.mock.calls[0][0].variables;

    expect(variables.timestampFrom).toBe(100);
  });
});

describe('when aggregated vault fees is a fractional big number', () => {
  beforeEach(() => {
    queryResponse.userVaultFeeAggregates[0].aggregatedVaultFees += '.1233210';
  });

  it('does not throw an error', async () => {
    await expect(run()).resolves.not.toThrow();
  });
});
