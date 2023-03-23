import type { Address, Vault } from '@nftx/types';
import { addressEqual } from '@nftx/utils';
import fetchErc20Contracts from './fetchErc20Contracts';

const fetchUsers = async ({
  vaults,
}: {
  vaults: Array<{
    vaultId: string;
    inventoryStakingPool?: { id: Vault['inventoryStakingPool']['id'] };
    lpStakingPool?: {
      dividendToken?: { id?: Vault['lpStakingPool']['dividendToken']['id'] };
    };
  }>;
}): Promise<Array<{ vaultId: string; users: string[] }>> => {
  const xTokenAddresses = vaults
    .map((vault) => vault.inventoryStakingPool?.id)
    .filter((x): x is Address => !!x);
  const xSlpAddresses = vaults
    .map((vault) => vault.lpStakingPool?.dividendToken?.id)
    .filter((x): x is Address => !!x);
  const contractAddresses = [
    ...new Set([...xTokenAddresses, ...xSlpAddresses]),
  ];

  const contracts = await fetchErc20Contracts({
    contractAddresses,
  });

  const groupedUsers: Record<string, { vaultId: string; users: string[] }> = {};

  contracts.forEach((contract) => {
    const vault = vaults.find((vault) => {
      return (
        addressEqual(vault.inventoryStakingPool?.id, contract.id) ||
        addressEqual(vault.lpStakingPool?.dividendToken?.id, contract.id)
      );
    });
    if (!vault) {
      return;
    }
    const { vaultId } = vault;

    let users = groupedUsers[vaultId]?.users;
    if (!users) {
      users = [];
      groupedUsers[vaultId] = { vaultId, users };
    }

    const holders = contract.balances
      .map((balance) => {
        return balance?.account?.id;
      })
      .filter((id) => {
        return id && !users.includes(id);
      });

    users.push(...holders);
  });

  const users = Object.values(groupedUsers);

  return users;
};

export default fetchUsers;
