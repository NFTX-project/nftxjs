import type { Signer } from 'ethers';
import abi from '@nftx/constants/abis/NFTXInventoryStaking.json';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import config from '@nftx/config';
import type { BigNumber } from '@ethersproject/bignumber';
import { getChainConstant, getContract } from '@nftx/utils';
import type { ContractTransaction } from '@ethersproject/contracts';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /**
   * Takes vTokens and stakes them in NFTX, returning xToken
   */
  function stakeVToken(args: {
    network?: number;
    signer: Signer;
    vaultId: string;
    amount: BigNumber;
  }): Promise<ContractTransaction> {
    const { network = config.network, signer, vaultId, amount } = args;

    const contract = getContract({
      network,
      abi,
      address: getChainConstant(NFTX_INVENTORY_STAKING, network),
      signer,
    });

    return contract.deposit(vaultId, amount);
  };
