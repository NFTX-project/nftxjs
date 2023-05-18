import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP, NFTX_MARKETPLACE_ZAP } from '@nftx/constants';
import type { Address, Provider, Signer, TokenId } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import { doesNetworkSupport0x } from '../../price';
import approve from '../approve';

/**
 * Approves the NFTX Zap contract to sell your NFTs
 */
const approveSell = (_args: {
  network?: number;
  provider: Provider;
  signer: Signer;
  tokenId?: TokenId;
  assetAddress: Address;
  tokenIds?: TokenId[] | [TokenId, number][];
  standard?: 'ERC721' | 'ERC1155';
}) => {
  const { network = config.network, assetAddress, ...args } = _args;

  // TODO: implement NFTX Router
  const supports0x = doesNetworkSupport0x(network);
  const zap = supports0x ? NFTX_MARKETPLACE_0X_ZAP : NFTX_MARKETPLACE_ZAP;
  const spenderAddress = getChainConstant(zap, network);

  return approve({
    tokenAddress: assetAddress,
    spenderAddress,
    ...args,
  });
};

export default approveSell;
