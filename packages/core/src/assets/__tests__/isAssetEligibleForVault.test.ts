import { makeIsAssetEligibleForVault } from '../isAssetEligibleForVault';

let checkEligible: jest.Mock;
let fetchMerkleLeaves: jest.Mock;
let isMerkleVault: jest.Mock;
let isAssetEligibleForVault: ReturnType<typeof makeIsAssetEligibleForVault>;
let args: Parameters<typeof isAssetEligibleForVault>[0];
let run: () => ReturnType<typeof isAssetEligibleForVault>;

beforeEach(() => {
  checkEligible = jest.fn().mockResolvedValue([{ eligible: true }]);
  fetchMerkleLeaves = jest.fn().mockResolvedValue(['51', '52', '53']);
  isMerkleVault = jest.fn().mockReturnValue(false);
  isAssetEligibleForVault = makeIsAssetEligibleForVault({
    checkEligible,
    fetchMerkleLeaves,
    isMerkleVault,
  });
  run = () => isAssetEligibleForVault(args);

  args = {
    asset: {
      assetAddress: '0x00000',
      tokenId: '1',
    },
    provider: {} as any,
    vault: {
      asset: {
        id: '0x00000',
        name: 'CryptoPunks',
        symbol: 'PUNK',
      },
      eligibilityModule: {
        id: '0x00000',
        eligibleIds: null as any,
        eligibleRange: null as any,
        merkleReference: '',
        name: '',
      },
      features: {
        enableMint: true,
        enableRedeem: true,
        enableSwap: true,
      },
    },
  };
});

describe('when vault and asset addresses dont match', () => {
  beforeEach(() => {
    args.vault.asset.id = '0x00001';
    args.asset.assetAddress = '0x00002';
  });

  it('returns false', async () => {
    expect(await run()).toBe(false);
  });
});

describe('when vault does not allow minting', () => {
  beforeEach(() => {
    args.vault.features.enableMint = false;
  });

  it('returns false', async () => {
    expect(await run()).toBe(false);
  });
});

describe('when vault has no eligibility module', () => {
  beforeEach(() => {
    args.vault.eligibilityModule = undefined as any;
  });

  it('returns true as there is any asset is eligible', async () => {
    expect(await run()).toBe(true);
  });
});

describe('when vault has eligibile ids', () => {
  describe('when asset is in the list', () => {
    beforeEach(() => {
      args.vault.eligibilityModule.eligibleIds = [args.asset.tokenId];
    });

    it('returns true', async () => {
      expect(await run()).toBe(true);
    });
  });
  describe('when asset is not in the list', () => {
    beforeEach(() => {
      args.vault.eligibilityModule.eligibleIds = ['2'];
    });

    it('returns false', async () => {
      expect(await run()).toBe(false);
    });
  });
});

describe('when vault has eligibile range', () => {
  describe('when asset is in the range', () => {
    beforeEach(() => {
      checkEligible.mockResolvedValue([{ eligible: true }]);
    });

    it('returns true', async () => {
      expect(await run()).toBe(true);
    });
  });
  describe('when asset is not in the range', () => {
    beforeEach(() => {
      checkEligible.mockResolvedValue([{ eligible: false }]);
    });

    it('returns false', async () => {
      expect(await run()).toBe(false);
    });
  });
});

describe('when vault has merkle eligibility', () => {
  beforeEach(() => {
    isMerkleVault.mockReturnValue(true);
  });

  describe('when asset is in the merkle tree', () => {
    beforeEach(() => {
      fetchMerkleLeaves.mockResolvedValue(['1', '2', '3']);
    });

    it('returns true', async () => {
      expect(await run()).toBe(true);
    });
  });
  describe('when asset is not in the merkle tree', () => {
    beforeEach(() => {
      fetchMerkleLeaves.mockResolvedValue(['2', '3']);
    });

    it('returns false', async () => {
      expect(await run()).toBe(false);
    });
  });
});
