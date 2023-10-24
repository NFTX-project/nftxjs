import type { Provider, Vault } from '@nftx/types';
import { getContract } from '../web3';
import isMerkleVault from './isMerkleVault';
import { NFTXENSMerkleEligibility } from '@nftx/abi';

type GetContract = typeof getContract;

export const makeFetchMerkleReference = ({
  getContract,
}: {
  getContract: GetContract;
}) =>
  async function fetchMerkleReference(args: {
    provider: Provider;
    vault: {
      eligibilityModule?: {
        id: Vault['eligibilityModule']['id'];
        name: Vault['eligibilityModule']['name'];
      };
    };
  }) {
    const { provider, vault } = args;
    if (!isMerkleVault(vault)) {
      return null;
    }
    if (!vault.eligibilityModule?.id) {
      return null;
    }

    const contract = getContract({
      abi: NFTXENSMerkleEligibility,
      address: vault.eligibilityModule?.id,
      provider,
    });

    const reference = await contract.read.merkleReference({});

    return reference;
  };

const fetchMerkleReference = makeFetchMerkleReference({ getContract });

export default fetchMerkleReference;
