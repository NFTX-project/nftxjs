import config from '@nftx/config';
import { NFTX_STAKING_ZAP, WeiPerEther } from '@nftx/constants';
import { NFTXStakingZap } from '@nftx/abi';
import { getChainConstant, getContract } from '@nftx/utils';
import {
  getTokenIdAmounts,
  getUniqueTokenIds,
  increaseGasLimit,
} from '../trade';
import type { Contract, Provider, Signer, TokenId } from '@nftx/types';
import { parseEther } from 'viem';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) => {
  const stake721 = async ({
    vaultId,
    pairedEth,
    tokenIds: tokensAndQuantities,
    isNewPool,
    gasPrice,
    minEthIn,
    contract,
  }: {
    pairedEth: bigint;
    vaultId: string;
    tokenIds: TokenId[] | [TokenId, number][];
    isNewPool: boolean;
    gasPrice?: bigint;
    minEthIn: bigint;
    contract: Contract<typeof NFTXStakingZap>;
  }) => {
    const tokenIds = getUniqueTokenIds(tokensAndQuantities);
    const args = [BigInt(vaultId), tokenIds.map(BigInt), minEthIn] as const;

    if (isNewPool) {
      return contract.write.addLiquidity721ETH({
        args,
        gasPrice: gasPrice
          ? increaseGasLimit({ estimate: gasPrice, amount: 7 })
          : undefined,
      });
    }

    return contract.write.addLiquidity721ETH({
      args,
      value: pairedEth,
      gasPrice,
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
    pairedEth: bigint;
    slippage: number;
    vaultId: string;
    tokenIds: TokenId[] | [TokenId, number][];
    isNewPool: boolean;
    gasPrice?: bigint;
    minEthIn: bigint;
    contract: Contract<typeof NFTXStakingZap>;
  }) => {
    const tokenIds = getUniqueTokenIds(tokensAndQuantities);
    const amounts = getTokenIdAmounts(tokensAndQuantities);
    const args = [
      BigInt(vaultId),
      tokenIds.map(BigInt),
      amounts.map(BigInt),
      minEthIn,
    ] as const;

    // if we cannot calculate gas estimate it is because:
    // - they cannot afford it (gas estimate fails)
    // - their wallet does not support EIP-1559
    // - it's a new pool
    return contract.write.addLiquidity1155ETH({
      args,
      maxFeePerGas:
        !isNewPool && gasPrice ? (gasPrice * 125n) / 100n : undefined,
      value: pairedEth,
    });
  };

  /**
   * Takes NFTs and stakes them into a Liquidity Position (LP).
   * Behind the scenes, we trade your NFTs for vTokens, pair the vTokens with ETH on Sushi and receive SLP tokens in return, then stake your SLP on NFTX and receive xSlp.
   */
  return function stakeLiquidity(args: {
    network?: number;
    provider: Provider;
    signer: Signer;
    /** The vault you are staking into */
    vaultId: string;
    /** Token IDs for the NFTs you want to stake */
    tokenIds: TokenId[] | [TokenId, number][];
    /** The amount of ETH to pair with your NFTs */
    pairedEth: bigint;
    /** A percentage value for the maximum amount of slippage you are willing to accept */
    slippage: number;
    /** If you are staking into a brand new pool, there will be a slightly higher gas cost due to setting up the pools, this option helps to accomodate for this */
    isNewPool?: boolean;
    gasPrice?: bigint;
    standard?: 'ERC721' | 'ERC1155';
  }) {
    const {
      network = config.network,
      signer,
      provider,
      vaultId,
      pairedEth,
      slippage,
      tokenIds,
      isNewPool = false,
      gasPrice,
      standard = 'ERC721',
    } = args;

    const contract = getContract({
      abi: NFTXStakingZap,
      provider,
      signer,
      address: getChainConstant(NFTX_STAKING_ZAP, network),
    });
    // use slippage settings to calculate min eth allowed before cancelation
    const minEthIn = (parseEther(`${1 - slippage}`) * pairedEth) / WeiPerEther;

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
