import config from '@nftx/config';
import type { Address } from '@nftx/types';
import { addressEqual, getChainConstant } from '@nftx/utils';

type Response = Array<{
  vault_id: Address;
  inventoryApr: number;
  liquidityApr: number;
}>;

type VaultApr = {
  vaultAddress: Address;
  inventoryApr: number;
  liquidityApr: number;
};

const fetchVaultAprs = async ({
  network = config.network,
  vaultAddresses,
}: {
  network?: number;
  vaultAddresses?: Address[];
} = {}): Promise<VaultApr[]> => {
  const response = await fetch(
    getChainConstant(config.urls.NFTX_APR_URL, network)
  );
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
        inventoryApr: Number(inventoryApr ?? 0),
        liquidityApr: Number(liquidityApr ?? 0),
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
