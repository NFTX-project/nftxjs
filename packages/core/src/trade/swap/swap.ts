import type { BigNumber } from '@ethersproject/bignumber';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  WETH_TOKEN,
} from '@nftx/constants';
import type { Signer } from 'ethers';
import type { Vault, VaultAddress, VaultId } from '../../vaults';
import { Address, getChainConstant, getContract } from '../../web3';
import {
  getExactTokenIds,
  getTokenIdAmounts,
  getTotalTokenIds,
  getUniqueTokenIds,
} from '../utils';
import nftxMarketplaceZap from '@nftx/constants/abis/NFTXMarketplaceZap.json';
import nftxMarketplace0xZap from '@nftx/constants/abis/NFTXMarketplace0xZap.json';
import vaultAbi from '@nftx/constants/abis/NFTXVaultUpgradeable.json';
import estimateGasAndFees from '../estimateGasAndFees';
import { omitNil } from '../../utils';
import increaseGasLimit from '../increaseGasLimit';
import config from '@nftx/config';
import { doesNetworkSupport0x, fetch0xQuote } from '../../price';

const swapErc721WithFee = async ({
  maxPrice,
  mintTokenIds,
  network,
  redeemTokenIds,
  signer,
  userAddress,
  vaultAddress,
  vaultId,
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
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
    abi: nftxMarketplaceZap,
  });

  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [vaultId, mintIds, redeemIds, path, userAddress];
  const method = 'buyAndSwap721';

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      contract,
      args,
      method,
      overrides: omitNil({ value: maxPrice }),
    });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  try {
    return contract[method](
      ...args,
      omitNil({ value: maxPrice, gasLimit, maxFeePerGas, maxPriorityFeePerGas })
    );
  } catch {
    return contract[method](...args, omitNil({ value: maxPrice, gasLimit }));
  }
};

const swapErc721NoFee = async ({
  mintTokenIds,
  network,
  redeemTokenIds,
  signer,
  vaultAddress,
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

const swap0xErc721 = async ({
  mintTokenIds,
  network,
  quote,
  randomFee,
  redeemTokenIds,
  signer,
  targetFee,
  userAddress,
  vaultAddress,
  vaultId,
}: {
  network: number;
  signer: Signer;
  vaultAddress: VaultAddress;
  vaultId: VaultId;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  targetFee: BigNumber;
  randomFee: BigNumber;
  quote: 'ETH';
  userAddress: Address;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const buyAmount = targetFee
    .mul(getTotalTokenIds(mintTokenIds))
    .add(randomFee.mul(getTotalTokenIds(redeemTokenIds)));

  const contract = getContract({
    network,
    abi: nftxMarketplace0xZap,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
  });

  const {
    allowanceTarget: spender,
    to: swapTarget,
    data: swapCallData,
  } = await fetch0xQuote({
    network,
    sellToken: quote,
    buyToken: vaultAddress,
    buyAmount,
  });

  return contract.buyAndSwap721(
    vaultId,
    mintIds,
    redeemIds,
    spender,
    swapTarget,
    swapCallData,
    userAddress
  );
};

const swapErc1155WithFee = async ({
  maxPrice,
  mintTokenIds,
  network,
  redeemTokenIds,
  signer,
  userAddress,
  vaultAddress,
  vaultId,
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
    abi: nftxMarketplaceZap,
    address: getChainConstant(NFTX_MARKETPLACE_ZAP, network),
  });

  const path = [getChainConstant(WETH_TOKEN, network), vaultAddress];
  const args = [vaultId, mintIds, amounts, redeemIds, path, userAddress];
  const method = 'buyAndSwap1155';

  const { gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
    await estimateGasAndFees({
      args,
      contract,
      method,
      overrides: omitNil({ value: maxPrice }),
    });
  const gasLimit = increaseGasLimit({ estimate: gasEstimate, amount: 7 });

  try {
    return contract[method](
      ...args,
      omitNil({ value: maxPrice, gasLimit, maxFeePerGas, maxPriorityFeePerGas })
    );
  } catch {
    return contract[method](...args, omitNil({ value: maxPrice, gasLimit }));
  }
};

const swapErc1155NoFee = swapErc721NoFee;

const swap0xErc1155 = async ({
  mintTokenIds,
  network,
  quote,
  randomFee,
  redeemTokenIds,
  signer,
  targetFee,
  userAddress,
  vaultAddress,
  vaultId,
}: {
  network: number;
  signer: Signer;
  vaultAddress: VaultAddress;
  vaultId: VaultId;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  targetFee: BigNumber;
  randomFee: BigNumber;
  quote: 'ETH';
  userAddress: Address;
}) => {
  const mintIds = getUniqueTokenIds(mintTokenIds);
  const amounts = getTokenIdAmounts(mintTokenIds);
  const redeemIds = getExactTokenIds(redeemTokenIds);
  const buyAmount = targetFee
    .mul(getTotalTokenIds(mintTokenIds))
    .add(randomFee.mul(getTotalTokenIds(redeemTokenIds)));

  const contract = getContract({
    network,
    abi: nftxMarketplace0xZap,
    signer,
    address: getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network),
  });

  const {
    allowanceTarget: spender,
    to: swapTarget,
    data: swapCallData,
  } = await fetch0xQuote({
    network,
    sellToken: quote,
    buyToken: vaultAddress,
    buyAmount,
  });

  return contract.buyAndSwap1155(
    vaultId,
    mintIds,
    amounts,
    redeemIds,
    spender,
    swapTarget,
    swapCallData,
    userAddress
  );
};

const matrix = {
  ETH: {
    ERC721: {
      true: {
        true: swap0xErc721,
        false: swapErc721WithFee,
      },
      false: {
        true: swapErc721NoFee,
        false: swapErc721NoFee,
      },
    },
    ERC1155: {
      true: {
        true: swap0xErc1155,
        false: swapErc1155WithFee,
      },
      false: {
        true: swapErc1155NoFee,
        false: swapErc1155NoFee,
      },
    },
  },
};

const swap = ({
  network = config.network,
  signer,
  vault,
  maxPrice,
  mintTokenIds,
  redeemTokenIds,
  userAddress,
  quote = 'ETH',
  standard = 'ERC721',
}: {
  network?: number;
  signer: Signer;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  vault: Pick<Vault, 'id' | 'vaultId'> & {
    fees: Pick<Vault['fees'], 'targetSwapFee' | 'randomSwapFee'>;
  };
  userAddress: Address;
  maxPrice?: BigNumber;
  quote?: 'ETH';
  standard?: 'ERC721' | 'ERC1155';
}) => {
  const totalCount = getTotalTokenIds(mintTokenIds);
  const targetCount = getTotalTokenIds(redeemTokenIds);
  const randomCount = totalCount - targetCount;
  const hasFee =
    (targetCount > 0 && vault.fees.targetSwapFee.gt(0)) ||
    (randomCount > 0 && vault.fees.randomSwapFee.gt(0));
  const supports0x = doesNetworkSupport0x(network);

  const fn = matrix[quote]?.[standard][`${hasFee}`]?.[`${supports0x}`];
  if (!fn) {
    throw new Error(
      `swapWithVault is not supported for ${standard} / ${quote}`
    );
  }

  return fn({
    maxPrice,
    mintTokenIds,
    network,
    quote,
    redeemTokenIds,
    signer,
    vaultId: vault.vaultId,
    vaultAddress: vault.id,
    randomFee: vault.fees.randomSwapFee,
    targetFee: vault.fees.targetSwapFee,
    userAddress,
  });
};

export default swap;
