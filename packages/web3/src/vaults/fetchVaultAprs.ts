import { NFTX_APR_URL } from '@nftx/constants';
import { addressEqual } from '../web3';
import type { VaultAddress, VaultApr } from './types';

type Response = Array<{
  vault_id: string;
  inventoryApr: Record<string, string>;
  liquidityApr: Record<string, string>;
}>;

const fetchVaultAprs = async ({
  vaultAddresses,
}: {
  vaultAddresses: VaultAddress[];
}): Promise<VaultApr[]> => {
  const response = await fetch(NFTX_APR_URL);
  let data: Response;
  try {
    data = await response.json();
  } catch {
    data = [];
  }

  return vaultAddresses.map((vaultAddress): VaultApr => {
    const x = data.find(({ vault_id }) => addressEqual(vault_id, vaultAddress));

    return {
      vaultAddress,
      liquidityApr: Number(Object.values(x?.liquidityApr ?? {})[0] ?? '0'),
      inventoryApr: Number(Object.values(x?.inventoryApr ?? {})[0] ?? '0'),
    };
  });
};

export default fetchVaultAprs;
