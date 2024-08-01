import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import NFTXMarketplaceZap from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import { NFTX_MARKETPLACE_ZAP, WETH_TOKEN } from '@nftx/constants';
import { getExactTokenIds, getTotalTokenIds } from '../utils';
import estimateGasAndFees from '../estimateGasAndFees';
import { omitNil } from '../../utils';
import increaseGasLimit from '../increaseGasLimit';
import type { Signer } from 'ethers';
import config from '@nftx/config';
import { fetchVaultBuyPrice } from '../../price';
import { WeiPerEther } from '@ethersproject/constants';
import { parseEther } from '@ethersproject/units';
import type { Vault } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

type BuyVault = Pick<Vault, 'id' | 'vaultId' | 'reserveVtoken'> & {
  fees: Pick<Vault['fees'], 'randomRedeemFee' | 'targetRedeemFee'>;
  features: Pick<
    Vault['features'],
    'enableRandomRedeem' | 'enableTargetRedeem'
  >;
};

const buyErc721 = async ({
  network,
  signer,
  userAddress,
  vault,
  vault: { id: vaultAddress, vaultId },
  slippage,
  randomBuys,
  tokenIds,
}: {
  network: number;
  signer: Signer;
  userAddress: string;
  vault: BuyVault;
  tokenIds: string[] | [string, number][];
  randomBuys: number;
  slippage: number;
}) => {
  const ids = getExactTokenIds(tokenIds);
  const targetBuys = getTotalTokenIds(tokenIds);
  const amount = targetBuys + randomBuys;
  const address = getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  const contract = getContract({
    network,
    signer,
    abi: NFTXMarketplaceZap,
    address,
  });
  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [vaultId, amount, ids, path, userAddress];
  let maxPrice: BigNumber = null;
  if (slippage) {
    const { price } = await fetchVaultBuyPrice({
      vault,
      provider: signer.provider,
      network,
      randomBuys,
      targetBuys,
    });
    maxPrice = price
      .mul(WeiPerEther.add(parseEther(`${slippage}`)))
      .div(WeiPerEther);
  }

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      contract,
      method: 'buyAndRedeem',
      args: args,
      overrides: omitNil({ value: maxPrice?.toString() }),
    });

  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });
  const overrides = omitNil({
    value: maxPrice?.toString(),
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  console.debug(address, 'buyAndRedeem', ...args, overrides);

  return contract.buyAndRedeem(...args, overrides);
};

const buyErc1155 = buyErc721;

const matrix = {
  ETH: {
    ERC721: buyErc721,

    ERC1155: buyErc1155,
  },
};

/**
 * Buy one or more NFTs from a vault.
 */
const buy = async (args: {
  network?: number;
  /** The percentage amount of slippage you're willing to accept  */
  slippage?: number;
  signer: Signer;
  /** The address of the buyer */
  userAddress: string;
  /** The vault you're buying from */
  vault: BuyVault;
  /** Ids of the individual NFTs you want to buy.
   * For 721s you just pass a flat array of ids ['1','2','3'].
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1], ['3', 2]]
   */
  tokenIds?: string[] | [string, number][];
  /** If you want to do a random buy, enter the number of randoms you want (you can buy targets and randoms at the same time) */
  randomBuys?: number;
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}): Promise<ContractTransaction> => {
  const {
    network = config.network,
    signer,
    userAddress,
    vault,
    slippage = 0,
    randomBuys = 0,
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
    randomBuys,
    signer,
    tokenIds,
    userAddress,
    vault,
    slippage,
  });
};

export default buy;
