import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import abi from '@nftx/constants/abis/NFTXVaultUpgradeable.json';
import type { Signer } from 'ethers';
import type { VaultAddress, VaultId } from '../vaults/types';
import { getContract } from '../web3';
import type { Address } from '../web3/types';
import { getTokenIdAmounts, getUniqueTokenIds } from './utils';

/** Mints an NFT into the NFTX vault in exchange for an ERC20 token
 * For example, minting a punk NFT would return 0.95 PUNK
 */
const mint = async ({
  network = config.network,
  signer,
  tokenIds,
  vaultAddress,
}: {
  network?: number;
  signer: Signer;
  userAddress: Address;
  vaultAddress: VaultAddress;
  vaultId: VaultId;
  /** Ids of the individual NFTs you want to mint
   * For 721s you just pass a flat array of ids ['1','2','3']
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] i.e. [['1', 2], ['2', 1], ['3', 2]]
   */
  tokenIds: string[] | [string, number][];
}): Promise<ContractTransaction> => {
  const ids = getUniqueTokenIds(tokenIds);
  const amounts = getTokenIdAmounts(tokenIds);

  const contract = getContract({
    network,
    signer,
    abi,
    address: vaultAddress,
  });

  return contract.mint(ids, amounts);
};

export default mint;
