import type { BigNumber, Signer } from 'ethers';
import abi from '@nftx/constants/abis/NFTXInventoryStaking.json';
import { getChainConstant, getContract } from '../web3';
import type { VaultId } from '../vaults';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function stakeVToken({
    network,
    signer,
    vaultId,
    amount,
  }: {
    network: number;
    signer: Signer;
    vaultId: VaultId;
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
