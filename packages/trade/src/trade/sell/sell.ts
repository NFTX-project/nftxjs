import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  WETH_TOKEN,
} from '@nftx/constants';
import nftxMarketplaceZap from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import nftxMarketplace0xZap from '@nftx/constants/abis/NFTXMarketplace0xZap.json';
import type { Signer } from 'ethers';
import { omitNil } from '../../utils';
import estimateGasAndFees from '../estimateGasAndFees';
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
import { parseEther } from '@ethersproject/units';
import calculateSellFee from '../../price/calculateSellFee';
import { WeiPerEther } from '@ethersproject/constants';
import type { Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

type SellVault = Pick<Vault, 'id' | 'vaultId'> & {
  fees: Pick<Vault['fees'], 'mintFee'>;
};

const sell0xErc721 = async ({
  vault: { vaultId, id: vaultAddress },
  vault,
  tokenIds,
  network,
  signer,
  slippage,
  userAddress,
}: {
  vault: SellVault;
  tokenIds: string[] | [string, number][];
  network: number;
  signer: Signer;
  quote: 'ETH';
  slippage: number;
  userAddress: string;
}) => {
  const amount = getTotalTokenIds(tokenIds);
  const fee = calculateSellFee({ vault, amount });
  const sellAmount = parseEther(`${amount}`).sub(fee);
  const ids = getUniqueTokenIds(tokenIds);

  const { data } = await fetch0xQuote({
    network,
    sellToken: vaultAddress,
    sellAmount,
    buyToken: getChainConstant(WETH_TOKEN, network),
    slippagePercentage: slippage,
    type: 'quote',
  });
  const contract = getContract({
    network,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
    abi: nftxMarketplace0xZap,
  });

  return contract.mintAndSell721(vaultId, ids, data, userAddress);
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
  const contract = getContract({
    network,
    signer,
    abi: nftxMarketplaceZap,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
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

  try {
    // Attempt an EIP1559 transaction
    return contract.mintAndSell721(
      ...args,
      omitNil({ gasLimit, maxFeePerGas, maxPriorityFeePerGas })
    );
  } catch {
    // Fallback to a legacy tx
    return contract.mintAndSell721(
      vaultId,
      ids,
      minPrice,
      userAddress,
      omitNil({ gasLimit })
    );
  }
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
  const contract = getContract({
    network,
    signer,
    abi: nftxMarketplaceZap,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
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

  return contract.mintAndSell1155(
    ...args,
    omitNil({
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  );
};

const sell0xErc1155 = async ({
  vault,
  vault: { vaultId, id: vaultAddress },
  tokenIds,
  network,
  signer,
  slippage,
  userAddress,
}: {
  vault: SellVault;
  tokenIds: string[] | [string, number][];
  network: number;
  signer: Signer;
  quote: 'ETH';
  slippage: number;
  userAddress: string;
}) => {
  const ids = getUniqueTokenIds(tokenIds);
  const amounts = getTokenIdAmounts(tokenIds);
  const amount = getTotalTokenIds(tokenIds);
  const fee = calculateSellFee({ vault, amount });
  const sellAmount = parseEther(`${amount}`).sub(fee);

  const { data } = await fetch0xQuote({
    network,
    sellToken: vaultAddress,
    sellAmount,
    buyToken: getChainConstant(WETH_TOKEN, network),
    slippagePercentage: slippage,
    type: 'quote',
  });

  const contract = getContract({
    network,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
    abi: nftxMarketplace0xZap,
  });

  return contract.mintAndSell1155(vaultId, ids, amounts, data, userAddress);
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

const sell = async ({
  network = config.network,
  signer,
  tokenIds,
  userAddress,
  vault,
  slippage = 0,
  quote = 'ETH',
  standard = Array.isArray(tokenIds?.[0]) ? 'ERC1155' : 'ERC721',
}: {
  network?: number;
  slippage?: number;
  vault: SellVault;
  signer: Signer;
  userAddress: string;
  /** Ids of the individual NFTs you want to sell
   * For 721s you just pass a flat array of ids ['1', '2']
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1]]
   */
  tokenIds: string[] | [string, number][];
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}): Promise<ContractTransaction> => {
  const path = [vault.id, getChainConstant(WETH_TOKEN, network)] as [
    string,
    string
  ];

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
    signer,
    tokenIds,
    userAddress,
    slippage,
    vault,
  });
};

export default sell;
