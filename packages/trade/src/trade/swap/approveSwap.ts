import config from '@nftx/config';
import { MARKETPLACE_ZAP, Zero } from '@nftx/constants';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
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
      swapFee: Vault['fees']['swapFee'];
    };
  };
  standard?: 'ERC721' | 'ERC1155';
}) => {
  const targetCount = getTotalTokenIds(redeemTokenIds);
  const hasFee = targetCount > 0 && vault.fees.swapFee > Zero;

  // TODO: implement NFTX Router
  // The contract doing the swap can vary.
  // If there are no fees involved, we can do the swap directly on the vault contract (which is cheaper)
  // If we're using the 0x api we need the 0x Zap contract
  // Otherwise we need to approve the Marketplace Zap contract
  const spenderAddress = (() => {
    if (!hasFee || quote === 'VTOKEN') {
      return vault.id;
    }
    return getChainConstant(MARKETPLACE_ZAP, network);
  })();

  return approve({
    spenderAddress,
    tokenAddress: assetAddress,
    tokenIds: mintTokenIds,
    ...args,
  });
};

export default approveSwap;
