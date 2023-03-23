import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import { NFTXInventoryStaking } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider, Signer } from '@nftx/types';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function withdrawVToken({
    network,
    provider,
    signer,
    vaultId,
    xTokenAmount,
    overrides,
  }: {
    network: number;
    provider: Provider;
    signer: Signer;
    vaultId: string;
    xTokenAmount: bigint;
    overrides?: Record<string, any>;
  }) {
    const contract = getContract({
      provider,
      signer,
      abi: NFTXInventoryStaking,
      address: getChainConstant(NFTX_INVENTORY_STAKING, network),
    });

    return contract.write.withdraw({
      args: [BigInt(vaultId), xTokenAmount],
      ...overrides,
    });
  };
