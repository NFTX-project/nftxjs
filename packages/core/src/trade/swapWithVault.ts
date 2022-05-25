import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import abi from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import vaultAbi from '@nftx/constants/abis/NFTXVaultUpgradeable.json';
import type { VaultAddress, VaultId } from '../vaults/types';
import type { Address } from '../web3/types';
import type { Vault } from '../vaults';
import {
  getExactTokenIds,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from './utils';
import { getChainConstant, getContract } from '../web3';
import { omitNil } from '../utils';
import { NFTX_MARKETPLACE_ZAP, WETH_TOKEN } from '@nftx/constants';
import estimateGasAndFees from './estimateGasAndFees';
import increaseGasLimit from './increaseGasLimit';
import type { Signer } from 'ethers';

const swapErc721WithFee = async ({
  network,
  signer,
  vaultId,
  userAddress,
  vaultAddress,
  maxPrice,
  mintTokenIds,
  redeemTokenIds,
}: {
  network: number;
  signer: Signer;
  vaultId: VaultId;
  vaultAddress: VaultAddress;
  userAddress: Address;
  maxPrice: BigNumber;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const redeemIds = getUniqueTokenIds(redeemTokenIds);

  const contract = getContract({
    network,
    signer,
    abi,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
  });

  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];

  const args = [vaultId, mintIds, redeemIds, path, userAddress];

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      contract,
      method: 'buyAndSwap721',
      args,
      overrides: omitNil({
        value: maxPrice,
      }),
    });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  try {
    return contract.buyAndSwap721(
      ...args,
      omitNil({
        value: maxPrice,
        gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
      })
    );
  } catch {
    return contract.buyAndSwap721(
      ...args,
      omitNil({
        value: maxPrice,
        gasLimit,
      })
    );
  }
};

const swapErc721NoFee = async ({
  network,
  signer,
  vaultAddress,
  mintTokenIds,
  redeemTokenIds,
}: {
  network: number;
  signer: Signer;
  vaultAddress: VaultAddress;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const redeemIds = getUniqueTokenIds(redeemTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);

  const contract = getContract({
    network,
    signer,
    address: vaultAddress,
    abi: vaultAbi,
  });
  return contract.swap(mintIds, amounts, redeemIds);
};

const swapErc1155WithFee = async ({
  network,
  signer,
  vaultId,
  userAddress,
  vaultAddress,
  maxPrice,
  mintTokenIds,
  redeemTokenIds,
}: {
  network: number;
  signer: Signer;
  vaultId: VaultId;
  vaultAddress: VaultAddress;
  userAddress: Address;
  maxPrice: BigNumber;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const contract = getContract({
    network,
    signer,
    abi,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
  });
  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [vaultId, mintIds, amounts, redeemIds, path, userAddress];

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      args,
      contract,
      method: 'buyAndSwap1155',
      overrides: omitNil({ value: maxPrice }),
    });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  try {
    return contract.buyAndSwap1155(
      ...args,
      omitNil({
        value: maxPrice,
        gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
      })
    );
  } catch {
    return contract.buyAndSwap1155(
      ...args,
      omitNil({
        value: maxPrice,
        gasLimit,
      })
    );
  }
};

const swapErc1155NoFee = async ({
  network,
  signer,
  vaultAddress,
  mintTokenIds,
  redeemTokenIds,
}: {
  network: number;
  signer: Signer;
  vaultAddress: VaultAddress;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);

  const contract = getContract({
    network,
    signer,
    address: vaultAddress,
    abi: vaultAbi,
  });
  return contract.swap(mintIds, amounts, redeemIds);
};

const swapWithVault = async ({
  vault,
  mintTokenIds,
  network,
  signer,
  redeemTokenIds,
  userAddress,
  vaultAddress,
  vaultId,
  maxPrice,
  quote,
  standard,
}: {
  network: number;
  signer: Signer;
  userAddress: Address;
  vaultId: VaultId;
  vaultAddress: VaultAddress;
  vault: { fees: Pick<Vault['fees'], 'randomSwapFee' | 'targetSwapFee'> };
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  maxPrice?: BigNumber;
  standard?: 'ERC721' | 'ERC1155';
  quote?: 'ETH';
}): Promise<ContractTransaction> => {
  const totalCount = getTotalTokenIds(mintTokenIds);
  const targetCount = getTotalTokenIds(redeemTokenIds);
  const randomCount = totalCount - targetCount;
  const hasFee =
    (targetCount > 0 && vault.fees.targetSwapFee.gt(0)) ||
    (randomCount > 0 && vault.fees.randomSwapFee.gt(0));

  if (quote === 'ETH') {
    if (standard === 'ERC721') {
      if (hasFee) {
        return swapErc721WithFee({
          maxPrice,
          mintTokenIds,
          network,
          signer,
          redeemTokenIds,
          userAddress,
          vaultAddress,
          vaultId,
        });
      }
      return swapErc721NoFee({
        mintTokenIds,
        network,
        signer,
        redeemTokenIds,
        vaultAddress,
      });
    }
    if (standard === 'ERC1155') {
      if (hasFee) {
        return swapErc1155WithFee({
          maxPrice,
          mintTokenIds,
          network,
          signer,
          redeemTokenIds,
          userAddress,
          vaultAddress,
          vaultId,
        });
      }
      return swapErc1155NoFee({
        mintTokenIds,
        network,
        signer,
        redeemTokenIds,
        vaultAddress,
      });
    }
  }

  throw new Error(`swapWithVault is not supported for ${standard} / ${quote}`);
};

export default swapWithVault;
