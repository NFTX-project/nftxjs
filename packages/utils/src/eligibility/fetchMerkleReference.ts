import abi from '@nftx/constants/abis/NFTXENSMerkleEligibility.json';
import type { Provider } from '@ethersproject/providers';
import type { Vault } from '@nftx/types';
import { getContract } from '../web3';
import config from '@nftx/config';
import isMerkleVault from './isMerkleVault';

export default () =>
  async function fetchMerkleReference({
    network = config.network,
    provider,
    vault,
  }: {
    network: number;
    provider: Provider;
    vault: {
      eligibilityModule: Pick<Vault['eligibilityModule'], 'id' | 'name'>;
    };
  }) {
    if (!isMerkleVault(vault)) {
      return null;
    }

    const contract = getContract({
      network,
      provider,
      abi,
      address: vault.eligibilityModule.id,
    });

    const reference: string = await contract.merkleReference();

    return reference;
  };
