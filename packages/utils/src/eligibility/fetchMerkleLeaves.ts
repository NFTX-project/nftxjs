import { NFTXENSMerkleEligibility } from '@nftx/abi';
import type { Provider, Vault } from '@nftx/types';
import type { getContract } from '../web3';

type GetContract = typeof getContract;
type Fetch = typeof fetch;

export default ({
  getContract,
  fetch,
}: {
  getContract: GetContract;
  fetch: Fetch;
}) =>
  /**
   * Fetches a list of eligible token ids for a vault with merkle eligibility rules
   */
  async function fetchMerkleLeaves({
    provider,
    vault,
  }: {
    provider: Provider;
    vault: {
      eligibilityModule?: {
        id: Vault['eligibilityModule']['id'];
        merkleReference: Vault['eligibilityModule']['merkleReference'];
      };
    };
  }) {
    if (!vault?.eligibilityModule?.id) {
      return [];
    }
    const reference = vault.eligibilityModule.merkleReference;
    if (!reference) {
      return [];
    }

    let leaves: string[] = [];

    try {
      const uri = await getContract({
        abi: NFTXENSMerkleEligibility,
        address: vault.eligibilityModule.id,
        provider,
      }).read.merkleLeavesURI({});

      leaves = await (await fetch(uri)).json();
    } catch (e) {
      console.error(e);
    }

    return leaves;
  };
