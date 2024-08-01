import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import { NFTX_MARKETPLACE_ZAP, WETH_TOKEN } from '@nftx/constants';
import nftxMarketplaceZap from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import type { Signer } from 'ethers';
import { omitNil } from '../../utils';
import estimateGasAndFees from '../estimateGasAndFees';
import increaseGasLimit from '../increaseGasLimit';
import {
  getTokenIdAmounts,
  getUniqueTokenIds,
  getTotalTokenIds,
} from '../utils';
import { fetchVaultSellPrice } from '../../price';
import { parseEther } from '@ethersproject/units';
import calculateSellFee from '../../price/calculateSellFee';
import { WeiPerEther } from '@ethersproject/constants';
import type { Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

type SellVault = Pick<Vault, 'id' | 'vaultId'> & {
  fees: Pick<Vault['fees'], 'mintFee'>;
};

const sellErc721 = async ({
  vault,
  vault: { vaultId },
  tokenIds,
  path,
  userAddress,
  network,
  signer,
  slippage,
}: {
  vault: SellVault;
  path: [string, string];
  userAddress: string;
  tokenIds: string[] | [string, number][];
  network: number;
  signer: Signer;
  slippage: number;
}) => {
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  const contract = getContract({
    network,
    signer,
    abi: nftxMarketplaceZap,
    address,
  });
  const ids = getUniqueTokenIds(tokenIds);
  let { price: minPrice } = await fetchVaultSellPrice({
    vault,
    provider: signer.provider,
    network,
    amount: ids.length,
  });
  if (slippage) {
    minPrice = minPrice
      .mul(WeiPerEther.sub(parseEther(`${slippage}`)))
      .div(WeiPerEther);
  }
  const args = [vaultId, ids, minPrice, path, userAddress];

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      contract,
      method: 'mintAndSell721',
      args,
    });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });
  const overrides = omitNil({ gasLimit, maxFeePerGas, maxPriorityFeePerGas });

  console.debug(address, 'mintAndSell721', ...args, overrides);

  return contract.mintAndSell721(...args, overrides);
};

const sellErc1155 = async ({
  vault,
  vault: { vaultId },
  tokenIds,
  slippage,
  path,
  userAddress,
  network,
  signer,
}: {
  tokenIds: string[] | [string, number][];
  vault: SellVault;
  slippage: number;
  path: [string, string];
  userAddress: string;
  network: number;
  signer: Signer;
}) => {
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  const contract = getContract({
    network,
    signer,
    abi: nftxMarketplaceZap,
    address,
  });
  const ids = getUniqueTokenIds(tokenIds);
  const amounts = getTokenIdAmounts(tokenIds);
  let { price: minPrice } = await fetchVaultSellPrice({
    vault,
    provider: signer.provider,
    network,
    amount: ids.length,
  });
  if (slippage) {
    minPrice = minPrice
      .mul(WeiPerEther.sub(parseEther(`${slippage}`)))
      .div(WeiPerEther);
  }
  const args = [vaultId, ids, amounts, minPrice, path, userAddress];

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({ contract, method: 'mintAndSell1155', args });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });
  const overrides = omitNil({
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  console.debug(address, 'mintAndSell1155', ...args, overrides);

  return contract.mintAndSell1155(...args, overrides);
};

const matrix = {
  ETH: {
    ERC721: sellErc721,

    ERC1155: sellErc1155,
  },
};

/** Mints an NFT into an NFTX vault and returns ETH. */
const sell = async (args: {
  network?: number;
  /** The percentage amount of slippage you're willing to accept  */
  slippage?: number;
  /** The vault you're selling into */
  vault: SellVault;
  signer: Signer;
  /** The address of the seller */
  userAddress: string;
  /** Ids of the individual NFTs you want to sell.
   * For 721s you just pass a flat array of ids ['1', '2'].
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1]]
   */
  tokenIds: string[] | [string, number][];
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}): Promise<ContractTransaction> => {
  const {
    network = config.network,
    signer,
    tokenIds,
    userAddress,
    vault,
    slippage = 0,
    quote = 'ETH',
    standard = Array.isArray(tokenIds?.[0]) ? 'ERC1155' : 'ERC721',
  } = args;

  const path = [vault.id, getChainConstant(WETH_TOKEN, network)] as [
    string,
    string
  ];

  const fn = matrix[quote]?.[standard];

  if (!fn) {
    throw new Error(
      `sellIntoVault is not supported for ${standard} / ${quote}`
    );
  }

  return fn({
    network,
    path,
    signer,
    tokenIds,
    userAddress,
    slippage,
    vault,
  });
};

export default sell;
