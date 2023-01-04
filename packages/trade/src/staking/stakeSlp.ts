import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Signer } from 'ethers';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /**
   * Takes SLP (vToken paired with ETH on Sushi) and stakes it in NFTX, returning xSLP tokens
   */
  function stakeSlp(args: {
    vaultId: string;
    amount: BigNumber;
    network?: number;
    signer: Signer;
  }): Promise<ContractTransaction> {
    const { vaultId, amount, network = config.network, signer } = args;

    const contract = getContract({
      network,
      signer,
      address: getChainConstant(NFTX_LP_STAKING, network),
      abi,
    });

    return contract.deposit(vaultId, amount);
  };
