import { makeFetchUserAssets } from '../fetchUserAssets';
import { makeFetchUserAssetsFromReservoir } from '../fetchAssetsFromReservoir';
import type { makeGetEligibleAssetVaultIds } from '../getEligibleAssetVaultIds';
import { ReservoirResponse } from '../types';

type FetchUserAssets = ReturnType<typeof makeFetchUserAssets>;
type Args = Parameters<FetchUserAssets>[0];

let fetchUserAssets: FetchUserAssets;
let fetchAssetsFromReservoir: ReturnType<
  typeof makeFetchUserAssetsFromReservoir
>;
let getEligibleAssetVaultIds: ReturnType<typeof makeGetEligibleAssetVaultIds>;
let reservoirResponse: ReservoirResponse;
let queryReservoir: jest.Mock;
let args: Args;
let run: () => ReturnType<FetchUserAssets>;

beforeEach(() => {
  getEligibleAssetVaultIds = async ({ asset, vaults }) => {
    return vaults
      .filter(
        (vault) =>
          vault.eligibilityModule == null ||
          vault.eligibilityModule.eligibleIds.includes(asset.tokenId)
      )
      .map((vault) => vault.vaultId);
  };
  queryReservoir = jest.fn(async () => reservoirResponse);
  fetchAssetsFromReservoir = makeFetchUserAssetsFromReservoir({
    getEligibleAssetVaultIds,
    queryReservoir,
  });
  fetchUserAssets = makeFetchUserAssets({ fetchAssetsFromReservoir });
  run = () => fetchUserAssets(args);

  reservoirResponse = {
    continuation: '',
    tokens: [
      {
        ownership: null as any,
        token: {
          attributes: [],
          collection: undefined,
          contract: '0x0000000',
          image: 'example.com/image',
          imageSmall: 'example.com/imageSmall',
          isFlagged: false,
          media: 'example.com/media',
          name: 'CryptoPunks',
          imageLarge: 'example.com/imageLarge',
          rarityRank: 0,
          rarityScore: 0,
          supply: 1,
          tokenId: '0',
          kind: 'ERC721',
          metadata: undefined,
          remainingSupply: 1,
        },
      },
      {
        ownership: null as any,
        token: {
          attributes: [],
          collection: undefined,
          contract: '0x0000000',
          image: 'example.com/image',
          imageSmall: 'example.com/imageSmall',
          isFlagged: false,
          media: 'example.com/media',
          name: 'CryptoPunks',
          imageLarge: 'example.com/imageLarge',
          rarityRank: 0,
          rarityScore: 0,
          supply: 1,
          tokenId: '1',
          kind: 'ERC721',
          metadata: undefined,
          remainingSupply: 1,
        },
      },
      {
        ownership: null as any,
        token: {
          attributes: [],
          collection: undefined,
          contract: '0x0000000',
          image: 'example.com/image',
          imageSmall: 'example.com/imageSmall',
          isFlagged: false,
          media: 'example.com/media',
          name: 'CryptoPunks',
          imageLarge: 'example.com/imageLarge',
          rarityRank: 0,
          rarityScore: 0,
          supply: 1,
          tokenId: '2',
          kind: 'ERC721',
          metadata: undefined,
          remainingSupply: 1,
        },
      },
    ],
  };
  args = {
    network: 1,
    provider: {} as any,
    userAddress: '0x0000000',
    vaults: [
      {
        vaultId: '0',
        features: {
          enableMint: true,
          enableRedeem: true,
          enableSwap: true,
        },
        eligibilityModule: undefined as any,
        asset: {
          id: '0x0000000',
          name: 'CryptoPunks',
          symbol: 'PUNK',
        },
      },
    ],
  };
});

it('fetches assets owned by a specific user', async () => {
  const { assets } = await run();

  expect(assets).toHaveLength(3);
  expect(assets[0].assetAddress).toBe('0x0000000');
  expect(assets[0].tokenId).toEqual('0');
  expect(assets[0].vaultIds).toEqual(['0']);
});

describe('when vaultIds are provided', () => {
  it('filters assets by vaultIds', async () => {
    args.vaultIds = ['0'];

    const { assets } = await run();
    expect(assets).toHaveLength(3);

    args.vaultIds = ['1'];

    const { assets: assets2 } = await run();
    expect(assets2).toHaveLength(0);
  });
});

describe('when assetAddresses are provided', () => {
  it('filters assets by assetAddresses', async () => {
    args.assetAddresses = ['0x0000000'];

    const { assets } = await run();
    expect(assets).toHaveLength(3);

    args.assetAddresses = ['0x0000001'];

    const { assets: assets2 } = await run();
    expect(assets2).toHaveLength(0);
  });
});

describe('when there are more than 200 results', () => {
  beforeEach(() => {
    reservoirResponse.continuation = 'abc';
  });

  it('returns a cursor to fetch the next page of results', async () => {
    const { cursor } = await run();

    expect(cursor).toBe('ncafua__abc');
  });
});

describe('when a cursor is provided', () => {
  beforeEach(() => {
    args.cursor = 'ncafua__abc';
  });

  it('fetches the next set of results', async () => {
    await run();

    expect(queryReservoir).toHaveBeenCalledWith({
      network: 1,
      path: '/users/0x0000000/tokens/v7',
      query: {
        limit: 200,
        includeAttributes: true,
        continuation: 'abc',
      },
    });
  });
});

describe('when there is an eligiblity module', () => {
  beforeEach(() => {
    args.vaults[0].eligibilityModule = {
      eligibleIds: ['1', '2'],
      eligibleRange: ['1', '2'],
      id: '0x0000000',
      name: 'Test Module',
      merkleReference: '',
    };
  });

  it('calculates the eligible vaultIds for each asset', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(3);
    expect(assets[0].vaultIds).toEqual([]);
    expect(assets[1].vaultIds).toEqual(['0']);
    expect(assets[2].vaultIds).toEqual(['0']);
  });
});
