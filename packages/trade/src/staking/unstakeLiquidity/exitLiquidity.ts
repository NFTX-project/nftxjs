import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Signer } from 'ethers';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function exitLiquidity({
    network,
    signer,
    vaultId,
  }: {
    network?: number;
    signer: Signer;
    vaultId: string;
  }) {
    const contract = getContract({
      network,
      signer,
      abi,
      address: getChainConstant(NFTX_LP_STAKING, network),
    });

    return contract.exit(vaultId);
  };
