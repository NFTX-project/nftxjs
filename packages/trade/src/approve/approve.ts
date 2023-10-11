import { ERC20, ERC721, CryptoPunks, Permit2 } from '@nftx/abi';
import {
  getChainConstant,
  getContract,
  getUniqueTokenIds,
  isCryptoPunk,
} from '@nftx/utils';
import type { Address, Provider, Signer, TokenId } from '@nftx/types';
import { MaxUint256, PERMIT2, Zero } from '@nftx/constants';
import { ValidationError } from '@nftx/errors';
import config from '@nftx/config';

function approvePunk({
  tokenId,
  tokenIds,
  tokenAddress,
  provider,
  signer,
  spenderAddress,
}: {
  tokenId?: TokenId;
  tokenIds?: TokenId[];
  tokenAddress: Address;
  provider: Provider;
  signer: Signer;
  spenderAddress: Address;
}) {
  if (!tokenId) {
    tokenId = tokenIds?.[0];
  }
  if (!tokenId) {
    throw new ValidationError({
      tokenId: 'To approve a PUNK you must provide the token ID',
    });
  }
  const contract = getContract({
    address: tokenAddress,
    provider,
    signer,
    abi: CryptoPunks,
  });
  return contract.write.offerPunkForSaleToAddress({
    args: [BigInt(tokenId), Zero, spenderAddress],
  });
}

function approveErc721({
  tokenAddress,
  provider,
  signer,
  spenderAddress,
}: {
  tokenAddress: Address;
  provider: Provider;
  signer: Signer;
  spenderAddress: Address;
}) {
  const contract = getContract({
    address: tokenAddress,
    provider,
    signer,
    abi: ERC721,
  });
  return contract.write.setApprovalForAll({ args: [spenderAddress, true] });
}

const approveErc1155 = approveErc721;

function approveErc20({
  tokenAddress,
  provider,
  signer,
  spenderAddress,
  amount,
}: {
  tokenAddress: Address;
  provider: Provider;
  signer: Signer;
  spenderAddress: Address;
  amount?: bigint;
}) {
  const contract = getContract({
    address: tokenAddress,
    provider,
    signer,
    abi: ERC20,
  });
  return contract.write.approve({
    args: [spenderAddress, amount ?? MaxUint256],
  });
}

function approvePermit2({
  amount,
  network,
  provider,
  signer,
  spenderAddress,
  tokenAddress,
}: {
  network: number;
  provider: Provider;
  signer: Signer;
  tokenAddress: Address;
  spenderAddress: Address;
  amount: bigint;
}) {
  const expiration = Math.floor(Date.now() / 1000) + 60 * 30;

  const contract = getContract({
    abi: Permit2,
    address: getChainConstant(PERMIT2, network),
    provider,
    signer,
  });

  return contract.write.approve({
    args: [tokenAddress, spenderAddress, amount, expiration],
  });
}

/**
 * Approves a spender to spend a specific token address.
 * If you want to approve a standard sell or swap, use the relevant methods instead (approveSell/approveSwap)
 */
async function approve(args: {
  type?: 'on-chain' | 'permit2';
  network?: number;
  /** The token we want to spend */
  tokenAddress: Address;
  /** The smart contract address that will be spending the token */
  spenderAddress: Address;
  provider: Provider;
  signer: Signer;
  tokenId?: TokenId;
  /** For ERC721/ERC1155, provide the token id or tokenIds */
  tokenIds?: TokenId[] | [TokenId, number][];
  /** For ERC20, provide the amount the spender can spend - if omitted it defaults to the max amount */
  amount?: bigint;
  /** If the standard is omitted, we will infer either ERC721 or ERC20 based on amount/tokenId/tokenIds parameters */
  standard?: 'ERC721' | 'ERC1155' | 'ERC20';
}) {
  const {
    type = 'on-chain',
    network = config.network,
    tokenAddress,
    spenderAddress,
    tokenId,
    tokenIds,
    provider,
    signer,
    amount,
    standard = tokenId || tokenIds ? 'ERC721' : amount ? 'ERC20' : null,
  } = args;

  if (type === 'permit2') {
    return approvePermit2({
      amount: amount ?? Zero,
      network,
      provider,
      signer,
      spenderAddress,
      tokenAddress,
    });
  }

  if (standard === 'ERC721') {
    if (isCryptoPunk(tokenAddress)) {
      return approvePunk({
        tokenId,
        tokenIds: getUniqueTokenIds(tokenIds ?? []),
        tokenAddress,
        provider,
        signer,
        spenderAddress,
      });
    }
    return approveErc721({ tokenAddress, provider, signer, spenderAddress });
  }
  if (standard === 'ERC1155') {
    return approveErc1155({ provider, signer, spenderAddress, tokenAddress });
  }
  if (standard === 'ERC20') {
    return approveErc20({
      tokenAddress,
      provider,
      signer,
      spenderAddress,
      amount,
    });
  }

  throw new ValidationError({
    standard: `Approve is not supported for ${standard}`,
  });
}

export default approve;
