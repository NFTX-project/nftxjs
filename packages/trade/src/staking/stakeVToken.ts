import type { Signer } from 'ethers';
import abi from '@nftx/constants/abis/NFTXInventoryStaking.json';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import config from '@nftx/config';
import type { BigNumber } from '@ethersproject/bignumber';
import { getChainConstant, getContract } from '@nftx/utils';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function stakeVToken({
    network = config.network,
    signer,
    vaultId,
    amount,
  }: {
    network?: number;
    signer: Signer;
    vaultId: string;
    amount: BigNumber;
  }) {
    const contract = getContract({
      network,
      abi,
      address: getChainConstant(NFTX_INVENTORY_STAKING, network),
      signer,
    });

    return contract.deposit(vaultId, amount);
  };
