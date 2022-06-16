import type { Asset } from '../assets';
import { addressEqual, getContract } from '../web3';
import type { Vault } from './types';
import Abi from '@nftx/constants/abis/NFTXEligibility.json';
import type { Provider } from '@ethersproject/providers';

const filterMintableAssets = async ({
  network,
  provider,
  vaults,
  assets,
}: {
  network: number;
  provider: Provider;
  vaults: Vault[];
  assets: Asset[];
}) => {
  const result: Array<Asset> = [];

  await Promise.all(
    vaults.map(async (vault) => {
      const vaultAssets = assets.filter((asset) =>
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
      // Check if each asset is eligible
      const contract = getContract({
        network,
        provider,
        address: vault.eligibilityModule.id,
        abi: Abi,
      });
      const eligible = await contract.checkEligible(
        vaultAssets.map((x) => x.tokenId)
      );
      eligible.forEach((eligible: boolean, i: number) => {
        if (eligible) {
          result.push({ ...vaultAssets[i], vaultId: vault.vaultId });
        }
      });
    })
  );

  return result;
};

export default filterMintableAssets;
