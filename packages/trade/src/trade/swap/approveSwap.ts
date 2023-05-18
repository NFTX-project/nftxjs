import config from '@nftx/config';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_MARKETPLACE_ZAP,
  Zero,
} from '@nftx/constants';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { doesNetworkSupport0x } from '../../price';
import approve from '../approve';
import { getTotalTokenIds } from '../utils';

/**
 * Approves the NFTX Zap contract to swap your NFTs
 */
const approveSwap = ({
  network = config.network,
  assetAddress,
  vault,
  mintTokenIds,
  redeemTokenIds,
  quote,
  ...args
}: {
  network?: number;
  provider: Provider;
  signer: Signer;
  tokenId?: TokenId;
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
  standard?: 'ERC721' | 'ERC1155';
}) => {
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

  return approve({
    spenderAddress,
    tokenAddress: assetAddress,
    tokenIds: mintTokenIds,
    ...args,
  });
};

export default approveSwap;
