import { NFTXMarketplace0xZap, NFTXMarketplaceZap } from '@nftx/abi';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  WeiPerEther,
  WETH_TOKEN,
} from '@nftx/constants';
import { getExactTokenIds, getTotalTokenIds } from '../utils';
import { omitNil } from '../../utils';
import config from '@nftx/config';
import {
  doesNetworkSupport0x,
  fetch0xQuote,
  fetchVaultBuyPrice,
} from '../../price';
import calculateBuyFee from '../../price/calculateBuyFee';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';
import { parseEther } from 'viem';

type BuyVault = Pick<Vault, 'id' | 'vaultId' | 'reserveVtoken'> & {
  fees: Pick<Vault['fees'], 'randomRedeemFee' | 'targetRedeemFee'>;
  features: Pick<
    Vault['features'],
    'enableRandomRedeem' | 'enableTargetRedeem'
  >;
};

const buyErc721 = async ({
  network,
  provider,
  signer,
  userAddress,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
  randomBuys,
  tokenIds,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  userAddress: Address;
  vault: BuyVault;
  tokenIds: TokenId[] | [TokenId, number][];
  randomBuys: number;
  slippage: number;
}) => {
  const ids = getExactTokenIds(tokenIds);
  const targetBuys = getTotalTokenIds(tokenIds);
  const amount = targetBuys + randomBuys;
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  const contract = getContract({
    provider,
    signer,
    abi: NFTXMarketplaceZap,
    address,
  });
  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [
    BigInt(vaultId),
    BigInt(amount),
    ids.map(BigInt),
    path,
    userAddress,
  ] as const;
  let maxPrice: bigint | undefined;
  if (slippage) {
    const { price } = await fetchVaultBuyPrice({
      vault,
      provider,
      network,
      randomBuys,
      targetBuys,
    });
    maxPrice =
      (price * (WeiPerEther + parseEther(`${slippage}`))) / WeiPerEther;
  }

  const overrides = omitNil({
    value: maxPrice,
  });

  console.debug(address, 'buyAndRedeem', ...args, overrides);

  return contract.write.buyAndRedeem({
    args,
    ...overrides,
  });
};

const buy0xErc721 = async ({
  network,
  provider,
  signer,
  tokenIds,
  userAddress,
  randomBuys,
  vault,
  slippage,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  userAddress: Address;
  vault: BuyVault;
  tokenIds: TokenId[] | [TokenId, number][];
  randomBuys: number;
  slippage: number;
}) => {
  const address = getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network);
  const { vaultId, id: vaultAddress } = vault;
  const contract = getContract({
    abi: NFTXMarketplace0xZap,
    address,
    provider,
    signer,
  });

  const specificIds = getExactTokenIds(tokenIds);
  const targetBuys = getTotalTokenIds(tokenIds);
  const fee = calculateBuyFee({ vault, randomBuys, targetBuys });
  const amount = targetBuys + randomBuys;
  const buyAmount = fee + WeiPerEther * BigInt(amount);

  const { data, guaranteedPrice } = await fetch0xQuote({
    type: 'quote',
    network,
    buyToken: vaultAddress,
    buyAmount,
    sellToken: getChainConstant(WETH_TOKEN, network),
    slippagePercentage: slippage,
  });

  const args = [
    BigInt(vaultId),
    BigInt(amount),
    specificIds.map(BigInt),
    data,
    userAddress,
  ] as const;
  const slippageMultiplier = parseEther(`${slippage || 0}`) + WeiPerEther;
  const value =
    (((parseEther(guaranteedPrice) * buyAmount) / WeiPerEther) *
      slippageMultiplier) /
    WeiPerEther;

  const overrides = omitNil({
    value,
  });

  console.debug(address, 'buyAndRedeem', ...args, overrides);

  return contract.write.buyAndRedeem({ args, ...overrides });
};

const buyErc1155 = buyErc721;

const buy0xErc1155 = buy0xErc721;

const matrix = {
  ETH: {
    ERC721: {
      true: buy0xErc721,
      false: buyErc721,
    },
    ERC1155: {
      true: buy0xErc1155,
      false: buyErc1155,
    },
  },
};

/**
 * Buy one or more NFTs from a vault.
 */
const buy = async (args: {
  network?: number;
  /** The percentage amount of slippage you're willing to accept  */
  slippage?: number;
  provider: Provider;
  signer: Signer;
  /** The address of the buyer */
  userAddress: Address;
  /** The vault you're buying from */
  vault: BuyVault;
  /** Ids of the individual NFTs you want to buy.
   * For 721s you just pass a flat array of ids ['1','2','3'].
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1], ['3', 2]]
   */
  tokenIds?: TokenId[] | [TokenId, number][];
  /** If you want to do a random buy, enter the number of randoms you want (you can buy targets and randoms at the same time) */
  randomBuys?: number;
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}) => {
  const {
    network = config.network,
    provider,
    signer,
    userAddress,
    vault,
    slippage = 0,
    randomBuys = 0,
    tokenIds = [],
    standard = 'ERC721',
    quote = 'ETH',
  } = args;

  const supports0x = doesNetworkSupport0x(network);

  const fn = matrix[quote]?.[standard]?.[`${supports0x}`];

  if (!fn) {
    throw new Error(`buyFromVault is not supported for ${standard} / ${quote}`);
  }

  return fn({
    network,
    randomBuys,
    provider,
    signer,
    tokenIds,
    userAddress,
    vault,
    slippage,
  });
};

export default buy;
