import type { Address } from '@nftx/types';

export type InventoryPositionsResponse = {
  inventoryPositions: {
    id: Address;
    positionId: Address;
    vault: {
      id: Address;
      vaultId: string;
    };
    nftIds: `${number}`[];
    amount: `${number}`;
    user: { id: Address };
    merged: boolean;
    closed: boolean;
    isParent: boolean;
    parent?: { id: Address };
    children?: { id: Address }[];
  }[];
};
