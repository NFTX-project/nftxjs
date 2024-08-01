import config from '@nftx/config';
import { NFTX_MARKETPLACE_0X_ZAP, NFTX_MARKETPLACE_ZAP } from '@nftx/constants';
import { getChainConstant } from '@nftx/utils';
import type { Signer } from 'ethers';
import { doesNetworkSupport0x } from '../../price';
import approve from '../approve';

/**
 * Approves the NFTX Zap contract to sell your NFTs
 */
const approveSell = (_args: {
  network?: number;
  signer: Signer;
  tokenId?: string;
  assetAddress: string;
  tokenIds?: string[] | [string, number][];
  standard?: 'ERC721' | 'ERC1155';
}) => {
  const { network = config.network, assetAddress, ...args } = _args;

  const supports0x = doesNetworkSupport0x(network);
  const zap = supports0x ? NFTX_MARKETPLACE_0X_ZAP : NFTX_MARKETPLACE_ZAP;
  const spenderAddress = getChainConstant(zap, network);

  return approve({
    network,
    tokenAddress: assetAddress,
    spenderAddress,
    ...args,
  });
};

export default approveSell;