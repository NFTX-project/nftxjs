import type { BigNumber } from '@ethersproject/bignumber';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXInventoryStaking.json';
import type { Signer } from 'ethers';
import type { VaultId } from '../../vaults';
import { getChainConstant, getContract } from '../../web3';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  function withdrawVToken({
    network,
    signer,
    vaultId,
    xTokenAmount,
    overrides,
  }: {
    network: number;
    signer: Signer;
    vaultId: VaultId;
    xTokenAmount: BigNumber;
    overrides?: Record<string, any>;
  }) {
    const contract = getContract({
      network,
      signer,
      abi,
      address: getChainConstant(NFTX_INVENTORY_STAKING, network),
    });

    return contract.withdraw(vaultId, xTokenAmount, { ...overrides });
  };
