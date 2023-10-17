import type {
  InventoryPool,
  InventoryPosition,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';
import { Zero } from '@nftx/constants';
import calculateAprs from './calculateAprs';
import calculatePeriodFees from './calculatePeriodFees';

const calculatePoolValue = (
  positions: InventoryPosition[],
  vaultId: string
) => {
  type ValueTuple = [bigint, bigint, number];
  const intialValue: ValueTuple = [Zero, Zero, 0];

  return positions.reduce((acc, position) => {
    if (position.vaultId !== vaultId) {
      return acc;
    }
    const [vToken, vTokenValue, xNFTCount] = acc;

    const newValue: ValueTuple = [
      vToken + position.vToken,
      vTokenValue + position.vTokenValue,
      xNFTCount + 1,
    ];

    return newValue;
  }, intialValue);
};

const transformPool = ({
  vault,
  positions,
  receipts,
  timelock,
}: {
  vault: Pick<Vault, 'id' | 'vaultId' | 'createdAt'>;
  positions: InventoryPosition[];
  receipts: VaultFeeReceipt[];
  timelock: number;
}): InventoryPool => {
  const [vToken, vTokenValue, xNFTCount] = calculatePoolValue(
    positions,
    vault.vaultId
  );
  const periodFees = calculatePeriodFees(receipts);

  return {
    apr: calculateAprs({
      createdAt: vault.createdAt,
      periodFees,
      poolValue: vTokenValue,
    }),
    periodFees: periodFees,
    vaultAddress: vault.id,
    vaultId: vault.vaultId,
    vToken,
    vTokenValue,
    xNFTCount,
    timelock,
    totalPositions: positions.length,
  };
};

export default transformPool;
