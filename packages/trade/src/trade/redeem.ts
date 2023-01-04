import type { BigNumber } from '@ethersproject/bignumber';
import type { ContractTransaction } from '@ethersproject/contracts';
import config from '@nftx/config';
import abi from '@nftx/constants/abis/NFTXVaultUpgradeable.json';
import { getContract } from '@nftx/utils';
import type { Signer } from 'ethers';
import { getExactTokenIds } from './utils';

/** Redeems an item from the vault
 * Exchanges, for example, 1.05 PUNK for a punk nft (accounting for vault fees)
 */
const redeem = async (args: {
  network?: number;
  signer: Signer;
  userAddress: string;
  vaultId: string;
  vaultAddress: string;
  /** Ids of the individual NFTs you want to redeem
   * For 721s you just pass a flat array of ids ['1','2','3']
   * For 1155s if you're dealing with multiples, you pass a tuple of [tokenId, quantity] [['1', 2], ['2', 1], ['3', 2]]
   */
  targetIds: Array<string> | Array<[string, number]>;
  /** If you want to do a random redeem, enter the number of randoms you want to carry out */
  randomRedeems?: number;
}): Promise<ContractTransaction> => {
  const {
    network = config.network,
    signer,
    targetIds,
    vaultAddress,
    randomRedeems,
  } = args;

  const contract = getContract({
    network,
    signer,
    abi,
    address: vaultAddress,
  });

  const specificIds: string[] = getExactTokenIds(targetIds);

  // the total amount to redeem, if you try to redeem more than the total specific ids
  // it will fill out the rest with randoms
  const amount = specificIds.length + (randomRedeems ?? 0);

  // Add gas buffer to redeems to account for calculation weirdness
  let gas: BigNumber;
  try {
    gas = await contract.estimateGas.redeem(amount, specificIds);
    gas = gas.add(300000);
  } catch (e) {
    console.error(e);
  }

  return contract.redeem(
    amount,
    specificIds,
    amount > 1 && gas ? { gasLimit: gas } : null
  );
};

export default redeem;
