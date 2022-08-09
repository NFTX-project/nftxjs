import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import abi from '@nftx/constants/abis/NFTXENSMerkleEligibility.json';
import type { Vault } from '../vaults';
import { getContract } from '../web3';
import type fetchMerkleLeaves from './fetchMerkleLeaves';

type FetchMerkleLeaves = ReturnType<typeof fetchMerkleLeaves>;

export default ({
  fetchMerkleLeaves,
}: {
  fetchMerkleLeaves: FetchMerkleLeaves;
}) =>
  async function requiresProcessing({
    tokenIds,
    network = config.network,
    provider,
    vault,
    leaves,
  }: {
    network?: number;
    provider: Provider;
    tokenIds: string[];
    vault: {
      eligibilityModule: Pick<
        Vault['eligibilityModule'],
        'id' | 'merkleReference'
      >;
    };
    leaves?: string[];
  }) {
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
      leaves = await fetchMerkleLeaves({ provider, vault, network });
    }

    const contract = getContract({
      network,
      provider,
      abi,
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
        const result: boolean = await contract.requiresProcessing(
          tokenId,
          proof
        );
        return {
          tokenId,
          requiresProcessing: result,
        };
      })
    );

    return result;
  };
