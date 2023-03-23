import config from '@nftx/config';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  WeiPerEther,
  WETH_TOKEN,
} from '@nftx/constants';
import { NFTXMarketplace0xZap, NFTXMarketplaceZap } from '@nftx/abi';
import { omitNil } from '../../utils';
import increaseGasLimit from '../increaseGasLimit';
import {
  getTokenIdAmounts,
  getUniqueTokenIds,
  getTotalTokenIds,
} from '../utils';
import {
  doesNetworkSupport0x,
  fetch0xQuote,
  fetchVaultSellPrice,
} from '../../price';
import calculateSellFee from '../../price/calculateSellFee';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import { parseEther } from 'viem';

type SellVault = Pick<Vault, 'id' | 'vaultId'> & {
  fees: Pick<Vault['fees'], 'mintFee'>;
};

const sell0xErc721 = async ({
  vault: { vaultId, id: vaultAddress },
  vault,
  tokenIds,
  network,
  provider,
  signer,
  slippage,
  userAddress,
}: {
  vault: SellVault;
  tokenIds: TokenId[] | [TokenId, number][];
  network: number;
  provider: Provider;
  signer: Signer;
  quote: 'ETH';
  slippage: number;
  userAddress: Address;
}) => {
  const amount = getTotalTokenIds(tokenIds);
  const fee = calculateSellFee({ vault, amount });
  const sellAmount = parseEther(`${amount}`) - fee;
  const ids = getUniqueTokenIds(tokenIds);
  const address = getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network);

  const { data } = await fetch0xQuote({
    network,
    sellToken: vaultAddress,
    sellAmount,
    buyToken: getChainConstant(WETH_TOKEN, network),
    slippagePercentage: slippage,
    type: 'quote',
  });

  const args = [BigInt(vaultId), ids.map(BigInt), data, userAddress] as const;
  const contract = getContract({
    provider,
    signer,
    address,
    abi: NFTXMarketplace0xZap,
  });

  console.debug(address, 'mintAndSell721', ...args);

  return contract.write.mintAndSell721({
    args,
  });
};

const sellErc721 = async ({
  vault,
  vault: { vaultId },
  tokenIds,
  path,
  userAddress,
  network,
  provider,
  signer,
  slippage,
}: {
  vault: SellVault;
  path: readonly [Address, Address];
  userAddress: Address;
  tokenIds: TokenId[] | [TokenId, number][];
  network: number;
  provider: Provider;
  signer: Signer;
  slippage: number;
}) => {
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  const contract = getContract({
    provider,
    signer,
    abi: NFTXMarketplaceZap,
    address,
  });
  const ids = getUniqueTokenIds(tokenIds);
  let { price: minPrice } = await fetchVaultSellPrice({
    vault,
    provider,
    network,
    amount: ids.length,
  });
  if (slippage) {
    minPrice =
      (minPrice * (WeiPerEther - parseEther(`${slippage}`))) / WeiPerEther;
  }
  const args = [
    BigInt(vaultId),
    ids.map(BigInt),
    minPrice,
    path,
    userAddress,
  ] as const;

  console.debug(address, 'mintAndSell721', ...args);

  return contract.write.mintAndSell721({ args });
};

const sellErc1155 = async ({
  vault,
  vault: { vaultId },
  tokenIds,
  slippage,
  path,
  userAddress,
  network,
  provider,
  signer,
}: {
  tokenIds: TokenId[] | [TokenId, number][];
  vault: SellVault;
  slippage: number;
  path: readonly [Address, Address];
  userAddress: Address;
  network: number;
  provider: Provider;
  signer: Signer;
}) => {
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  const contract = getContract({
    provider,
    signer,
    abi: NFTXMarketplaceZap,
    address,
  });
  const ids = getUniqueTokenIds(tokenIds);
  const amounts = getTokenIdAmounts(tokenIds);
  let { price: minPrice } = await fetchVaultSellPrice({
    vault,
    provider,
    network,
    amount: ids.length,
  });
  if (slippage) {
    minPrice =
      (minPrice * (WeiPerEther - parseEther(`${slippage}`))) / WeiPerEther;
  }
  const args = [
    BigInt(vaultId),
    ids.map(BigInt),
    amounts.map(BigInt),
    minPrice,
    path,
    userAddress,
  ] as const;

  console.debug(address, 'mintAndSell1155', ...args);

  return contract.write.mintAndSell1155({ args });
};

const sell0xErc1155 = async ({
  vault,
  vault: { vaultId, id: vaultAddress },
  tokenIds,
  network,
  provider,
  signer,
  slippage,
  userAddress,
}: {
  vault: SellVault;
  tokenIds: TokenId[] | [TokenId, number][];
  network: number;
  provider: Provider;
  signer: Signer;
  quote: 'ETH';
  slippage: number;
  userAddress: Address;
}) => {
  const ids = getUniqueTokenIds(tokenIds);
  const amounts = getTokenIdAmounts(tokenIds);
  const amount = getTotalTokenIds(tokenIds);
  const fee = calculateSellFee({ vault, amount });
  const sellAmount = parseEther(`${amount}`) - fee;
  const address = getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network);

  const { data } = await fetch0xQuote({
    network,
    sellToken: vaultAddress,
    sellAmount,
    buyToken: getChainConstant(WETH_TOKEN, network),
    slippagePercentage: slippage,
    type: 'quote',
  });

  const contract = getContract({
    signer,
    address,
    provider,
    abi: NFTXMarketplace0xZap,
  });

  const args = [
    BigInt(vaultId),
    ids.map(BigInt),
    amounts.map(BigInt),
    data,
    userAddress,
  ] as const;

  console.debug(address, 'mintAndSell1155', args);
  return contract.write.mintAndSell1155({ args });
};

const matrix = {
  ETH: {
    ERC721: {
      true: sell0xErc721,
      false: sellErc721,
    },
    ERC1155: {
      true: sell0xErc1155,
      false: sellErc1155,
    },
  },
};

/** Mints an NFT into an NFTX vault and returns ETH. */
const sell = async (args: {
  network?: number;
  /** The percentage amount of slippage you're willing to accept  */
  slippage?: number;
  /** The vault you're selling into */
  vault: SellVault;
  provider: Provider;
  signer: Signer;
  /** The address of the seller */
  userAddress: Address;
  /** Ids of the individual NFTs you want to sell.
   * For 721s you just pass a flat array of ids ['1', '2'].
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1]]
   */
  tokenIds: TokenId[] | [TokenId, number][];
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}) => {
  const {
    network = config.network,
    provider,
    signer,
    tokenIds,
    userAddress,
    vault,
    slippage = 0,
    quote = 'ETH',
    standard: givenStandard,
  } = args;

  const standard =
    givenStandard || (tokenIds?.some((x) => x?.[1] > 1) ? 'ERC1155' : 'ERC721');

  const path = [vault.id, getChainConstant(WETH_TOKEN, network)] as const;

  const supports0x = doesNetworkSupport0x(network);

  const fn = matrix[quote]?.[standard]?.[`${supports0x}`];

  if (!fn) {
    throw new Error(
      `sellIntoVault is not supported for ${standard} / ${quote}`
    );
  }

  return fn({
    network,
    path,
    quote,
    provider,
    signer,
    tokenIds,
    userAddress,
    slippage,
    vault,
  });
};

export default sell;
