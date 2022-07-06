import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import type { Signer } from 'ethers';
import type { VaultId } from '../vaults';
import { getChainConstant, getContract } from '../web3';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /** Claim any liquidity-providing rewards the user may have for the given vaults */
  function claimRewards({
    vaultIds,
    network,
    signer,
  }: {
    vaultIds: VaultId[];
    network: number;
    signer: Signer;
  }) {
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
