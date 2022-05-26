import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP, NFTX_MARKETPLACE_ZAP } from '@nftx/constants';
import type { Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { doesNetworkSupport0x } from '../../price';
import isApproved from '../isApproved';
import { getExactTokenIds, getTotalTokenIds } from '../utils';

type Args = Omit<
  Parameters<typeof isApproved>[0],
  'spenderAddress' | 'tokenAddress' | 'amount' | 'tokenId' | 'tokenIds'
> & {
  assetAddress: string;
  mintTokenIds: string[] | [string, number][];
  redeemTokenIds: string[] | [string, number][];
  quote: 'ETH' | 'VTOKEN';
  vault: {
    id: string;
    fees: {
      targetSwapFee: Vault['fees']['targetSwapFee'];
      randomSwapFee: Vault['fees']['randomSwapFee'];
    };
  };
};

const isSwapApproved = ({
  network = config.network,
  assetAddress,
  vault,
  mintTokenIds,
  redeemTokenIds,
  quote,
  ...args
}: Args) => {
  const totalCount = getTotalTokenIds(mintTokenIds);
  const targetCount = getTotalTokenIds(redeemTokenIds);
  const randomCount = totalCount - targetCount;
  const hasFee =
    (targetCount > 0 && vault.fees.targetSwapFee.gt(0)) ||
    (randomCount > 0 && vault.fees.randomSwapFee.gt(0));
  const supports0x = doesNetworkSupport0x(network);

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
