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
  /** If you want to do a random redeem, enter the number of randoms you want to carry out */
  randomRedeems?: number;
}) => {
  const { provider, signer, targetIds, vaultAddress, randomRedeems } = args;

  const contract = getContract({
    provider,
    signer,
    abi: NFTXVaultUpgradeable,
    address: vaultAddress,
  });

  const specificIds: string[] = getExactTokenIds(targetIds);

  // the total amount to redeem, if you try to redeem more than the total specific ids
  // it will fill out the rest with randoms
  const amount = specificIds.length + (randomRedeems ?? 0);

  return contract.write.redeem({
    args: [BigInt(amount), specificIds.map(BigInt)],
  });
};

export default redeem;
