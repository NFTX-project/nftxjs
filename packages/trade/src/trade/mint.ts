import { NFTXVaultUpgradeable } from '@nftx/abi';
import type { Address, Provider, Signer, TokenId } from '@nftx/types';
import { getContract } from '@nftx/utils';
import { getTokenIdAmounts, getUniqueTokenIds } from './utils';

/** Mints an NFT into the NFTX vault in exchange for a vToken.
 * For example, minting a punk NFT would return 0.95 PUNK (accounting for vault fees)
 */
const mint = async (args: {
  provider: Provider;
  signer: Signer;
  userAddress: Address;
  vaultAddress: Address;
  vaultId: string;
  /** Ids of the individual NFTs you want to mint
   * For 721s you just pass a flat array of ids ['1','2','3']
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] i.e. [['1', 2], ['2', 1], ['3', 2]]
   */
  tokenIds: TokenId[] | [TokenId, number][];
}) => {
  const { provider, signer, tokenIds, vaultAddress, userAddress } = args;

  const ids = getUniqueTokenIds(tokenIds);
  const amounts = getTokenIdAmounts(tokenIds);

  const contract = getContract({
    provider,
    signer,
    abi: NFTXVaultUpgradeable,
    address: vaultAddress,
  });

  // Not sure if vaultAddress is correct
  return contract.write.mint({
    args: [ids.map(BigInt), amounts.map(BigInt), userAddress, vaultAddress],
  });
};

export default mint;
