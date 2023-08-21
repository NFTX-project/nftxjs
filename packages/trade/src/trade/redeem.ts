import { NFTXVaultUpgradeable } from '@nftx/abi';
import { getContract } from '@nftx/utils';
import { getExactTokenIds } from './utils';
import type { Address, Provider, Signer, TokenId } from '@nftx/types';
import { Zero } from '@nftx/constants';

// TODO: I think this should be handled similar to buy/sell/swap where you fetch a quote from the api

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

  return contract.write.redeem({
    args: [specificIds.map(BigInt), userAddress, Zero, false],
    // TODO: should be (count * fee amount * vTokenToEth) + royalty amount + (premiums)
    value: Zero,
  });
};

export default redeem;
