import type { Address, Provider, Vault } from '@nftx/types';
import { addressEqual } from '@nftx/utils';
import isAssetEligibleForVault from '../isAssetEligibleForVault';

type IsAssetEligibleForVault = typeof isAssetEligibleForVault;

const makeGetEligibleAssetVaultIds =
  ({
    isAssetEligibleForVault,
  }: {
    isAssetEligibleForVault: IsAssetEligibleForVault;
  }) =>
  async ({
    asset,
    provider,
    vaults,
  }: {
    vaults: Pick<
      Vault,
      'asset' | 'vaultId' | 'eligibilityModule' | 'features'
    >[];
    asset: { assetAddress: Address; tokenId: `${number}` };
    provider: Provider;
  }) => {
    // Get vaults that use this asset
    const assetVaults = vaults.filter((v) =>
      addressEqual(v.asset.id, asset.assetAddress)
    );
    const vaultIds: string[] = [];

    const promises = assetVaults.map(async (vault) => {
      const isEligible = await isAssetEligibleForVault({
        vault,
        asset,
        provider,
      });
      if (isEligible) {
        vaultIds.push(vault.vaultId);
      }
    });

    await Promise.all(promises);

    return vaultIds;
  };

const getEligibleAssetVaultIds = makeGetEligibleAssetVaultIds({
  isAssetEligibleForVault,
});

export default getEligibleAssetVaultIds;
