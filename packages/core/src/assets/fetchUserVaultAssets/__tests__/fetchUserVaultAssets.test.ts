import makeFetchUserVaultAssets from '../fetchUserVaultAssets';
import type { Address, Asset } from '@nftx/types';

let fetchUserVaultAssets: ReturnType<typeof makeFetchUserVaultAssets>;
let run: () => ReturnType<typeof fetchUserVaultAssets>;
type Args = Parameters<typeof fetchUserVaultAssets>[0];
let vaults: Args['vaults'];
let userAddress: Address;
let provider: any;
let assets: Asset[];
let fetchUserCollectionAssets: jest.Mock;
let checkEligible: jest.Mock;
let fetchMerkleLeaves: jest.Mock;

beforeEach(() => {
  provider = {};
  userAddress = '0x00';
  vaults = [
    {
      asset: { id: '0x01', name: 'Test', symbol: 'TEST' },
      eligibilityModule: null as any,
      features: {
        enableMint: true,
        enableRandomRedeem: true,
        enableRandomSwap: true,
        enableTargetRedeem: true,
        enableTargetSwap: true,
      },
      vaultId: '999',
    },
  ];
  assets = [
    {
      assetAddress: '0x01',
      id: '0x01/1',
      tokenId: '1',
      imagePreviewUrl: '',
      imageUrl: '',
      isFlagged: false,
      name: '',
      traits: {},
    },
    {
      assetAddress: '0x01',
      id: '0x01/2',
      tokenId: '2',
      imagePreviewUrl: '',
      imageUrl: '',
      isFlagged: false,
      name: '',
      traits: {},
    },
    {
      assetAddress: '0x02',
      id: '0x01/3',
      tokenId: '3',
      imagePreviewUrl: '',
      imageUrl: '',
      isFlagged: false,
      name: '',
      traits: {},
    },
  ];
  fetchUserCollectionAssets = jest.fn().mockResolvedValue({ assets });
  checkEligible = jest.fn(async ({ tokenIds }: { tokenIds: string[] }) => {
    return tokenIds.map((tokenId) => ({ tokenId, eligible: true }));
  });
  fetchMerkleLeaves = jest.fn().mockResolvedValue([]);
  fetchUserVaultAssets = makeFetchUserVaultAssets({
    fetchUserCollectionAssets,
    checkEligible,
    fetchMerkleLeaves,
  });
  run = () =>
    fetchUserVaultAssets({ network: 1, provider, userAddress, vaults });
});

it('fetches all of a users assets', async () => {
  await run();

  expect(fetchUserCollectionAssets).toBeCalled();
  expect(fetchUserCollectionAssets).toBeCalledWith({
    assetAddresses: ['0x01'],
    network: 1,
    userAddress,
  });
});

it('returns all assets that have valid vaults', async () => {
  const { assets } = await run();

  expect(assets).toHaveLength(2);
  expect(assets).toEqual([
    {
      assetAddress: '0x01',
      id: '0x01/1',
      tokenId: '1',
      vaultId: '999',
      imagePreviewUrl: '',
      imageUrl: '',
      name: '',
      isFlagged: false,
      traits: {},
    },
    {
      assetAddress: '0x01',
      id: '0x01/2',
      tokenId: '2',
      vaultId: '999',
      imagePreviewUrl: '',
      imageUrl: '',
      name: '',
      isFlagged: false,
      traits: {},
    },
  ]);
});

describe('when an asset is eligible for multiple vaults', () => {
  beforeEach(() => {
    vaults.push({
      asset: { id: '0x01', name: 'Test2', symbol: 'TEST2' },
      eligibilityModule: null as any,
      features: {
        enableMint: true,
        enableRandomRedeem: true,
        enableRandomSwap: true,
        enableTargetRedeem: true,
        enableTargetSwap: true,
      },
      vaultId: '998',
    });
  });

  it('includes the asset multiple times', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(4);
    expect(assets.map((x) => x.vaultId)).toEqual(['999', '999', '998', '998']);
  });
});

describe('when vault has a list of eligible ids', () => {
  beforeEach(() => {
    vaults[0].eligibilityModule = {
      id: '0x1',
      eligibleIds: ['2'],
      eligibleRange: null as any,
      merkleReference: null as any,
      name: null as any,
    };
  });

  it('filters out ineligible assets', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(1);
    expect(assets[0].id).toBe('0x01/2');

    expect(checkEligible).toBeCalled();
  });
});
describe('when vault has an eligibility module', () => {
  beforeEach(() => {
    vaults[0].eligibilityModule = {
      id: '0x1',
      eligibleIds: null as any,
      eligibleRange: null as any,
      merkleReference: null as any,
      name: null as any,
    };
    checkEligible.mockImplementation(
      async ({ tokenIds }: { tokenIds: string[] }) => {
        return tokenIds.map((tokenId) => ({
          tokenId,
          eligible: tokenId === '1',
        }));
      }
    );
  });

  it('filters out ineligible assets', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(1);
    expect(assets[0].id).toBe('0x01/1');

    expect(checkEligible).toHaveBeenCalled();
    expect(checkEligible).toHaveBeenCalledWith({
      provider,
      tokenIds: ['1', '2'],
      vault: vaults[0],
    });
  });
});
describe('when vault has merkle eligibility', () => {
  beforeEach(() => {
    vaults[0].eligibilityModule = {
      id: '0x1',
      name: 'MerkleEligibilityTest',
      eligibleIds: null as any,
      eligibleRange: null as any,
      merkleReference: null as any,
    };
    fetchMerkleLeaves.mockResolvedValue(['1']);
  });

  it('filters out ineligible assets', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(1);
    expect(assets[0].tokenId).toBe('1');

    expect(fetchMerkleLeaves).toHaveBeenCalled();
    expect(checkEligible).not.toBeCalled();
  });
});
describe('when vault does not allow minting', () => {
  beforeEach(() => {
    vaults[0].features.enableMint = false;
  });

  it('filters out all assets for the vault', async () => {
    const { assets } = await run();

    expect(assets).toHaveLength(0);
  });
});
