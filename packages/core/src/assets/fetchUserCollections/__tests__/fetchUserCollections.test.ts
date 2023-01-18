import fetchUserCollectionsAlchemy from '../alchemy';
import type { Response } from '../alchemy';
import type { Address } from '@nftx/types';

let userAddress: Address;
let fetch: jest.Mock;
let response: {
  ok: boolean;
  json: jest.Mock;
  text: jest.Mock;
};
let data: Response;
let run: () => ReturnType<typeof fetchUserCollectionsAlchemy>;

beforeEach(() => {
  userAddress = '0x00';
  data = {
    totalCount: 5,
    contracts: [
      {
        address: '0x0',
        isSpam: false,
        media: [{ bytes: 0, format: '', gateway: '', raw: '', thumbnail: '' }],
        name: 'Gump',
        numDistinctTokensOwned: 1,
        symbol: 'GUMP',
        tokenId: '1',
        tokenType: 'ERC721',
        totalBalance: 1,
        totalSupply: '1',
      },
    ],
  };
  response = {
    ok: true,
    json: jest.fn().mockResolvedValue(data),
    text: jest.fn().mockResolvedValue('some error text'),
  };
  fetch = jest.fn().mockResolvedValue(response);
  run = () => fetchUserCollectionsAlchemy({ fetch, network: 1, userAddress });
});

it('fetches collection data from alchemy', async () => {
  await run();

  expect(fetch).toBeCalledTimes(1);
});

it('returns all collections owned by a user', async () => {
  const result = await run();

  expect(result).toEqual(data.contracts);
});

describe('when alchemy fails', () => {
  beforeEach(() => {
    response.ok = false;
  });

  it('throws an error', async () => {
    await expect(run()).rejects.toThrow();
  });
});

describe('when there are multiple pages', () => {
  beforeEach(() => {
    response.json.mockResolvedValueOnce({
      ...data,
      pageKey: 'example-page-key',
    });
    response.json.mockResolvedValueOnce({
      ...data,
      pageKey: 'example-page-key-2',
    });
  });

  it('calls alchemy multiple times', async () => {
    const result = await run();

    expect(fetch).toBeCalledTimes(3);
    expect(result).toHaveLength(3);
  });
});
