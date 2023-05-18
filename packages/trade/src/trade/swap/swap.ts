import { NFTX_MARKETPLACE_0X_ZAP, WETH_TOKEN, Zero } from '@nftx/constants';
import {
  getExactTokenIds,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '../utils';
import { NFTXMarketplace0xZap, NFTXVaultUpgradeable } from '@nftx/abi';
import { omitNil } from '../../utils';
import config from '@nftx/config';
import {
  doesNetworkSupport0x,
  doesNetworkSupportNftxRouter,
  fetch0xQuote,
} from '../../price';
import calculateSwapFee from '../../price/calculateSwapFee';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import fetchNftxQuote from '../../price/fetchNftxQuote';

type SwapVault = Pick<Vault, 'id' | 'vaultId'> & {
  fees: Pick<Vault['fees'], 'targetSwapFee' | 'randomSwapFee'>;
  features: Pick<Vault['features'], 'enableRandomSwap' | 'enableTargetSwap'>;
};

const swapNftxErc721 = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  userAddress,
  // provider,
  // signer,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  vault: SwapVault;
  userAddress: Address;
  mintTokenIds: TokenId[] | [TokenId, number][];
  redeemTokenIds: TokenId[] | [TokenId, number][];
  quote: 'ETH';
  slippage: number;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const targetSwaps = getTotalTokenIds(redeemTokenIds);
  const randomSwaps = getTotalTokenIds(mintIds) - targetSwaps;
  const buyAmount = calculateSwapFee({ vault, randomSwaps, targetSwaps });
  const address = getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network);
  // const contract = getContract({
  //   abi: NFTXMarketplace0xZap,
  //   provider,
  //   signer,
  //   address,
  // });

  const {
    methodParameters: { calldata: data },
    quote,
  } = await fetchNftxQuote({
    network,
    sellToken: getChainConstant(WETH_TOKEN, network),
    buyToken: vaultAddress,
    buyAmount,
    slippagePercentage: slippage,
    userAddress,
  });
  const value = BigInt(quote);

  const args = [
    BigInt(vaultId),
    mintIds.map(BigInt),
    redeemIds.map(BigInt),
    data,
    userAddress,
  ] as const;

  const overrides = omitNil({
    value,
  });

  console.debug(address, 'buyAndSwap721', args, overrides);

  // return contract.write.buyAndSwap721({ args, value: BigInt(value) });
  // TODO: implement
  throw new Error('Not implemented');
};

const swapErc721Direct = async ({
  mintTokenIds,
  redeemTokenIds,
  provider,
  signer,
  vault: { id: vaultAddress },
}: {
  provider: Provider;
  signer: Signer;
  vault: SwapVault;
  mintTokenIds: TokenId[] | [TokenId, number][];
  redeemTokenIds: TokenId[] | [TokenId, number][];
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);

  const contract = getContract({
    provider,
    signer,
    address: vaultAddress,
    abi: NFTXVaultUpgradeable,
  });

  console.debug(vaultAddress, 'swap', mintIds, amounts, redeemIds);

  return contract.write.swap({
    args: [mintIds.map(BigInt), amounts.map(BigInt), redeemIds.map(BigInt)],
  });
};

const swap0xErc721 = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  userAddress,
  provider,
  signer,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  vault: SwapVault;
  userAddress: Address;
  mintTokenIds: TokenId[] | [TokenId, number][];
  redeemTokenIds: TokenId[] | [TokenId, number][];
  quote: 'ETH';
  slippage: number;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const targetSwaps = getTotalTokenIds(redeemTokenIds);
  const randomSwaps = getTotalTokenIds(mintIds) - targetSwaps;
  const buyAmount = calculateSwapFee({ vault, randomSwaps, targetSwaps });
  const address = getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network);
  const contract = getContract({
    abi: NFTXMarketplace0xZap,
    provider,
    signer,
    address,
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

  const args = [
    BigInt(vaultId),
    mintIds.map(BigInt),
    redeemIds.map(BigInt),
    data,
    userAddress,
  ] as const;

  const overrides = omitNil({
    value,
  });

  console.debug(address, 'buyAndSwap721', args, overrides);

  return contract.write.buyAndSwap721({ args, value: BigInt(value) });
};

const swapNftxErc1155 = swapNftxErc721;

const swapErc1155Direct = swapErc721Direct;

const swap0xErc1155 = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  provider,
  signer,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
  userAddress,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  vault: SwapVault;
  mintTokenIds: TokenId[] | [TokenId, number][];
  redeemTokenIds: TokenId[] | [TokenId, number][];
  quote: 'ETH';
  slippage: number;
  userAddress: Address;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const targetSwaps = getTotalTokenIds(redeemTokenIds);
  const randomSwaps = getTotalTokenIds(mintIds) - targetSwaps;
  const buyAmount = calculateSwapFee({ vault, randomSwaps, targetSwaps });
  const address = getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network);

  const contract = getContract({
    abi: NFTXMarketplace0xZap,
    provider,
    signer,
    address,
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

  const args = [
    BigInt(vaultId),
    mintIds.map(BigInt),
    amounts.map(BigInt),
    redeemIds.map(BigInt),
    data,
    userAddress,
  ] as const;

  console.debug(address, 'buyAndSwap1155', args, value);

  return contract.write.buyAndSwap1155({ args, value: BigInt(value) });
};

const matrix = {
  ETH: {
    ERC721: {
      withFee: {
        zeroX: swap0xErc721,
        nftx: swapNftxErc721,
      },
      noFee: {
        zeroX: swapErc721Direct,
        nftx: swapErc721Direct,
      },
    },
    ERC1155: {
      withFee: {
        zeroX: swap0xErc1155,
        nftx: swapNftxErc1155,
      },
      noFee: {
        zeroX: swapErc1155Direct,
        nftx: swapErc1155Direct,
      },
    },
  },
  VTOKEN: {
    ERC721: {
      withFee: null,
      noFee: {
        zeroX: swapErc721Direct,
        nftx: swapErc721Direct,
      },
    },
    ERC1155: {
      withFee: null,
      noFee: {
        zeroX: swapErc1155Direct,
        nftx: swapErc1155Direct,
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
  provider: Provider;
  signer: Signer;
  /** Token IDs of the NFTs you want to put into the vault */
  mintTokenIds: TokenId[] | [TokenId, number][];
  /** Token IDs of the NFTs you want to take out of the vault */
  redeemTokenIds: TokenId[] | [TokenId, number][];
  /** The vault you are swapping in */
  vault: SwapVault;
  userAddress: Address;
  /** The percentage amount of slippage you're willing to accept */
  slippage?: number;
  quote?: 'ETH' | 'VTOKEN';
  standard?: 'ERC721' | 'ERC1155';
}) => {
  const {
    network = config.network,
    provider,
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
    ((targetCount > 0 && vault.fees.targetSwapFee > Zero) ||
      (randomCount > 0 && vault.fees.randomSwapFee > Zero));
  const withFee = requiresEth ? 'withFee' : 'noFee';
  const supports0x = doesNetworkSupport0x(network);
  const supportsNftx = doesNetworkSupportNftxRouter(network);
  const router = supportsNftx ? 'nftx' : supports0x ? 'zeroX' : 'unknown';
  if (router === 'unknown') {
    throw new Error(
      `swapWithVault is not supported for ${standard} / ${quote}`
    );
  }

  const fn = matrix[quote]?.[standard][withFee]?.[router];
  if (!fn) {
    throw new Error(
      `swapWithVault is not supported for ${standard} / ${quote}`
    );
  }

  return fn({
    mintTokenIds,
    network,
    quote: quote as any,
    redeemTokenIds,
    provider,
    signer,
    userAddress,
    slippage,
    vault,
  });
};

export default swap;
