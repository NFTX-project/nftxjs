import type { Asset } from '../assets';
import { addressEqual } from '../web3';
import type { Vault } from './types';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import {
  checkEligible,
  fetchMerkleLeaves,
  isMerkleVault,
} from '../eligibility';
import merkleTests from '../eligibility/merkleTests';

const filterMintableAssets = async ({
  network = config.network,
  provider,
  vaults,
  assets,
}: {
  network?: number;
  provider: Provider;
  vaults: Vault[];
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
        const test =
          merkleTests[
            vault.eligibilityModule.merkleReference as keyof typeof merkleTests
          ] ?? merkleTests.DEFAULT;
        const testResults = await Promise.all(
          vaultAssets.map((asset) => test({ asset, leaves, network, provider }))
        );
        vaultAssets = vaultAssets.filter((_, i) => testResults[i]);
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
