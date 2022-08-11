import abi from '@nftx/constants/abis/NFTXENSMerkleEligibility.json';
import type { Provider } from '@ethersproject/providers';
import config from '@nftx/config';
import type { Vault } from '../vaults';
import { getContract } from '../web3';
import type fetchMerkleLeaves from './fetchMerkleLeaves';
import type { Signer } from 'ethers';

type FetchMerkleLeaves = ReturnType<typeof fetchMerkleLeaves>;

export default ({
  fetchMerkleLeaves,
}: {
  fetchMerkleLeaves: FetchMerkleLeaves;
}) =>
  async function processTokens({
    network = config.network,
    provider,
    signer,
    vault,
    tokenIds,
    leaves,
  }: {
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
    leaves?: string[];
  }) {
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
