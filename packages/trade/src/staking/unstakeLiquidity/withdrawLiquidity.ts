import { NFTX_LP_STAKING } from '@nftx/constants';
import { NFTXLpStaking } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider, Signer } from '@nftx/types';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function withdrawLiquidity({
    network,
    provider,
    signer,
    vaultId,
    slpAmount,
  }: {
    network: number;
    provider: Provider;
    signer: Signer;
    vaultId: string;
    slpAmount: bigint;
  }) {
    const contract = getContract({
      provider,
      signer,
      abi: NFTXLpStaking,
      address: getChainConstant(NFTX_LP_STAKING, network),
    });

    return contract.write.withdraw({ args: [BigInt(vaultId), slpAmount] });
  };
