import type { BigNumber } from '@ethersproject/bignumber';
import { NFTX_INVENTORY_STAKING } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXInventoryStaking.json';
import { getChainConstant, getContract } from '@nftx/utils';
import type { Signer } from 'ethers';

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
    vaultId: string;
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
