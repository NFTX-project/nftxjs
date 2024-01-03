import { makeIsAssetEligibleForVault } from '../../isAssetEligibleForVault';
import { makeGetEligibleAssetVaultIds } from '../getEligibleAssetVaultIds';

let getEligibleAssetVaultIds: ReturnType<typeof makeGetEligibleAssetVaultIds>;
let isAssetEligibleForVault: ReturnType<typeof makeIsAssetEligibleForVault>;
let args: Parameters<typeof getEligibleAssetVaultIds>[0];
let run: () => ReturnType<typeof getEligibleAssetVaultIds>;

beforeEach(() => {
  isAssetEligibleForVault = jest.fn(async ({ vault, asset }) =>
    vault.eligibilityModule.eligibleIds.includes(asset.tokenId)
  );
  getEligibleAssetVaultIds = makeGetEligibleAssetVaultIds({
    isAssetEligibleForVault,
  });
  args = {
    asset: {
      assetAddress: '0x00000',
      tokenId: '1',
    },
    provider: null as any,
    vaults: [
      {
        asset: {
          id: '0x00000',
          name: 'CryptoPunks',
          symbol: 'PUNK',
        },
        eligibilityModule: {
          id: '0x00000',
          eligibleIds: ['0'],
          eligibleRange: ['0', '1000'],
          merkleReference: '',
          name: '',
        },
        features: {
          enableMint: true,
          enableRedeem: true,
          enableSwap: true,
        },
        vaultId: '0',
      },
      {
        asset: {
          id: '0x00000',
          name: 'CryptoPunks',
          symbol: 'PUNK',
        },
        eligibilityModule: {
          id: '0x00000',
          eligibleIds: ['1'],
          eligibleRange: ['0', '1000'],
          merkleReference: '',
          name: '',
        },
        features: {
          enableMint: true,
          enableRedeem: true,
          enableSwap: true,
        },
        vaultId: '1',
      },
    ],
  };
  run = () => getEligibleAssetVaultIds(args);
});

it('returns a list of vaultIds that the asset is eligible for', async () => {
  const result = await run();

  expect(result).toEqual(['1']);
});
