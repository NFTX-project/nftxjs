import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import erc721Abi from '@nftx/constants/abis/ERC721.json';
import punkAbi from '@nftx/constants/abis/CryptoPunks.json';
import erc20Abi from '@nftx/constants/abis/ERC20.json';
import { MaxUint256 } from '@ethersproject/constants';
import type { Signer } from 'ethers';
import config from '@nftx/config';
import { getUniqueTokenIds } from './utils';
import { getContract, isCryptoPunk } from '@nftx/utils';

function approvePunk({
  tokenId,
  tokenIds,
  network,
  tokenAddress,
  signer,
  spenderAddress,
}: {
  tokenId: string;
  tokenIds: string[];
  network: number;
  tokenAddress: string;
  signer: Signer;
  spenderAddress: string;
}) {
  if (!tokenId && !tokenIds?.[0]) {
    throw new Error('To approve a punk you must provide the tokenID');
  }
  const contract = getContract({
    network,
    address: tokenAddress,
    signer,
    abi: punkAbi,
  });
  return contract.offerPunkForSaleToAddress(
    tokenIds?.[0] ?? tokenId,
    0,
    spenderAddress
  );
}

function approveErc721({
  network,
  tokenAddress,
  signer,
  spenderAddress,
}: {
  network: number;
  tokenAddress: string;
  signer: Signer;
  spenderAddress: string;
}) {
  const contract = getContract({
    network,
    address: tokenAddress,
    signer,
    abi: erc721Abi,
  });
  return contract.setApprovalForAll(spenderAddress, true);
}

const approveErc1155 = approveErc721;

function approveErc20({
  network,
  tokenAddress,
  signer,
  spenderAddress,
  amount,
}: {
  network: number;
  tokenAddress: string;
  signer: Signer;
  spenderAddress: string;
  amount: BigNumber;
}) {
  const contract = getContract({
    network,
    address: tokenAddress,
    signer,
    abi: erc20Abi,
  });
  return contract.approve(spenderAddress, amount ?? MaxUint256);
}

/**
 * Approves a spender to spend a specific token address.
 * If you want to approve a standard sell or swap, use the relevant methods instead (approveSell/approveSwap)
 */
async function approve(args: {
  network?: number;
  /** The token we want to spend */
  tokenAddress: string;
  /** The smart contract address that will be spending the token */
  spenderAddress: string;
  signer: Signer;
  tokenId?: string;
  /** For ERC721/ERC1155, provide the token id or tokenIds */
  tokenIds?: string[] | [string, number][];
  /** For ERC20, provide the amount the spender can spend - if omitted it defaults to the max amount */
  amount?: BigNumber;
  /** If the standard is omitted, we will infer either ERC721 or ERC20 based on amount/tokenId/tokenIds parameters */
  standard?: 'ERC721' | 'ERC1155' | 'ERC20';
}): Promise<ContractTransaction> {
  const {
    network = config.network,
    tokenAddress,
    spenderAddress,
    tokenId,
    tokenIds,
    signer,
    amount,
    standard = tokenId || tokenIds ? 'ERC721' : amount ? 'ERC20' : null,
  } = args;

  if (standard === 'ERC721') {
    if (isCryptoPunk(tokenAddress)) {
      return approvePunk({
        tokenId,
        tokenIds: getUniqueTokenIds(tokenIds),
        network,
        tokenAddress,
        signer,
        spenderAddress,
      });
    }
    return approveErc721({ network, tokenAddress, signer, spenderAddress });
  }
  if (standard === 'ERC1155') {
    return approveErc1155({ network, signer, spenderAddress, tokenAddress });
  }
  if (standard === 'ERC20') {
    return approveErc20({
      network,
      tokenAddress,
      signer,
      spenderAddress,
      amount,
    });
  }

  throw new Error(`approve not supported for ${standard}`);
}

export default approve;
