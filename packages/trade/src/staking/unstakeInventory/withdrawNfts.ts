import { NFTXUnstakingInventoryZap } from '@nftx/abi';
import {
  NFTX_UNSTAKING_INVENTORY_ZAP,
  WeiPerEther,
  Zero,
} from '@nftx/constants';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider, Signer } from '@nftx/types';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  async function withdrawNfts({
    network,
    provider,
    signer,
    vaultId,
    overrides,
    nftsToRedeem,
    withdrawRemaining,
  }: {
    network: number;
    provider: Provider;
    signer: Signer;
    vaultId: string;
    nftsToRedeem: number;
    withdrawRemaining: boolean;
    overrides?: Record<string, any>;
  }) {
    const contract = getContract({
      provider,
      signer,
      abi: NFTXUnstakingInventoryZap,
      address: getChainConstant(NFTX_UNSTAKING_INVENTORY_ZAP, network),
    });
    const args = [
      BigInt(vaultId),
      BigInt(nftsToRedeem),
      withdrawRemaining ? WeiPerEther : Zero,
    ] as const;

    try {
      return await contract.write.unstakeInventory({
        ...overrides,
        args,
      });
    } catch (e) {
      console.error(e);
      return contract.write.unstakeInventory({ ...overrides, args });
    }
  };
