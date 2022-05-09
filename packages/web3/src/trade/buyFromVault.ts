import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import type { VaultId } from '../vaults/types';
import { getContract } from '../web3';
import type { Address } from '../web3/types';
import abi from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import { NFTX_MARKETPLACE_ZAP, WETH_TOKEN } from '@nftx/constants';
import { getExactTokenIds, getTotalTokenIds } from './utils';
import estimateGasAndFees from './estimateGasAndFees';
import { getChainConstant, omitNil } from '../utils';
import increaseGasLimit from './increaseGasLimit';
import type { Signer } from 'ethers';

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
    abi,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
  });
  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      contract,
      method: 'buyAndRedeem',
      args: [vaultId, amount, ids, path, userAddress],
      overrides: omitNil({ value: maxPrice?.toString() }),
    });

  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  return contract.buyAndRedeem(
    vaultId,
    amount,
    ids,
    path,
    userAddress,
    omitNil({
      value: maxPrice?.toString(),
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  );
};

const buyErc1155 = buyErc721;

/** Buy one or more NFTs from an NFTX vault */
const buyFromVault = async ({
  network,
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
  network: number;
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
  if (quote === 'ETH') {
    if (standard === 'ERC721') {
      return buyErc721({
        maxPrice,
        network,
        signer,
        randomBuys,
        tokenIds,
        userAddress,
        vaultAddress,
        vaultId,
      });
    }
    if (standard === 'ERC1155') {
      return buyErc1155({
        maxPrice,
        network,
        signer,
        randomBuys,
        tokenIds,
        userAddress,
        vaultAddress,
        vaultId,
      });
    }
  }

  throw new Error(`buyFromVault is not supported for ${standard} / ${quote}`);
};

export default buyFromVault;
