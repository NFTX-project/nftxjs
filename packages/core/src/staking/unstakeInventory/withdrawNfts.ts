import abi from '@nftx/constants/abis/NFTXUnstakingInventoryZap.json';
import { Zero } from '@ethersproject/constants';
import { estimateGasAndFees, increaseGasLimit } from '../../trade';
import { getChainConstant, getContract } from '../../web3';
import type { Signer } from 'ethers';
import type { VaultId } from '../../vaults';
import type { BigNumber } from '@ethersproject/bignumber';
import { NFTX_UNSTAKING_INVENTORY_ZAP } from '@nftx/constants';

type EstimateGasAndFees = typeof estimateGasAndFees;
type GetContract = typeof getContract;

export default ({
  estimateGasAndFees,
  getContract,
}: {
  estimateGasAndFees: EstimateGasAndFees;
  getContract: GetContract;
}) =>
  async function withdrawNfts({
    network,
    signer,
    vaultId,
    overrides,
    nftsToRedeem,
    xTokenAmount = Zero,
  }: {
    network: number;
    signer: Signer;
    vaultId: VaultId;
    nftsToRedeem: number;
    xTokenAmount?: BigNumber;
    overrides?: Record<string, any>;
  }) {
    const contract = getContract({
      network,
      signer,
      abi,
      address: getChainConstant(NFTX_UNSTAKING_INVENTORY_ZAP, network),
    });
    const method = 'unstakeInventory' as const;
    const args = [vaultId, nftsToRedeem, xTokenAmount];

    const { gasEstimate } = await estimateGasAndFees({
      contract,
      method,
      args,
      overrides: { ...overrides },
    });

    const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 5 });

    try {
      return await contract[method](...args, {
        ...overrides,
        gasLimit,
      });
    } catch (e) {
      console.error(e);
      return contract[method](...args, { ...overrides });
    }
  };
