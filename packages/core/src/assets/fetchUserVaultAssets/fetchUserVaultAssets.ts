import type { Address, Provider, Vault } from '@nftx/types';
import type { checkEligible, fetchMerkleLeaves } from '@nftx/utils';
import type fetchUserCollectionAssets from '../fetchUserCollectionAssets';
import { processAssetItems } from './utils';

type FetchUserCollectionAssets = typeof fetchUserCollectionAssets;
type CheckEligible = typeof checkEligible;
type FetchMerkleLeaves = typeof fetchMerkleLeaves;

export default ({
  fetchUserCollectionAssets,
  checkEligible,
  fetchMerkleLeaves,
}: {
  fetchUserCollectionAssets: FetchUserCollectionAssets;
  checkEligible: CheckEligible;
  fetchMerkleLeaves: FetchMerkleLeaves;
}) =>
  async function fetchUserVaultAssets({
    network,
    vaults,
    userAddress,
    cursor,
    provider,
  }: {
    network: number;
    userAddress: Address;
    cursor?: string;
    vaults: Pick<
      Vault,
      'asset' | 'vaultId' | 'eligibilityModule' | 'features'
    >[];
    provider: Provider;
  }) {
    const assetAddresses = [...new Set(vaults.map((v) => v.asset.id))];

    const { assets: allAssets, cursor: newCursor } =
      await fetchUserCollectionAssets({
        assetAddresses,
        network,
        userAddress,
        cursor,
      });

    const assets = await processAssetItems({
      items: allAssets,
      network,
      provider,
      vaults,
      checkEligible,
      fetchMerkleLeaves,
    });

    return { assets, cursor: newCursor };
  };
