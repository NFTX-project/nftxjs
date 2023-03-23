import type { Address } from '@nftx/types';
import { parseEther } from 'viem';
import { createCursor } from '../cursor';
import fetchAssetsAlchemy from '../fetchAssetsAlchemy';
import type { Response } from '../types';

let response: Response;
let fetch: jest.Mock;
let assetAddresses: Address[];
let cursor: string | undefined;
let userAddress: Address;
let run: () => ReturnType<typeof fetchAssetsAlchemy>;

beforeEach(() => {
  response = {
    blockHash: '',
    totalCount: '1',
    ownedNfts: [
      {
        id: {
          tokenId: '1',
        },
        balance: '1',
        contract: {
          address: '0x0',
        },
      },
    ],
  };
  fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(response),
    text: jest.fn().mockResolvedValue('some error text'),
  });
  assetAddresses = new Array(5).fill('0x001');
  cursor = '';
  userAddress = '0x000';

  run = () =>
    fetchAssetsAlchemy({
      assetAddresses,
      cursor,
      fetch,
      network: 1,
      userAddress,
    });
});

describe('when there are no asset addresses', () => {
  beforeEach(() => {
    assetAddresses = [];
  });

  it('returns an empty list', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(0);
    expect(fetch).not.toBeCalled();
  });
});

it('fetches assets from alchemy for the given owner', async () => {
  await run();

  expect(fetch).toHaveBeenCalled();
});

describe('when there is a cursor', () => {
  beforeEach(() => {
    cursor = createCursor('', assetAddresses, 'xyz');
  });

  it('appends a pageKey parameter', async () => {
    await run();

    const url = fetch.mock.calls[0][0];
    expect(url).toContain('pageKey=xyz');
  });
});

it('returns an array of all assets', async () => {
  const { assets } = await run();

  expect(assets).toEqual([
    {
      assetAddress: '0x0',
      id: '0x0/1',
      metaUrl: 'https://api.nftx.xyz/asset/0x0/1?chainId=1',
      quantity: parseEther('1'),
      tokenId: '1',
    },
  ]);
});

describe('when alchemy returns paginated results', () => {
  beforeEach(() => {
    response.pageKey = 'xyz';
  });

  it('returns a cursor', async () => {
    const { cursor } = await run();

    expect(cursor).toBe('a__0x001__xyz');
  });
});

describe('when alchemy returns a single page of results', () => {
  it('does not return a cursor', async () => {
    const { cursor } = await run();

    expect(cursor).toBe(undefined);
  });
});

describe('when alchemy call fails', () => {
  beforeEach(() => {
    fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(response),
      text: jest.fn().mockResolvedValue('some error text'),
    });
  });
  it('throws an error', async () => {
    await expect(run()).rejects.toThrow();
  });
});
