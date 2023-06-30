import type { InventoryPool, InventoryPosition, Vault } from '@nftx/types';
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
}: {
  vault: Pick<Vault, 'id' | 'vaultId'>;
  positions: InventoryPosition[];
}): InventoryPool => {
  const [vToken, vTokenValue, xNFTCount] = calculatePoolValue(
    positions,
    vault.vaultId
  );

  return {
    apr: calculateAprs(),
    periodFees: calculatePeriodFees(),
    vaultAddress: vault.id,
    vaultId: vault.vaultId,
    vToken,
    vTokenValue,
    xNFTCount,
  };
};

export default transformPool;
