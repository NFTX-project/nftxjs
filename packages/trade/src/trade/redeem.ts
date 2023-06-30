import { NFTXVaultUpgradeable } from '@nftx/abi';
import { getContract } from '@nftx/utils';
import { getExactTokenIds } from './utils';
import type { Address, Provider, Signer, TokenId } from '@nftx/types';

/** Redeems an item from the vault
 * Exchanges, for example, 1.05 PUNK for a punk nft (accounting for vault fees)
 */
const redeem = async (args: {
  provider: Provider;
  signer: Signer;
  userAddress: Address;
  vaultId: string;
  vaultAddress: Address;
  /** Ids of the individual NFTs you want to redeem
   * For 721s you just pass a flat array of ids ['1','2','3']
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1], ['3', 2]]
   */
  targetIds: Array<TokenId> | Array<[TokenId, number]>;
}) => {
  const { provider, signer, targetIds, vaultAddress, userAddress } = args;

  const contract = getContract({
    provider,
    signer,
    abi: NFTXVaultUpgradeable,
    address: vaultAddress,
  });

  const specificIds: string[] = getExactTokenIds(targetIds);

  // the total amount to redeem, if you try to redeem more than the total specific ids
  // it will fill out the rest with randoms
  const amount = specificIds.length;

  // TODO: the last param, forceFees, what does it need to be?
  return contract.write.redeem({
    args: [specificIds.map(BigInt), userAddress, BigInt(amount), false],
  });
};

export default redeem;
