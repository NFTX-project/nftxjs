import type { Asset, Provider, Vault } from '@nftx/types';
import {
  addressEqual,
  type checkEligible,
  type fetchMerkleLeaves,
  isMerkleVault,
} from '@nftx/utils';

type Item = Asset;
type CheckEligible = typeof checkEligible;
type FetchMerkleLeaves = typeof fetchMerkleLeaves;

export const processAssetItems = async ({
  items,
  provider,
  vaults,
  checkEligible,
  fetchMerkleLeaves,
}: {
  items: Item[];
  vaults: Pick<Vault, 'vaultId' | 'asset' | 'features' | 'eligibilityModule'>[];
  provider: Provider;
  checkEligible: CheckEligible;
  fetchMerkleLeaves: FetchMerkleLeaves;
}) => {
  // Group all of the items by asset address
  const tokensByAsset = items.reduce((acc, item) => {
    if (!acc[item.assetAddress]) {
      acc[item.assetAddress] = [];
    }
    acc[item.assetAddress].push(item);

    return acc;
  }, {} as Record<string, Item[]>);

  // We have to do multiple steps in order to get everything we need
  // We need to match up assets to vaults (there can be multiple vaults per asset)
  // Then filter out assets that aren't mintable or eligible
  const assets = (
    await Promise.all(
      // Loop through each asset address
      Object.entries(tokensByAsset).flatMap(([address, items]) => {
        // Get vaults that use this asset
        const assetVaults = vaults.filter((v) =>
          addressEqual(v.asset.id, address)
        );
        return assetVaults.map(async (vault) => {
          let mintableItems = items;
          if (!vault.features.enableMint) {
            // If minting is disabled, no assets are mintable
            mintableItems = [];
          } else if (isMerkleVault(vault) && provider != null) {
            // If it's a merkle vault, we need to check the token id against the list of leaves
            const leaves = await fetchMerkleLeaves({
              provider,
              vault,
            });
            mintableItems = mintableItems.filter((item) =>
              leaves.includes(item.tokenId)
            );
          } else if (vault.eligibilityModule?.id && provider != null) {
            // If we have an upfront list of eligible ids, we can quickly filter them out
            if (vault.eligibilityModule.eligibleIds) {
              mintableItems = mintableItems.filter(({ tokenId }) =>
                vault.eligibilityModule.eligibleIds.includes(tokenId)
              );
            }
            if (mintableItems.length) {
              // If the vault has an eligibility module, we need to verify they assets are eligible
              const tokenIds = mintableItems.map((item) => item.tokenId);
              const eligibleResults = await checkEligible({
                provider,
                tokenIds,
                vault,
              });
              mintableItems = mintableItems.filter(
                (_, i) => eligibleResults[i].eligible
              );
            }
          }

          return mintableItems.map((item) => {
            const asset: Asset = {
              ...item,
              vaultId: vault.vaultId,
            };
            return asset;
          });
        });
      })
    )
  ).flat();

  return assets;
};
