import type { Asset } from '../assets';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Vault } from '@nftx/types';
import {
  addressEqual,
  checkEligible,
  fetchMerkleLeaves,
  isMerkleVault,
} from '@nftx/utils';

const filterMintableAssets = async ({
  network = config.network,
  provider,
  vaults,
  assets,
}: {
  network?: number;
  provider: Provider;
  vaults: Pick<Vault, 'asset' | 'features' | 'eligibilityModule' | 'vaultId'>[];
  assets: Asset[];
}) => {
  const result: Array<Asset> = [];

  await Promise.all(
    vaults.map(async (vault) => {
      let vaultAssets = assets.filter((asset) =>
        addressEqual(asset.assetAddress, vault.asset.id)
      );
      if (!vaultAssets.length) {
        return;
      }
      // If minting is disabled on the vault, no assets are mintable
      if (!vault.features.enableMint) {
        return;
      }
      // If there's no eligibility module, all assets are eligible
      if (!vault.eligibilityModule?.id) {
        vaultAssets.forEach((asset) => {
          result.push({ ...asset, vaultId: vault.vaultId });
        });
        return;
      }
      if (isMerkleVault(vault)) {
        const leaves = await fetchMerkleLeaves({ provider, network, vault });
        vaultAssets = vaultAssets.filter((asset) =>
          leaves.includes(asset.tokenId)
        );
      } else {
        const eligible = await checkEligible({
          provider,
          tokenIds: vaultAssets.map((x) => x.tokenId),
          vault,
          network,
        });
        vaultAssets = vaultAssets.filter((_, i) => eligible[i].eligible);
      }

      vaultAssets.forEach((asset) => {
        result.push({
          ...asset,
          vaultId: vault.vaultId,
        });
      });
    })
  );

  return result;
};

export default filterMintableAssets;
