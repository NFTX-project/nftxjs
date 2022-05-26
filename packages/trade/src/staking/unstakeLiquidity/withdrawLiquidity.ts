import type { BigNumber } from '@ethersproject/bignumber';
import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Signer } from 'ethers';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function withdrawLiquidity({
    network,
    signer,
    vaultId,
    slpAmount,
  }: {
    network: number;
    signer: Signer;
    vaultId: string;
    slpAmount: BigNumber;
  }) {
    const contract = getContract({
      network,
      signer,
      abi,
      address: getChainConstant(NFTX_LP_STAKING, network),
    });

    return contract.withdraw(vaultId, slpAmount);
  };
