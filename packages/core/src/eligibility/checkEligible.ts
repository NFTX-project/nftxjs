import NFtxEligibilityAbi from '@nftx/constants/abis/NFTXEligibility.json';
import type { Provider } from '@ethersproject/providers';
import type { Vault } from '../vaults';
import { getContract } from '../web3';
import config from '@nftx/config';

export default () =>
  /** Checks if a series of token ids are eligible for minting
   * This is based on the vault's eligibility module
   * Also bear in mind that this does not deal with unprocessed merkle vaults
   * If you have a merkle vault, you'll need to call requiresProcessing on the assets to check their state
   * And processTokens to process them first
   * (Unprocessed assets will always just return false if passed in here first)
   */
  async function checkEligible({
    network = config.network,
    vault,
    provider,
    tokenIds,
  }: {
    network?: number;
    vault: Pick<Vault, 'eligibilityModule'>;
    provider: Provider;
    tokenIds: string[];
  }) {
    if (!vault.eligibilityModule?.id) {
      return tokenIds.map((tokenId) => ({ tokenId, eligible: true }));
    }
    const contract = getContract({
      network,
      provider,
      abi: NFtxEligibilityAbi,
      address: vault.eligibilityModule.id,
    });

    const results: boolean[] = await contract.checkEligible(tokenIds);

    return tokenIds.map((tokenId, i) => ({ tokenId, eligible: !!results[i] }));
  };
