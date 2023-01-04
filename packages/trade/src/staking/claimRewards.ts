import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Signer } from 'ethers';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /** Claim any LP rewards the user may have for the given vaults */
  function claimRewards(args: {
    vaultIds: string[];
    network?: number;
    signer: Signer;
  }): Promise<ContractTransaction> {
    const { vaultIds, network = config.network, signer } = args;

    const contract = getContract({
      address: getChainConstant(NFTX_LP_STAKING, network),
      network,
      abi,
      signer,
    });

    if (vaultIds.length > 1) {
      return contract.claimMultipleRewards(vaultIds);
    } else {
      return contract.claimRewards(vaultIds[0]);
    }
  };
