import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP, WETH_TOKEN } from '@nftx/constants';
import { NFTXMarketplace0xZap } from '@nftx/abi';
import {
  getTokenIdAmounts,
  getUniqueTokenIds,
  getTotalTokenIds,
} from '../utils';
import {
  doesNetworkSupport0x,
  doesNetworkSupportNftxRouter,
  fetch0xQuote,
} from '../../price';
import calculateSellFee from '../../price/calculateSellFee';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import { parseEther } from 'viem';
import fetchNftxQuote from '../../price/fetchNftxQuote';

type SellVault = Pick<Vault, 'id' | 'vaultId'> & {
  fees: Pick<Vault['fees'], 'mintFee'>;
};

const sellNftxErc721 = async ({
  vault: { vaultId, id: vaultAddress },
  vault,
  tokenIds,
  network,
  // provider,
  // signer,
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

  const {
    methodParameters: { calldata: data },
  } = await fetchNftxQuote({
    network,
    sellToken: vaultAddress,
    sellAmount,
    buyToken: getChainConstant(WETH_TOKEN, network),
    slippagePercentage: slippage,
    userAddress,
  });

  const args = [BigInt(vaultId), ids.map(BigInt), data, userAddress] as const;
  // const contract = getContract({
  //   provider,
  //   signer,
  //   address,
  //   abi: NFTXMarketplace0xZap,
  // });

  console.debug(address, 'mintAndSell721', ...args);

  // TODO: implement
  throw new Error('Not implemented');
  // return contract.write.mintAndSell721({
  //   args,
  // });
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

const sellNftxErc1155 = sell0xErc721;

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
      zeroX: sell0xErc721,
      nftx: sellNftxErc721,
    },
    ERC1155: {
      zeroX: sell0xErc1155,
      nftx: sellNftxErc1155,
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
    givenStandard ||
    (tokenIds?.some((x) => typeof x?.[1] === 'number' && x?.[1] > 1)
      ? 'ERC1155'
      : 'ERC721');

  const supports0x = doesNetworkSupport0x(network);
  const supportsNftx = doesNetworkSupportNftxRouter(network);
  const router = supportsNftx ? 'nftx' : supports0x ? 'zeroX' : 'unknown';
  if (router === 'unknown') {
    throw new Error(
      `sellIntoVault is not supported for ${standard} / ${quote}`
    );
  }

  const fn = matrix[quote]?.[standard]?.[router];

  if (!fn) {
    throw new Error(
      `sellIntoVault is not supported for ${standard} / ${quote}`
    );
  }

  return fn({
    network,
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
