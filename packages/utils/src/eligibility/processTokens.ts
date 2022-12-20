import abi from '@nftx/constants/abis/NFTXENSMerkleEligibility.json';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import { getContract } from '../web3';
import type fetchMerkleLeaves from './fetchMerkleLeaves';
import type { Signer } from 'ethers';
import type { Vault } from '@nftx/types';

type FetchMerkleLeaves = ReturnType<typeof fetchMerkleLeaves>;

export default ({
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
    network?: number;
    provider: Provider;
    signer: Signer;
    vault: {
      eligibilityModule: Pick<
        Vault['eligibilityModule'],
        'id' | 'merkleReference'
      >;
    };
    tokenIds: string[];
    /** Merkle eligibility leaves. If this parameter is omitted, they will be fetched as part of this method */
    leaves?: string[];
  }) {
    const {
      network = config.network,
      provider,
      signer,
      vault,
      tokenIds,
    } = args;
    let { leaves } = args;
    if (!vault?.eligibilityModule?.merkleReference) {
      throw new Error('Not a valid eligibility module');
    }

    if (!leaves) {
      leaves = await fetchMerkleLeaves({ provider, vault, network });
    }

    const contract = getContract({
      network,
      signer,
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

    return contract.processTokens(tokenIds, proofs);
  };
