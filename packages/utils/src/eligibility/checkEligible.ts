import { NFTXEligibility } from '@nftx/abi';
import type { Provider, TokenId, Vault } from '@nftx/types';
import type { getContract } from '../web3';

type GetContract = typeof getContract;

export default ({ getContract }: { getContract: GetContract }) =>
  /** Checks if a series of token ids are eligible for minting
   * This is based on the vault's eligibility module
   * Also bear in mind that this does not deal with unprocessed merkle vaults
   * If you have a merkle vault, you'll need to call requiresProcessing on the assets to check their state
   * And processTokens to process them first
   * (Unprocessed assets will always just return false if passed in here first)
   */
  async function checkEligible(args: {
    vault: Pick<Vault, 'eligibilityModule'>;
    provider: Provider;
    tokenIds: TokenId[];
  }) {
    const { vault, provider, tokenIds } = args;
    if (!vault.eligibilityModule?.id) {
      return tokenIds.map((tokenId) => ({ tokenId, eligible: true }));
    }

    const results = await getContract({
      abi: NFTXEligibility,
      address: vault.eligibilityModule.id,
      provider,
    }).read.checkEligible({ args: [tokenIds.map(BigInt)] });

    return tokenIds.map((tokenId, i) => ({ tokenId, eligible: !!results[i] }));
  };
