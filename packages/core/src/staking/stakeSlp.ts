import type { BigNumber } from '@ethersproject/bignumber';
import { NFTX_LP_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXLpStaking.json';
import type { Signer } from 'ethers';
import type { VaultId } from '../vaults';
import { getChainConstant, getContract } from '../web3';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function stakeSlp({
    vaultId,
    amount,
    network,
    signer,
  }: {
    vaultId: VaultId;
    amount: BigNumber;
    network: number;
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
