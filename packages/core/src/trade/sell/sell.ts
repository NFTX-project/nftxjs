import type { BigNumber } from '@ethersproject/bignumber';
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
import type { VaultAddress, VaultId } from '../../vaults/types';
import { getChainConstant, getContract } from '../../web3';
import type { Address } from '../../web3/types';
import estimateGasAndFees from '../estimateGasAndFees';
import increaseGasLimit from '../increaseGasLimit';
import {
  getTokenIdAmounts,
  getUniqueTokenIds,
  getTotalTokenIds,
} from '../utils';
import { doesNetworkSupport0x, fetch0xQuote } from '../../price';

const sell0xErc721 = async ({
  vaultId,
  vaultAddress,
  tokenIds,
  userAddress,
  network,
  signer,
  quote: buyToken,
}: {
  vaultId: VaultId;
  vaultAddress: VaultAddress;
  tokenIds: string[] | [string, number][];
  network: number;
  signer: Signer;
  userAddress: Address;
  quote: 'ETH';
}) => {
  const sellAmount = getTotalTokenIds(tokenIds);
  const ids = getUniqueTokenIds(tokenIds);

  const quote = await fetch0xQuote({
    network,
    sellToken: vaultAddress,
    sellAmount,
    buyToken,
  });
  const contract = getContract({
    network,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
    abi: nftxMarketplace0xZap,
  });

  return contract.mintAndSell721(
    vaultId,
    ids,
    quote.allowanceTarget,
    quote.to,
    quote.data,
    userAddress
  );
};

const sellErc721 = async ({
  vaultId,
  tokenIds,
  minPrice,
  path,
  userAddress,
  network,
  signer,
}: {
  vaultId: VaultId;
  minPrice: BigNumber;
  path: [string, string];
  userAddress: Address;
  tokenIds: string[] | [string, number][];
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
  vaultId,
  tokenIds,
  minPrice,
  path,
  userAddress,
  network,
  signer,
}: {
  tokenIds: string[] | [string, number][];
  vaultId: VaultId;
  minPrice: BigNumber;
  path: [string, string];
  userAddress: Address;
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
  vaultId,
  vaultAddress,
  tokenIds,
  userAddress,
  network,
  signer,
  quote: buyToken,
}: {
  vaultId: VaultId;
  vaultAddress: VaultAddress;
  tokenIds: string[] | [string, number][];
  userAddress: Address;
  network: number;
  signer: Signer;
  quote: 'ETH';
}) => {
  const ids = getUniqueTokenIds(tokenIds);
  const amounts = getTokenIdAmounts(tokenIds);
  const sellAmount = getTotalTokenIds(tokenIds);

  const quote = await fetch0xQuote({
    network,
    sellToken: vaultAddress,
    sellAmount,
    buyToken,
  });

  const contract = getContract({
    network,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
    abi: nftxMarketplace0xZap,
  });

  return contract.mintAndSell1155(
    vaultId,
    ids,
    amounts,
    quote.allowanceTarget,
    quote.to,
    quote.data,
    userAddress
  );
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
  minPrice,
  network = config.network,
  signer,
  tokenIds,
  userAddress,
  vaultAddress,
  vaultId,
  quote = 'ETH',
  standard = Array.isArray(tokenIds?.[0]) ? 'ERC1155' : 'ERC721',
}: {
  network?: number;
  signer: Signer;
  userAddress: Address;
  vaultId: VaultId;
  vaultAddress: VaultAddress;
  /** Ids of the individual NFTs you want to sell
   * For 721s you just pass a flat array of ids ['1', '2']
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1]]
   */
  tokenIds: string[] | [string, number][];
  /** The minimum accepted payout amount
   * for example, 4 items at 1ETH each plus 5% slippage would be 3.8ETH
   */
  minPrice: BigNumber;
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}): Promise<ContractTransaction> => {
  const path = [vaultAddress, getChainConstant(WETH_TOKEN, network)] as [
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
    minPrice,
    network,
    path,
    quote,
    signer,
    tokenIds,
    userAddress,
    vaultAddress,
    vaultId,
  });
};

export default sell;
