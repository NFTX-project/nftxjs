import type { BigNumber } from '@ethersproject/bignumber';
import type { JsonRpcProvider } from '@ethersproject/providers';
import erc721Abi from '@nftx/constants/abis/ERC721.json';
import erc20Abi from '@nftx/constants/abis/ERC20.json';
import punkAbi from '@nftx/constants/abis/CryptoPunks.json';
import { isCryptoPunk } from '../assets';
import { addressEqual, getContract } from '../web3';
import type { Address } from '../web3/types';
import { MaxUint256 } from '@ethersproject/constants';

const isPunkApproved = async ({
  network,
  provider,
  tokenAddress,
  tokenId,
  userAddress,
  spenderAddress,
}: {
  network: number;
  provider: JsonRpcProvider;
  tokenAddress: Address;
  tokenId: string;
  userAddress: Address;
  spenderAddress: Address;
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
  provider: JsonRpcProvider;
  spenderAddress: Address;
  tokenAddress: Address;
  userAddress: Address;
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
  provider: JsonRpcProvider;
  tokenAddress: Address;
  userAddress: Address;
  spenderAddress: Address;
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
  provider: JsonRpcProvider;
  tokenAddress: Address;
  userAddress: Address;
  spenderAddress: Address;
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

const isApproved = async ({
  network,
  provider,
  spenderAddress,
  tokenAddress,
  userAddress,
  amount,
  tokenId,
  tokenIds,
  standard = tokenId || tokenIds ? 'ERC721' : 'ERC20',
}: {
  network: number;
  provider: JsonRpcProvider;
  tokenAddress: Address;
  spenderAddress: Address;
  userAddress: Address;
  tokenId?: string;
  tokenIds?: string[];
  amount?: BigNumber;
  standard?: 'ERC721' | 'ERC1155' | 'ERC20';
}): Promise<boolean> => {
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
