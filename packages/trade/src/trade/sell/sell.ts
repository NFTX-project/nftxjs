import config from '@nftx/config';
import { NFTX_MARKETPLACE_ZAP, WETH_TOKEN } from '@nftx/constants';
import { getUniqueTokenIds, getTotalTokenIds } from '../utils';
import calculateSellFee from '../../price/calculateSellFee';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
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
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);

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

const sellNftxErc1155 = sellNftxErc721;

const matrix = {
  ETH: {
    ERC721: sellNftxErc721,
    ERC1155: sellNftxErc1155,
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

  const fn = matrix[quote]?.[standard];

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
