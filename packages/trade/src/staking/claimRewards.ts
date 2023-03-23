import config from '@nftx/config';
import { NFTX_LP_STAKING } from '@nftx/constants';
import { NFTXLpStaking } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Provider, Signer } from '@nftx/types';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /** Claim any LP rewards the user may have for the given vaults */
  function claimRewards(args: {
    vaultIds: string[];
    network?: number;
    provider: Provider;
    signer: Signer;
  }) {
    const { vaultIds, network = config.network, provider, signer } = args;

    const contract = getContract({
      address: getChainConstant(NFTX_LP_STAKING, network),
      abi: NFTXLpStaking,
      provider,
      signer,
    });

    if (vaultIds.length > 1) {
      return contract.write.claimMultipleRewards({
        args: [vaultIds.map(BigInt)],
      });
    } else {
      return contract.write.claimRewards({ args: [BigInt(vaultIds[0])] });
    }
  };
