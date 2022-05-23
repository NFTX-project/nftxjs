import type { BigNumber } from '@ethersproject/bignumber';
import type { Contract, ContractTransaction } from '@ethersproject/contracts';
import { NFTX_MARKETPLACE_ZAP, WETH_TOKEN } from '@nftx/constants';
import abi from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import type { Signer } from 'ethers';
import { getChainConstant, omitNil } from '../utils';
import type { VaultAddress, VaultId } from '../vaults/types';
import { getContract } from '../web3';
import type { Address } from '../web3/types';
import estimateGasAndFees from './estimateGasAndFees';
import increaseGasLimit from './increaseGasLimit';
import { getTokenIdAmounts, getUniqueTokenIds } from './utils';

const sellErc721 = async ({
  vaultId,
  tokenIds,
  minPrice,
  path,
  userAddress,
  contract,
}: {
  vaultId: VaultId;
  minPrice: BigNumber;
  path: [string, string];
  userAddress: Address;
  contract: Contract;
  tokenIds: string[] | [string, number][];
}) => {
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
  contract,
}: {
  tokenIds: string[] | [string, number][];
  vaultId: VaultId;
  minPrice: BigNumber;
  path: [string, string];
  userAddress: Address;
  contract: Contract;
}) => {
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

const sellIntoVault = async ({
  minPrice,
  network,
  signer,
  tokenIds,
  userAddress,
  vaultAddress,
  vaultId,
  quote = 'ETH',
  standard = Array.isArray(tokenIds?.[0]) ? 'ERC1155' : 'ERC721',
}: {
  network: number;
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

  const contract = getContract({
    network,
    signer,
    abi,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
  });

  if (quote === 'ETH') {
    if (standard === 'ERC721') {
      return sellErc721({
        contract,
        minPrice,
        path,
        tokenIds,
        userAddress,
        vaultId,
      });
    }
    if (standard === 'ERC1155') {
      return sellErc1155({
        contract,
        minPrice,
        path,
        tokenIds,
        userAddress,
        vaultId,
      });
    }
  }

  throw new Error(`sellIntoVault is not supported for ${standard} / ${quote}`);
};

export default sellIntoVault;
