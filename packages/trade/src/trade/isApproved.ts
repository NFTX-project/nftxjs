import type { BigNumber } from '@ethersproject/bignumber';
import type { Provider } from '@ethersproject/providers';
import erc721Abi from '@nftx/constants/abis/ERC721.json';
import erc20Abi from '@nftx/constants/abis/ERC20.json';
import punkAbi from '@nftx/constants/abis/CryptoPunks.json';
import { MaxUint256 } from '@ethersproject/constants';
import config from '@nftx/config';
import { addressEqual, getContract, isCryptoPunk } from '@nftx/utils';

const isPunkApproved = async ({
  network,
  provider,
  tokenAddress,
  tokenId,
  userAddress,
  spenderAddress,
}: {
  network: number;
  provider: Provider;
  tokenAddress: string;
  tokenId: string;
  userAddress: string;
  spenderAddress: string;
}) => {
  try {
    const contract = getContract({
      network,
      provider,
      address: tokenAddress,
      abi: punkAbi,
    });

    const punk: {
      isForSale: boolean;
      punkIndex: BigNumber;
      seller: string;
      minValue: BigNumber;
      onlySellTo: string;
    } = await contract.punksOfferedForSale(tokenId);

    return [
      punk.isForSale,
      addressEqual(punk.seller, userAddress),
      punk.minValue.isZero(),
      addressEqual(punk.onlySellTo, spenderAddress),
    ].every(Boolean);
  } catch {
    return false;
  }
};

const arePunksApproved = async ({
  tokenIds,
  network,
  provider,
  spenderAddress,
  tokenAddress,
  userAddress,
}: {
  tokenIds: string[];
  network: number;
  provider: Provider;
  spenderAddress: string;
  tokenAddress: string;
  userAddress: string;
}) => {
  const results = await Promise.all(
    tokenIds.map(async (tokenId) => {
      return isPunkApproved({
        network,
        provider,
        spenderAddress,
        tokenAddress,
        tokenId,
        userAddress,
      });
    })
  );

  return results.every(Boolean);
};

const isErc721Approved = async ({
  network,
  provider,
  tokenAddress,
  userAddress,
  spenderAddress,
}: {
  network: number;
  provider: Provider;
  tokenAddress: string;
  userAddress: string;
  spenderAddress: string;
}) => {
  const contract = getContract({
    network,
    abi: erc721Abi,
    provider,
    address: tokenAddress,
  });
  const approved: boolean = await contract.isApprovedForAll(
    userAddress,
    spenderAddress
  );
  return approved;
};

const isErc1155Approved = isErc721Approved;

const isErc20Approved = async ({
  network,
  provider,
  tokenAddress,
  userAddress,
  spenderAddress,
  amount,
}: {
  network: number;
  provider: Provider;
  tokenAddress: string;
  userAddress: string;
  spenderAddress: string;
  amount: BigNumber;
}) => {
  try {
    const contract = getContract({
      network,
      provider,
      abi: erc20Abi,
      address: tokenAddress,
    });
    const allowance: BigNumber = await contract.allowance(
      userAddress,
      spenderAddress
    );
    return allowance.gt(0) && allowance.gte(amount ?? MaxUint256);
  } catch {
    return false;
  }
};

/** Returns whether a spender is approved to spend a given token */
const isApproved = async (args: {
  network?: number;
  provider: Provider;
  /** The token you want to spend */
  tokenAddress: string;
  /** The contract that will be spending the token */
  spenderAddress: string;
  /** The user who is approving the spender */
  userAddress: string;
  /** Optionally provide the tokenId. Certain contracts such as CryptoPunks need to approve individual tokens */
  tokenId?: string;
  /** Optionally provide a list of tokenIds. Certain contracts such as CryptoPunks need to approve individual tokens */
  tokenIds?: string[];
  /** For ERC20 contracts, you can supply a specific amount to be approved. Defaults to the maximum amount */
  amount?: BigNumber;
  /** The token standard for tokenAddress */
  standard?: 'ERC721' | 'ERC1155' | 'ERC20';
}): Promise<boolean> => {
  const {
    network = config.network,
    provider,
    spenderAddress,
    tokenAddress,
    userAddress,
    amount,
    tokenId,
    tokenIds,
    standard = tokenId || tokenIds ? 'ERC721' : 'ERC20',
  } = args;

  if (standard === 'ERC721') {
    if (isCryptoPunk(tokenAddress)) {
      return arePunksApproved({
        network,
        provider,
        spenderAddress,
        tokenAddress,
        userAddress,
        tokenIds: tokenIds ?? [tokenId],
      });
    }
    return isErc721Approved({
      network,
      provider,
      spenderAddress,
      tokenAddress,
      userAddress,
    });
  }
  if (standard === 'ERC1155') {
    return isErc1155Approved({
      network,
      provider,
      tokenAddress,
      spenderAddress,
      userAddress,
    });
  }
  if (standard === 'ERC20') {
    return isErc20Approved({
      amount,
      network,
      provider,
      spenderAddress,
      tokenAddress,
      userAddress,
    });
  }

  return false;
};

export default isApproved;
