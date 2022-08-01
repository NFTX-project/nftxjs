import type { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther } from '@ethersproject/constants';
import type { Contract } from '@ethersproject/contracts';
import { parseEther } from '@ethersproject/units';
import config from '@nftx/config';
import { NFTX_STAKING_ZAP } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXStakingZap.json';
import type { Signer } from 'ethers';
import {
  estimateGasAndFees,
  getTokenIdAmounts,
  getUniqueTokenIds,
  increaseGasLimit,
} from '../trade';
import type { VaultId } from '../vaults';
import { getChainConstant, getContract } from '../web3';

type EstimateGasAndFees = typeof estimateGasAndFees;
type GetContract = typeof getContract;

export default ({
  estimateGasAndFees,
  getContract,
}: {
  estimateGasAndFees: EstimateGasAndFees;
  getContract: GetContract;
}) => {
  const stake721 = async ({
    vaultId,
    pairedEth,
    tokenIds: tokensAndQuantities,
    isNewPool,
    gasPrice,
    minEthIn,
    contract,
  }: {
    pairedEth: BigNumber;
    vaultId: VaultId;
    tokenIds: string[] | [string, number][];
    isNewPool: boolean;
    gasPrice: BigNumber;
    minEthIn: BigNumber;
    contract: Contract;
  }) => {
    const method = 'addLiquidity721ETH' as const;
    const tokenIds = getUniqueTokenIds(tokensAndQuantities);
    const args = [vaultId, tokenIds, minEthIn];
    // try to fetch the estimate, if it succeeds, you can afford it and have a 1559-capable wallet
    const { maxFeePerGas, gasEstimate, maxPriorityFeePerGas } =
      await estimateGasAndFees({
        contract,
        method,
        args,
        overrides: {
          value: pairedEth,
        },
      });
    const gasLimit = increaseGasLimit({
      estimate: gasEstimate,
      amount: 7,
    });
    const can1559 = !!(maxFeePerGas && maxPriorityFeePerGas);

    // Only do EIP-1559 fees on existing pools, no need for next-block-speed when creating new one
    if (can1559 && isNewPool) {
      console.info('Attempting non-EIP-1559 tx');
      return contract[method](...args, {
        value: pairedEth,
        gasLimit,
      });
    }

    if (can1559) {
      console.info('Attempting EIP-1559 tx');
      return contract[method](...args, {
        value: pairedEth,
        maxPriorityFeePerGas,
        maxFeePerGas,
        gasLimit,
      });
    }

    console.info('Attempting legacy tx');
    // if we cannot calculate gas estimate it is because:
    // - they cannot afford it (gas estimate fails)
    // - their wallet does not support EIP-1559

    // sending the transaction with only gasPrice set allows them to
    // see that they cannot afford the tx rather than an unhelpful execution reverted modal
    return contract[method](...args, {
      value: pairedEth,
      gasLimit,
      // bump gas by 25% if not a new pool
      gasPrice: !isNewPool && gasPrice ? gasPrice.mul(125).div(100) : null,
    });
  };

  const stake1155 = async ({
    vaultId,
    pairedEth,
    tokenIds: tokensAndQuantities,
    isNewPool,
    gasPrice,
    minEthIn,
    contract,
  }: {
    pairedEth: BigNumber;
    slippage: number;
    vaultId: VaultId;
    tokenIds: string[] | [string, number][];
    isNewPool: boolean;
    gasPrice: BigNumber;
    minEthIn: BigNumber;
    contract: Contract;
  }) => {
    const method = 'addLiquidity1155ETH' as const;
    const tokenIds = getUniqueTokenIds(tokensAndQuantities);
    const amounts = getTokenIdAmounts(tokensAndQuantities);
    const args = [vaultId, tokenIds, amounts, minEthIn];
    // try to fetch the estimate, if it succeeds, you can afford it and have a 1559-capable wallet
    const { maxFeePerGas, maxPriorityFeePerGas } = await estimateGasAndFees({
      contract,
      method,
      overrides: { value: pairedEth },
      args,
    });

    if (maxPriorityFeePerGas && maxFeePerGas && !isNewPool) {
      console.info('Attempting ERC-1155 staking EIP-1559 transaction');
      return contract[method](...args, {
        value: pairedEth,
        maxPriorityFeePerGas,
        maxFeePerGas,
      });
    }

    console.info('Attempting ERC-1155 staking non-EIP-1559 transaction');
    // if we cannot calculate gas estimate it is because:
    // - they cannot afford it (gas estimate fails)
    // - their wallet does not support EIP-1559
    // - it's a new pool
    return contract[method](...args, {
      value: pairedEth,
      // pump gas by 25% on existing pools
      gasPrice: !isNewPool && gasPrice ? gasPrice.mul(125).div(100) : null,
    });
  };

  return function stakeLiquidity({
    network = config.network,
    signer,
    vaultId,
    pairedEth,
    slippage,
    tokenIds,
    isNewPool,
    gasPrice,
    standard = 'ERC721',
  }: {
    network?: number;
    signer: Signer;
    pairedEth: BigNumber;
    slippage: number;
    vaultId: VaultId;
    tokenIds: string[] | [string, number][];
    isNewPool?: boolean;
    gasPrice?: BigNumber;
    standard?: 'ERC721' | 'ERC1155';
  }) {
    const contract = getContract({
      network,
      abi,
      signer,
      address: getChainConstant(NFTX_STAKING_ZAP, network),
    });
    // use slippage settings to calculate min eth allowed before cancelation
    const minEthIn = parseEther(`${1 - slippage}`)
      .mul(pairedEth)
      .div(WeiPerEther);

    if (standard === 'ERC721') {
      return stake721({
        contract,
        gasPrice,
        isNewPool,
        minEthIn,
        pairedEth,
        tokenIds,
        vaultId,
      });
    }
    if (standard === 'ERC1155') {
      return stake1155({
        contract,
        gasPrice,
        isNewPool,
        minEthIn,
        pairedEth,
        slippage,
        tokenIds,
        vaultId,
      });
    }

    throw new Error(`Unsupported standard ${standard}`);
  };
};
