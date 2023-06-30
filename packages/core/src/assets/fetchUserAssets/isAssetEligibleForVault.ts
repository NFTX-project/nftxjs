import type { Provider, Vault } from '@nftx/types';
import { checkEligible, fetchMerkleLeaves, isMerkleVault } from '@nftx/utils';

type IsMerkleVault = typeof isMerkleVault;
type FetchMerkleLeaves = typeof fetchMerkleLeaves;
type CheckEligible = typeof checkEligible;

const makeIsAssetEligibleForVault =
  ({
    checkEligible,
    fetchMerkleLeaves,
    isMerkleVault,
  }: {
    isMerkleVault: IsMerkleVault;
    fetchMerkleLeaves: FetchMerkleLeaves;
    checkEligible: CheckEligible;
  }) =>
  async ({
    asset,
    provider,
    vault,
  }: {
    vault: Pick<Vault, 'features' | 'eligibilityModule'>;
    asset: { tokenId: `${number}` };
    provider: Provider;
  }) => {
    if (vault.features.enableMint) {
      return false;
    }
    if (isMerkleVault(vault) && provider != null) {
      // If it's a merkle vault, we need to check the token id against the list of leaves
      const leaves = await fetchMerkleLeaves({
        provider,
        vault,
      });
      return leaves.includes(asset.tokenId);
    }
    if (vault.eligibilityModule?.id && provider != null) {
      if (vault.eligibilityModule.eligibleIds) {
        return vault.eligibilityModule.eligibleIds.includes(asset.tokenId);
      }
      const eligibleResults = await checkEligible({
        vault,
        provider,
        tokenIds: [asset.tokenId],
      });
      return eligibleResults[0].eligible;
    }
    return true;
  };

export default makeIsAssetEligibleForVault({
  checkEligible,
  fetchMerkleLeaves,
  isMerkleVault,
});
