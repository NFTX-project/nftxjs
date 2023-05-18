import config from '@nftx/config';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  Zero,
} from '@nftx/constants';
import type { Address, TokenId, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { doesNetworkSupport0x } from '../../price';
import isApproved from '../isApproved';
import { getExactTokenIds, getTotalTokenIds } from '../utils';

type Args = Omit<
  Parameters<typeof isApproved>[0],
  'spenderAddress' | 'tokenAddress' | 'amount' | 'tokenId' | 'tokenIds'
> & {
  assetAddress: Address;
  mintTokenIds: TokenId[] | [TokenId, number][];
  redeemTokenIds: TokenId[] | [TokenId, number][];
  quote: 'ETH' | 'VTOKEN';
  vault: {
    id: Vault['id'];
    fees: {
      targetSwapFee: Vault['fees']['targetSwapFee'];
      randomSwapFee: Vault['fees']['randomSwapFee'];
    };
  };
};

/**
 * For a given set of token ids for a given vault, has the user approved the contract for spending?
 */
const isSwapApproved = (_args: Args) => {
  const {
    network = config.network,
    assetAddress,
    vault,
    mintTokenIds,
    redeemTokenIds,
    quote,
    ...args
  } = _args;

  const totalCount = getTotalTokenIds(mintTokenIds);
  const targetCount = getTotalTokenIds(redeemTokenIds);
  const randomCount = totalCount - targetCount;
  const hasFee =
    (targetCount > 0 && vault.fees.targetSwapFee > Zero) ||
    (randomCount > 0 && vault.fees.randomSwapFee > Zero);
  const supports0x = doesNetworkSupport0x(network);

  // TODO: implement NFTX Router
  // The contract doing the swap can vary.
  // If there are no fees involved, we can do the swap directly on the vault contract (which is cheaper)
  // If we're using the 0x api we need the 0x Zap contract
  // Otherwise we need to approve the Marketplace Zap contract
  const spenderAddress = (() => {
    if (!hasFee || quote === 'VTOKEN') {
      return vault.id;
    }
    if (supports0x) {
      return getChainConstant(NFTX_MARKETPLACE_0X_ZAP, network);
    }
    return getChainConstant(NFTX_MARKETPLACE_ZAP, network);
  })();

  return isApproved({
    ...args,
    network,
    spenderAddress,
    tokenAddress: assetAddress,
    tokenIds: getExactTokenIds(mintTokenIds),
  });
};

export default isSwapApproved;
