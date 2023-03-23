import { ERC20, ERC721, CryptoPunks } from '@nftx/abi';
import { MaxUint256, Zero } from '@nftx/constants';
import type { Address, Provider, TokenId } from '@nftx/types';
import { addressEqual, getContract, isCryptoPunk } from '@nftx/utils';

const isPunkApproved = async ({
  provider,
  tokenAddress,
  tokenId,
  userAddress,
  spenderAddress,
}: {
  provider: Provider;
  tokenAddress: Address;
  tokenId: TokenId;
  userAddress: Address;
  spenderAddress: Address;
}) => {
  try {
    const contract = getContract({
      provider,
      address: tokenAddress,
      abi: CryptoPunks,
    });

    const [isForSale, , seller, minValue, onlySellTo] =
      await contract.read.punksOfferedForSale({ args: [BigInt(tokenId)] });

    return [
      isForSale,
      addressEqual(seller, userAddress),
      minValue === Zero,
      addressEqual(onlySellTo, spenderAddress),
    ].every(Boolean);
  } catch {
    return false;
  }
};

const arePunksApproved = async ({
  tokenIds,
  provider,
  spenderAddress,
  tokenAddress,
  userAddress,
}: {
  tokenIds: TokenId[];
  provider: Provider;
  spenderAddress: Address;
  tokenAddress: Address;
  userAddress: Address;
}) => {
  const results = await Promise.all(
    tokenIds.map(async (tokenId) => {
      return isPunkApproved({
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
  provider,
  tokenAddress,
  userAddress,
  spenderAddress,
}: {
  provider: Provider;
  tokenAddress: Address;
  userAddress: Address;
  spenderAddress: Address;
}) => {
  const contract = getContract({
    abi: ERC721,
    provider,
    address: tokenAddress,
  });
  const approved: boolean = await contract.read.isApprovedForAll({
    args: [userAddress, spenderAddress],
  });
  return approved;
};

const isErc1155Approved = isErc721Approved;

const isErc20Approved = async ({
  provider,
  tokenAddress,
  userAddress,
  spenderAddress,
  amount,
}: {
  provider: Provider;
  tokenAddress: Address;
  userAddress: Address;
  spenderAddress: Address;
  amount?: bigint;
}) => {
  try {
    const contract = getContract({
      provider,
      abi: ERC20,
      address: tokenAddress,
    });
    const allowance = await contract.read.allowance({
      args: [userAddress, spenderAddress],
    });
    return allowance > Zero && allowance >= (amount ?? MaxUint256);
  } catch {
    return false;
  }
};

/** Returns whether a spender is approved to spend a given token */
const isApproved = async (args: {
  network?: number;
  provider: Provider;
  /** The token you want to spend */
  tokenAddress: Address;
  /** The contract that will be spending the token */
  spenderAddress: Address;
  /** The user who is approving the spender */
  userAddress: Address;
  /** Optionally provide the tokenId. Certain contracts such as CryptoPunks need to approve individual tokens */
  tokenId?: TokenId;
  /** Optionally provide a list of tokenIds. Certain contracts such as CryptoPunks need to approve individual tokens */
  tokenIds?: TokenId[];
  /** For ERC20 contracts, you can supply a specific amount to be approved. Defaults to the maximum amount */
  amount?: bigint;
  /** The token standard for tokenAddress */
  standard?: 'ERC721' | 'ERC1155' | 'ERC20';
}): Promise<boolean> => {
  const {
    provider,
    spenderAddress,
    tokenAddress,
    userAddress,
    amount,
    tokenId,
  } = args;
  let { tokenIds } = args;
  const { standard = tokenId || tokenIds ? 'ERC721' : 'ERC20' } = args;

  if (standard === 'ERC721') {
    if (isCryptoPunk(tokenAddress)) {
      if (tokenIds == null || tokenIds.length === 0) {
        if (tokenId) {
          tokenIds = [tokenId];
        } else {
          return true;
        }
      }

      return arePunksApproved({
        provider,
        spenderAddress,
        tokenAddress,
        userAddress,
        tokenIds,
      });
    }
    return isErc721Approved({
      provider,
      spenderAddress,
      tokenAddress,
      userAddress,
    });
  }
  if (standard === 'ERC1155') {
    return isErc1155Approved({
      provider,
      tokenAddress,
      spenderAddress,
      userAddress,
    });
  }
  if (standard === 'ERC20') {
    return isErc20Approved({
      amount,
      provider,
      spenderAddress,
      tokenAddress,
      userAddress,
    });
  }

  return false;
};

export default isApproved;
