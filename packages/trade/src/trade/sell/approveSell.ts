import config from '@nftx/config';
import type { Address, Provider, Signer, TokenId } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import approve from '../approve';
import { MARKETPLACE_ZAP } from '@nftx/constants';

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
  const zap = MARKETPLACE_ZAP;
  const spenderAddress = getChainConstant(zap, network);

  return approve({
    tokenAddress: assetAddress,
    spenderAddress,
    ...args,
  });
};

export default approveSell;
