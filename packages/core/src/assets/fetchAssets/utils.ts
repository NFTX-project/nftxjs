import type { Provider } from '@ethersproject/providers';
import type { Asset, Vault } from '@nftx/types';
import {
  addressEqual,
  checkEligible,
  fetchMerkleLeaves,
  isMerkleVault,
} from '@nftx/utils';

type Item = Pick<Asset, 'assetAddress' | 'tokenId' | 'quantity'>;

export const processAssetItems = async ({
  items,
  network,
  provider,
  vaults,
}: {
  items: Item[];
  vaults: Pick<Vault, 'vaultId' | 'asset' | 'features' | 'eligibilityModule'>[];
  provider: Provider;
  network: number;
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
              network,
            });
            mintableItems = mintableItems.filter((item) =>
              leaves.includes(item.tokenId)
            );
          } else if (vault.eligibilityModule?.id && provider != null) {
            if (vault.eligibilityModule.eligibleIds) {
              mintableItems = mintableItems.filter(({ tokenId }) =>
                vault.eligibilityModule.eligibleIds.includes(tokenId)
              );
            }
            // If the vault has an eligibility module, we need to verify they assets are eligible
            const tokenIds = mintableItems.map((item) => item.tokenId);
            const eligibleResults = await checkEligible({
              provider,
              tokenIds,
              vault,
              network,
            });
            mintableItems = mintableItems.filter(
              (_, i) => eligibleResults[i].eligible
            );
          }

          return mintableItems.map((item) => {
            const asset: Asset = {
              id: `${item.assetAddress}/${item.tokenId}`,
              assetAddress: item.assetAddress,
              tokenId: item.tokenId,
              vaultId: vault.vaultId,
              metaUrl: `https://api.nftx.xyz/asset/${item.assetAddress}/${item.tokenId}?chainId=${network}`,
              quantity: item.quantity,
            };
            return asset;
          });
        });
      })
    )
  ).flat();

  return assets;
};