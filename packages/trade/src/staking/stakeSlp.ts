import type { BigNumber } from '@ethersproject/bignumber';
import config from '@nftx/config';
import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Signer } from 'ethers';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function stakeSlp({
    vaultId,
    amount,
    network = config.network,
    signer,
  }: {
    vaultId: string;
    amount: BigNumber;
    network?: number;
    signer: Signer;
  }) {
    const contract = getContract({
      network,
      signer,
      address: getChainConstant(NFTX_LP_STAKING, network),
      abi,
    });

    return contract.deposit(vaultId, amount);
  };
