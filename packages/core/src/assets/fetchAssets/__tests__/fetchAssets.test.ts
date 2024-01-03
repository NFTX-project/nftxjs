import { makeFetchAssets } from '../fetchAssets';
import type _getEligibleAssetVaultIds from '../../fetchUserAssets/getEligibleAssetVaultIds';
import { TokenId, Vault } from '@nftx/types';
import { ReservoirResponse } from '../../fetchUserAssets/types';

let fetchAssets: ReturnType<typeof makeFetchAssets>;
let getEligibleAssetVaultIds: jest.Mock;
let queryReservoir: jest.Mock;
type Args = Parameters<typeof fetchAssets>[0];
let network: number;
let cursor: Args['cursor'];
let provider: any;
let vaults: Args['vaults'];
let assets: Args['assets'];
let reservoirResponse: ReservoirResponse;
let run: () => ReturnType<typeof fetchAssets>;

beforeEach(() => {
  getEligibleAssetVaultIds = jest.fn(
    async ({ vaults }: Parameters<typeof _getEligibleAssetVaultIds>[0]) =>
      vaults.map((v) => v.vaultId)
  );
  queryReservoir = jest.fn(async () => reservoirResponse);
  fetchAssets = makeFetchAssets({
    getEligibleAssetVaultIds,
    queryReservoir,
  });
  network = 1;
  cursor = undefined;
  provider = {};
  vaults = [
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
  ];
  assets = [
    {
      assetAddress: '0x0000000',
      tokenIds: ['0', '1', '2'],
    },
  ];
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
  run = () => fetchAssets({ network, cursor, provider, vaults, assets });
});

it('returns a list of assets', async () => {
  const { assets } = await run();

  const expected = [
    {
      animationUrl: 'example.com/media',
      assetAddress: '0x0000000',
      id: '0x0000000/0',
      imagePreviewUrl: 'example.com/imageSmall',
      imageUrl: 'example.com/image',
      isFlagged: false,
      mintable: true,
      name: 'CryptoPunks',
      quantity: 1n,
      rarity: 0,
      rarityRank: 0,
      tokenId: '0',
      traits: {},
      vaultIds: ['0'],
    },
    {
      animationUrl: 'example.com/media',
      assetAddress: '0x0000000',
      id: '0x0000000/1',
      imagePreviewUrl: 'example.com/imageSmall',
      imageUrl: 'example.com/image',
      isFlagged: false,
      mintable: true,
      name: 'CryptoPunks',
      quantity: 1n,
      rarity: 0,
      rarityRank: 0,
      tokenId: '1',
      traits: {},
      vaultIds: ['0'],
    },
    {
      animationUrl: 'example.com/media',
      assetAddress: '0x0000000',
      id: '0x0000000/2',
      imagePreviewUrl: 'example.com/imageSmall',
      imageUrl: 'example.com/image',
      isFlagged: false,
      mintable: true,
      name: 'CryptoPunks',
      quantity: 1n,
      rarity: 0,
      rarityRank: 0,
      tokenId: '2',
      traits: {},
      vaultIds: ['0'],
    },
  ];

  expect(assets).toEqual(expected);
});

describe('when assets is empty', () => {
  beforeEach(() => {
    assets = [];
  });

  it('returns an empty list', async () => {
    const { assets } = await run();

    expect(assets).toEqual([]);
  });
});

describe('when there is an eligiblity module', () => {
  beforeEach(() => {
    vaults[0].eligibilityModule = {
      eligibleIds: ['1', '2'],
      eligibleRange: ['1', '2'],
      id: '0x0000000',
      name: 'Test Module',
      merkleReference: '',
    };
    getEligibleAssetVaultIds.mockImplementation(async ({ vaults, asset }) => {
      // Mock behaviour for checking eligible token ids
      return (vaults as Vault[])
        .filter((vault) => {
          return vault.eligibilityModule?.eligibleIds?.includes(asset.tokenId);
        })
        .map((vault) => vault.vaultId);
    });
  });

  it('calculates the eligible vaultIds for each asset', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(3);
    expect(assets[0].vaultIds).toEqual([]);
    expect(assets[1].vaultIds).toEqual(['0']);
    expect(assets[2].vaultIds).toEqual(['0']);
  });
});

describe('when there are more than 50 assets', () => {
  beforeEach(() => {
    assets[0].tokenIds = new Array(150)
      .fill(0)
      .map((_, i) => `${i}` as TokenId);
  });

  it('returns a cursor for the next set', async () => {
    let result = await run();
    cursor = result.cursor;

    expect(cursor).toEqual('ncafa__50');

    result = await run();
    cursor = result.cursor;

    expect(cursor).toEqual('ncafa__100');

    result = await run();
    cursor = result.cursor;

    expect(cursor).toEqual(undefined);
  });
});
