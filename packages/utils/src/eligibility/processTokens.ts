import { NFTXENSMerkleEligibility } from '@nftx/abi';
import fetchMerkleLeaves from './fetchMerkleLeaves';
import type { Address, Provider, Signer, TokenId, Vault } from '@nftx/types';
import getContract from '../web3/getContract';

type FetchMerkleLeaves = typeof fetchMerkleLeaves;

export const makeProcessTokens = ({
  fetchMerkleLeaves,
}: {
  fetchMerkleLeaves: FetchMerkleLeaves;
}) =>
  /**
   * Checks specific token ids against a merkle eligibility module.
   * Once called, you must call the {@link checkEligible} method to get the eligibility state.
   * Do not call this method on a vault that doesn't implement a merkle module
   */
  async function processTokens(args: {
    provider: Provider;
    signer: Signer;
    vault: {
      eligibilityModule: Pick<
        Vault['eligibilityModule'],
        'id' | 'merkleReference'
      >;
    };
    tokenIds: TokenId[];
    /** Merkle eligibility leaves. If this parameter is omitted, they will be fetched as part of this method */
    leaves?: string[];
  }) {
    const { provider, signer, vault, tokenIds } = args;
    let { leaves } = args;
    if (!vault?.eligibilityModule?.merkleReference) {
      throw new Error('Not a valid eligibility module');
    }

    if (!leaves) {
      leaves = await fetchMerkleLeaves({ provider, vault });
    }

    const { default: keccak256 } = await import('keccak256');
    const { default: MerkleTree } = await import('merkletreejs');

    const tree = new MerkleTree(
      leaves.map((leaf) => keccak256(leaf)),
      keccak256,
      { sortPairs: true }
    );

    const proofs = tokenIds.map((tokenId) => {
      return tree.getHexProof(keccak256(tokenId));
    }) as readonly Address[][];

    const contract = getContract({
      abi: NFTXENSMerkleEligibility,
      address: vault.eligibilityModule.id,
      provider,
      signer,
    });
    return contract.write.processTokens({
      args: [tokenIds.map(BigInt), proofs],
    });
  };

export default makeProcessTokens({ fetchMerkleLeaves });
