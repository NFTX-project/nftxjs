import type { Address, Vault as IVault } from '@nftx/types';
import { addressEqual } from '@nftx/utils';
import type fetchErc20Contracts from './fetchErc20Contracts';

type FetchErc20Contracts = ReturnType<typeof fetchErc20Contracts>;

type Vault = {
  vaultId: string;
  inventoryStakingPool?: { id: IVault['inventoryStakingPool']['id'] };
  lpStakingPool?: {
    dividendToken?: { id?: IVault['lpStakingPool']['dividendToken']['id'] };
  };
};

type UserGroups = Record<
  string,
  {
    vaultId: string;
    users: Address[];
  }
>;

// Get all contract addresses we want to fetch balances for
const getContractAddresses = (vaults: Vault[]) => {
  const xTokenAddresses = vaults
    .map((vault) => vault.inventoryStakingPool?.id)
    .filter((x): x is Address => !!x);
  const xSlpAddresses = vaults
    .map((vault) => vault.lpStakingPool?.dividendToken?.id)
    .filter((x): x is Address => !!x);

  return [...new Set([...xTokenAddresses, ...xSlpAddresses])];
};

const getVaultForContract = (vaults: Vault[], contract: { id: string }) => {
  return vaults.find((vault) => {
    return (
      addressEqual(vault.inventoryStakingPool?.id, contract.id) ||
      addressEqual(vault.lpStakingPool?.dividendToken?.id, contract.id)
    );
  });
};

// Get all of the user addresses for the given contract
// Filters out users that are already in the list
// (i.e. this is an LP contract but a user also has an IP position for this vault)
const getContractUsers = (
  contract: { balances: Array<{ account: { id: Address } }> },
  users: string[]
) => {
  return contract.balances
    .map((balance) => {
      return balance?.account?.id;
    })
    .filter((id) => {
      return id && !users.includes(id);
    });
};

// From a hash of vault:users get users for the given vaultId
// If we haven't had any users for this vaultId, it will create a new array
const getVaultUsers = (groupedUsers: UserGroups, vaultId: string) => {
  let users = groupedUsers[vaultId]?.users;
  if (!users) {
    users = [];
    groupedUsers[vaultId] = { vaultId, users };
  }
  return users;
};

const groupContractBalanceHoldersByVault = (
  contracts: Array<{
    id: string;
    balances: Array<{ account: { id: Address } }>;
  }>,
  vaults: Vault[]
) => {
  const groupedUsers: UserGroups = {};

  contracts.forEach((contract) => {
    // Find a vault associated with this contract
    const vaultId = getVaultForContract(vaults, contract)?.vaultId;
    if (!vaultId) {
      return;
    }
    const users = getVaultUsers(groupedUsers, vaultId);

    // Get each balance holder for this contract and add them to the contract group
    const holders = getContractUsers(contract, users);

    users.push(...holders);
  });

  return groupedUsers;
};

export default ({
  fetchErc20Contracts,
}: {
  fetchErc20Contracts: FetchErc20Contracts;
}) =>
  /** Fetches a list of all staked user addresses for a collection of vaults */
  async function fetchUsers({
    vaults,
  }: {
    vaults: Vault[];
  }): Promise<Array<{ vaultId: string; users: Address[] }>> {
    // Get a list of all addresses we want to get balances for
    // This will be all IP and LP addresses for the given vaults
    const contractAddresses = getContractAddresses(vaults);

    // Fetch all contracts and their balances
    const contracts = await fetchErc20Contracts({
      contractAddresses,
    });

    // We now want to group the contract balances by vault
    const groupedUsers = groupContractBalanceHoldersByVault(contracts, vaults);

    // Return a flat list of { vaultId, users }
    const users = Object.values(groupedUsers);

    return users;
  };
