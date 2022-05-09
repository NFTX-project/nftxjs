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
  vaultAddresses?: VaultAddress[];
} = {}): Promise<VaultApr[]> => {
  const response = await fetch(NFTX_APR_URL);
  let data: Response;
  try {
    data = await response.json();
  } catch {
    data = [];
  }

  const aprs = data?.map(
    ({ inventoryApr, liquidityApr, vault_id }): VaultApr => {
      return {
        vaultAddress: vault_id,
        inventoryApr: Number(Object.values(inventoryApr ?? {})[0] ?? '0'),
        liquidityApr: Number(Object.values(liquidityApr ?? {})[0] ?? '0'),
      };
    }
  );

  if (vaultAddresses) {
    return vaultAddresses.map((vaultAddress) => {
      const apr = aprs.find((apr) =>
        addressEqual(apr.vaultAddress, vaultAddress)
      );
      return (
        apr ?? {
          vaultAddress,
          inventoryApr: 0,
          liquidityApr: 0,
        }
      );
    });
  }

  return aprs;
};

export default fetchVaultAprs;
