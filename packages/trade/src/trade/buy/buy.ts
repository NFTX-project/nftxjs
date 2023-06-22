import { NFTX_MARKETPLACE_ZAP, WeiPerEther, WETH_TOKEN } from '@nftx/constants';
import { getExactTokenIds, getTotalTokenIds } from '../utils';
import { omitNil } from '../../utils';
import config from '@nftx/config';
import calculateBuyFee from '../../price/calculateBuyFee';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { parseEther } from 'viem';
import fetchNftxQuote from '../../price/fetchNftxQuote';

type BuyVault = Pick<Vault, 'id' | 'vaultId' | 'reserveVtoken'> & {
  fees: Pick<Vault['fees'], 'targetRedeemFee'>;
  features: Pick<Vault['features'], 'enableTargetRedeem'>;
};

const buyNftxErc721 = async ({
  network,
  // provider,
  // signer,
  tokenIds,
  userAddress,
  vault,
  slippage,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  userAddress: Address;
  vault: BuyVault;
  tokenIds: TokenId[] | [TokenId, number][];
  slippage: number;
}) => {
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  const { vaultId, id: vaultAddress } = vault;
  // const contract = getContract({
  //   abi: NFTXMarketplace0xZap,
  //   address,
  //   provider,
  //   signer,
  // });

  const specificIds = getExactTokenIds(tokenIds);
  const targetBuys = getTotalTokenIds(tokenIds);
  const fee = calculateBuyFee({ vault, targetBuys });
  const amount = targetBuys;
  const buyAmount = fee + WeiPerEther * BigInt(amount);

  const {
    methodParameters: { calldata },
    quote,
  } = await fetchNftxQuote({
    network,
    buyToken: vaultAddress,
    buyAmount,
    sellToken: getChainConstant(WETH_TOKEN, network),
    slippagePercentage: slippage,
    userAddress,
  });

  const args = [
    BigInt(vaultId),
    BigInt(amount),
    specificIds.map(BigInt),
    calldata,
    userAddress,
  ] as const;
  const slippageMultiplier = parseEther(`${slippage || 0}`) + WeiPerEther;
  const value =
    ((BigInt(quote) / WeiPerEther) * slippageMultiplier) / WeiPerEther;

  const overrides = omitNil({
    value,
  });

  console.debug(address, 'buyAndRedeem', ...args, overrides);

  // TODO: implement
  // return contract.write.buyAndRedeem({ args, ...overrides });
  throw new Error('Not implemented');
};

const buyNftxErc1155 = buyNftxErc721;

const matrix = {
  ETH: {
    ERC721: buyNftxErc721,
    ERC1155: buyNftxErc1155,
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
    tokenIds = [],
    standard = 'ERC721',
    quote = 'ETH',
  } = args;

  const fn = matrix[quote]?.[standard];

  if (!fn) {
    throw new Error(`buyFromVault is not supported for ${standard} / ${quote}`);
  }

  return fn({
    network,
    provider,
    signer,
    tokenIds,
    userAddress,
    vault,
    slippage,
  });
};

export default buy;
