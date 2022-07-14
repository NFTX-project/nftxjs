import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import type { Signer } from 'ethers';
import type { VaultId } from '../../vaults';
import { getChainConstant, getContract } from '../../web3';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function exitLiquidity({
    network,
    signer,
    vaultId,
  }: {
    network?: number;
    signer: Signer;
    vaultId: VaultId;
  }) {
    const contract = getContract({
      network,
      signer,
      abi,
      address: getChainConstant(NFTX_LP_STAKING, network),
    });

    return contract.exit(vaultId);
  };
