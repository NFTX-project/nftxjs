import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  WETH_TOKEN,
} from '@nftx/constants';
import type { Signer } from 'ethers';
import {
  getExactTokenIds,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '../utils';
import nftxMarketplaceZap from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import nftxMarketplace0xZap from '@nftx/constants/abis/NFTXMarketplace0xZap.json';
import vaultAbi from '@nftx/constants/abis/NFTXVaultUpgradeable.json';
import estimateGasAndFees from '../estimateGasAndFees';
import { omitNil } from '../../utils';
import increaseGasLimit from '../increaseGasLimit';
import config from '@nftx/config';
import {
  doesNetworkSupport0x,
  fetch0xQuote,
  fetchVaultSwapPrice,
} from '../../price';
import { WeiPerEther } from '@ethersproject/constants';
import { parseEther } from '@ethersproject/units';
import calculateSwapFee from '../../price/calculateSwapFee';
import type { Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

type SwapVault = Pick<Vault, 'id' | 'vaultId'> & {
  fees: Pick<Vault['fees'], 'targetSwapFee' | 'randomSwapFee'>;
  features: Pick<Vault['features'], 'enableRandomSwap' | 'enableTargetSwap'>;
};

const swapErc721WithEth = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  signer,
  userAddress,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
}: {
  network: number;
  signer: Signer;
  userAddress: string;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  slippage: number;
  vault: SwapVault;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const redeemIds = getUniqueTokenIds(redeemTokenIds);

  const contract = getContract({
    network,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
    abi: nftxMarketplaceZap,
  });

  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [vaultId, mintIds, redeemIds, path, userAddress];
  const method = 'buyAndSwap721';

  let { price: maxPrice } = await fetchVaultSwapPrice({
    provider: signer.provider,
    network,
    vault,
    randomSwaps: mintIds.length - redeemIds.length,
    targetSwaps: redeemIds.length,
  });
  if (slippage) {
    maxPrice = maxPrice
      .mul(WeiPerEther.add(parseEther(`${slippage}`)))
      .div(WeiPerEther);
  }

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      contract,
      args,
      method,
      overrides: omitNil({ value: maxPrice }),
    });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  try {
    return contract[method](
      ...args,
      omitNil({ value: maxPrice, gasLimit, maxFeePerGas, maxPriorityFeePerGas })
    );
  } catch {
    return contract[method](...args, omitNil({ value: maxPrice, gasLimit }));
  }
};

const swapErc721Direct = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  signer,
  vault: { id: vaultAddress },
}: {
  network: number;
  signer: Signer;
  vault: SwapVault;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);

  const contract = getContract({
    network,
    signer,
    address: vaultAddress,
    abi: vaultAbi,
  });

  return contract.swap(mintIds, amounts, redeemIds);
};

const swap0xErc721 = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  userAddress,
  signer,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
}: {
  network: number;
  signer: Signer;
  vault: SwapVault;
  userAddress: string;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  quote: 'ETH';
  slippage: number;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const targetSwaps = getTotalTokenIds(redeemTokenIds);
  const randomSwaps = getTotalTokenIds(mintIds) - targetSwaps;
  const buyAmount = calculateSwapFee({ vault, randomSwaps, targetSwaps });

  const contract = getContract({
    network,
    abi: nftxMarketplace0xZap,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
  });

  const { data } = await fetch0xQuote({
    type: 'quote',
    network,
    sellToken: getChainConstant(WETH_TOKEN, network),
    buyToken: vaultAddress,
    buyAmount,
    slippagePercentage: slippage,
  });
  const { value } = await fetch0xQuote({
    type: 'price',
    network,
    sellToken: 'ETH',
    buyToken: vaultAddress,
    buyAmount,
    slippagePercentage: slippage,
  });

  return contract.buyAndSwap721(
    vaultId,
    mintIds,
    redeemIds,
    data,
    userAddress,
    {
      value,
    }
  );
};

const swapErc1155WithEth = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  signer,
  userAddress,
  slippage,
  vault,
  vault: { id: vaultAddress, vaultId },
}: {
  network: number;
  signer: Signer;
  vault: SwapVault;
  userAddress: string;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  slippage: number;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);

  let { price: maxPrice } = await fetchVaultSwapPrice({
    provider: signer.provider,
    network,
    vault,
    randomSwaps: mintIds.length - redeemIds.length,
    targetSwaps: redeemIds.length,
  });
  if (slippage) {
    maxPrice = maxPrice
      .mul(WeiPerEther.add(parseEther(`${slippage}`)))
      .div(WeiPerEther);
  }

  const contract = getContract({
    network,
    signer,
    abi: nftxMarketplaceZap,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
  });

  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [vaultId, mintIds, amounts, redeemIds, path, userAddress];
  const method = 'buyAndSwap1155';

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      args,
      contract,
      method,
      overrides: omitNil({ value: maxPrice }),
    });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  try {
    return contract[method](
      ...args,
      omitNil({ value: maxPrice, gasLimit, maxFeePerGas, maxPriorityFeePerGas })
    );
  } catch {
    return contract[method](...args, omitNil({ value: maxPrice, gasLimit }));
  }
};

const swapErc1155Direct = swapErc721Direct;

const swap0xErc1155 = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  signer,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
  userAddress,
}: {
  network: number;
  signer: Signer;
  vault: SwapVault;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  quote: 'ETH';
  slippage: number;
  userAddress: string;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const targetSwaps = getTotalTokenIds(redeemTokenIds);
  const randomSwaps = getTotalTokenIds(mintIds) - targetSwaps;
  const buyAmount = calculateSwapFee({ vault, randomSwaps, targetSwaps });

  const contract = getContract({
    network,
    abi: nftxMarketplace0xZap,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
  });

  const { data } = await fetch0xQuote({
    type: 'quote',
    network,
    sellToken: getChainConstant(WETH_TOKEN, network),
    buyToken: vaultAddress,
    buyAmount,
    slippagePercentage: slippage,
  });
  const { value } = await fetch0xQuote({
    type: 'price',
    network,
    sellToken: 'ETH',
    buyToken: vaultAddress,
    buyAmount,
    slippagePercentage: slippage,
  });

  return contract.buyAndSwap1155(
    vaultId,
    mintIds,
    amounts,
    redeemIds,
    data,
    userAddress,
    { value }
  );
};

const matrix = {
  ETH: {
    ERC721: {
      true: {
        true: swap0xErc721,
        false: swapErc721WithEth,
      },
      false: {
        true: swapErc721Direct,
        false: swapErc721Direct,
      },
    },
    ERC1155: {
      true: {
        true: swap0xErc1155,
        false: swapErc1155WithEth,
      },
      false: {
        true: swapErc1155Direct,
        false: swapErc1155Direct,
      },
    },
  },
  VTOKEN: {
    ERC721: {
      false: {
        true: swapErc721Direct,
        false: swapErc721Direct,
      },
    },
    ERC1155: {
      false: {
        true: swapErc1155Direct,
        false: swapErc1155Direct,
      },
    },
  },
};

/**
 * Swap NFTs in your wallet for those in the vault.
 * The price for swapping is a swap fee determined by the vault. If there is no fee, you'll only have to pay gas.
 * If you provide more mint token ids than redeem token ids, you will receive random items from the vault (at a lower fee)
 */
const swap = (args: {
  network?: number;
  signer: Signer;
  /** Token IDs of the NFTs you want to put into the vault */
  mintTokenIds: string[] | [string, number][];
  /** Token IDs of the NFTs you want to take out of the vault */
  redeemTokenIds: string[] | [string, number][];
  /** The vault you are swapping in */
  vault: SwapVault;
  userAddress: string;
  /** The percentage amount of slippage you're willing to accept */
  slippage?: number;
  quote?: 'ETH' | 'VTOKEN';
  standard?: 'ERC721' | 'ERC1155';
}) => {
  const {
    network = config.network,
    signer,
    vault,
    mintTokenIds,
    redeemTokenIds,
    userAddress,
    slippage = 0,
    quote = 'ETH',
    standard = 'ERC721',
  } = args;

  const totalCount = getTotalTokenIds(mintTokenIds);
  const targetCount = getTotalTokenIds(redeemTokenIds);
  const randomCount = totalCount - targetCount;
  const requiresEth =
    quote === 'ETH' &&
    ((targetCount > 0 && vault.fees.targetSwapFee.gt(0)) ||
      (randomCount > 0 && vault.fees.randomSwapFee.gt(0)));
  const supports0x = doesNetworkSupport0x(network);

  const fn = matrix[quote]?.[standard][`${requiresEth}`]?.[`${supports0x}`];
  if (!fn) {
    throw new Error(
      `swapWithVault is not supported for ${standard} / ${quote}`
    );
  }

  return fn({
    mintTokenIds,
    network,
    quote,
    redeemTokenIds,
    signer,
    userAddress,
    slippage,
    vault,
  });
};

export default swap;
