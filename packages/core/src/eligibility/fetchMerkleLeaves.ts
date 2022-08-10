import type { Provider } from '@ethersproject/providers';
import abi from '@nftx/constants/abis/NFTXENSMerkleEligibility.json';
import config from '@nftx/config';
import type { Vault } from '../vaults';
import { getContract } from '../web3';
import { TRANSFORMERS } from './constants';

export default () =>
  async function fetchMerkleLeaves({
    network = config.network,
    provider,
    vault,
  }: {
    provider: Provider;
    network?: number;
    vault: {
      eligibilityModule?: Pick<
        Vault['eligibilityModule'],
        'id' | 'merkleReference'
      >;
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
      const contract = getContract({
        network,
        provider,
        abi,
        address: vault.eligibilityModule.id,
      });

      const uri: string = await contract.merkleLeavesURI();
      leaves = await (await fetch(uri)).json();
    } catch (e) {
      console.error(e);
    }

    const transformer: (leaf: string) => string = TRANSFORMERS[reference];
    if (transformer) {
      leaves = leaves.map(transformer);
    }

    return leaves;
  };
