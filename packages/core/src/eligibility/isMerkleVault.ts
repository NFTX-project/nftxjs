import type { Vault } from '../vaults';

const isMerkleVault = (vault: {
  eligibilityModule?: {
    name?: Vault['eligibilityModule']['name'];
  };
}) => {
  return vault?.eligibilityModule?.name
    ?.toLowerCase()
    .includes('merkleeligibility');
};

export default isMerkleVault;
