import type { Address, Provider, Vault } from '@nftx/types';
import fetchMerkleLeaves from './fetchMerkleLeaves';
import { NFTXENSMerkleEligibility } from '@nftx/abi';
import getContract from '../web3/getContract';

type FetchMerkleLeaves = typeof fetchMerkleLeaves;

export const makeRequiresProcessing = ({
  fetchMerkleLeaves,
}: {
  fetchMerkleLeaves: FetchMerkleLeaves;
}) =>
  /**
   * Checks if a set of token ids require processing
   * For each token that returns true, you will need to call {@link processTokens}
   */
  async function requiresProcessing(args: {
    provider: Provider;
    tokenIds: string[];
    vault: {
      eligibilityModule: Pick<
        Vault['eligibilityModule'],
        'id' | 'merkleReference'
      >;
    };
    /** Merkle eligibility leaves. If this parameter is omitted, they will be fetched as part of this method */
    leaves?: string[];
  }) {
    const { tokenIds, provider, vault } = args;
    let { leaves } = args;
    if (!tokenIds.length) {
      return [];
    }
    if (!vault?.eligibilityModule?.merkleReference) {
      return tokenIds.map((tokenId) => ({
        tokenId,
        requiresProcessing: false,
      }));
    }

    if (!leaves) {
      leaves = await fetchMerkleLeaves({ provider, vault });
    }

    const contract = getContract({
      provider,
      abi: NFTXENSMerkleEligibility,
      address: vault.eligibilityModule.id,
    });

    const { default: keccak256 } = await import('keccak256');
    const { default: MerkleTree } = await import('merkletreejs');

    const tree = new MerkleTree(
      leaves.map((leaf) => keccak256(leaf)),
      keccak256,
      { sortPairs: true }
    );

    const proofs = tokenIds.map((tokenId) => {
      return tree.getHexProof(keccak256(tokenId));
    });

    if (proofs.flat().length === 0) {
      // Failed to generate the proofs so don't waste gas on processing 0 transactions
      return tokenIds.map((tokenId) => ({
        tokenId,
        requiresProcessing: false,
      }));
    }

    const result = await Promise.all(
      tokenIds.map(async (tokenId, i) => {
        const proof = proofs[i];
        const result: boolean = await contract.read.requiresProcessing({
          args: [BigInt(tokenId), proof as Address[]],
        });
        return {
          tokenId,
          requiresProcessing: result,
        };
      })
    );

    return result;
  };

const requiresProcessing = makeRequiresProcessing({ fetchMerkleLeaves });

export default requiresProcessing;
