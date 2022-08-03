import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import type { VaultId } from '../../vaults/types';
import { getChainConstant, getContract } from '../../web3';
import type { Address } from '../../web3/types';
import NFTXMarketplaceZap from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import NftxMarketplace0xZap from '@nftx/constants/abis/NFTXMarketplace0xZap.json';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  WETH_TOKEN,
} from '@nftx/constants';
import { getExactTokenIds, getTotalTokenIds } from '../utils';
import estimateGasAndFees from '../estimateGasAndFees';
import { omitNil } from '../../utils';
import increaseGasLimit from '../increaseGasLimit';
import type { Signer } from 'ethers';
import config from '@nftx/config';
import { doesNetworkSupport0x, fetch0xQuote } from '../../price';

const buyErc721 = async ({
  network,
  signer,
  userAddress,
  vaultAddress,
  vaultId,
  maxPrice,
  randomBuys,
  tokenIds,
}: {
  network: number;
  signer: Signer;
  userAddress: Address;
  vaultId: VaultId;
  vaultAddress: Address;
  tokenIds: string[] | [string, number][];
  randomBuys: number;
  maxPrice: BigNumber;
}) => {
  const ids = getExactTokenIds(tokenIds);
  const amount = getTotalTokenIds(tokenIds) + randomBuys;
  const contract = getContract({
    network,
    signer,
    abi: NFTXMarketplaceZap,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
  });
  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [vaultId, amount, ids, path, userAddress];

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      contract,
      method: 'buyAndRedeem',
      args: args,
      overrides: omitNil({ value: maxPrice?.toString() }),
    });

  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  return contract.buyAndRedeem(
    ...args,
    omitNil({
      value: maxPrice?.toString(),
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  );
};

const buy0xErc721 = async ({
  network,
  signer,
  tokenIds,
  vaultId,
  userAddress,
  vaultAddress,
  quote: sellToken,
}) => {
  const contract = getContract({
    abi: NftxMarketplace0xZap,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
    network,
    signer,
  });

  const specificIds = getExactTokenIds(tokenIds);
  const amount = getTotalTokenIds(tokenIds);

  const {
    allowanceTarget: spender,
    to: swapTarget,
    data: swapCallData,
  } = await fetch0xQuote({
    network,
    buyToken: vaultAddress,
    buyAmount: amount,
    sellToken,
  });

  return contract.buyAndRedeem(
    vaultId,
    amount,
    specificIds,
    spender,
    swapTarget,
    swapCallData,
    userAddress
  );
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

/** Buy one or more NFTs from an NFTX vault */
const buy = async ({
  network = config.network,
  signer,
  userAddress,
  vaultAddress,
  vaultId,
  maxPrice,
  randomBuys = 0,
  tokenIds = [],
  standard = 'ERC721',
  quote = 'ETH',
}: {
  network?: number;
  signer: Signer;
  userAddress: Address;
  vaultId: VaultId;
  vaultAddress: Address;
  /** Ids of the individual NFTs you want to buy
   * For 721s you just pass a flat array of ids ['1','2','3']
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1], ['3', 2]]
   */
  tokenIds?: string[] | [string, number][];
  /** If you want to do a random buy, enter the number of randoms you want (you can buy targets and randoms at the same time) */
  randomBuys?: number;
  /** The max price (including slippage) you're willing to pay */
  maxPrice?: BigNumber;
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}): Promise<ContractTransaction> => {
  const supports0x = doesNetworkSupport0x(network);

  const fn = matrix[quote]?.[standard]?.[`${supports0x}`];

  if (!fn) {
    throw new Error(`buyFromVault is not supported for ${standard} / ${quote}`);
  }

  return fn({
    maxPrice,
    network,
    quote,
    randomBuys,
    signer,
    tokenIds,
    userAddress,
    vaultAddress,
    vaultId,
  });
};

export default buy;
