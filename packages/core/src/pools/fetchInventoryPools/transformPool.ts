import type {
  InventoryPool,
  InventoryPosition,
  LiquidityPool,
  Vault,
  VaultFeeReceipt,
} from '@nftx/types';
import { Zero } from '@nftx/constants';
import calculateAprs from './calculateAprs';
import calculatePeriodFees from './calculatePeriodFees';

const calculatePoolValue = (
  positions: Pick<InventoryPosition, 'vaultId' | 'vToken' | 'vTokenValue'>[],
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
  liquidityPools,
}: {
  vault: Pick<Vault, 'id' | 'vaultId' | 'createdAt'>;
  positions: Pick<InventoryPosition, 'vaultId' | 'vToken' | 'vTokenValue'>[];
  receipts: Pick<VaultFeeReceipt, 'date' | 'amount'>[];
  timelock: number;
  liquidityPools: Pick<LiquidityPool, 'dailyVolume' | 'weeklyVolume'>[];
}): InventoryPool => {
  const [vToken, vTokenValue, xNFTCount] = calculatePoolValue(
    positions,
    vault.vaultId
  );
  const periodFees = calculatePeriodFees(receipts);

  let dailyVolume = Zero;
  let weeklyVolume = Zero;
  liquidityPools.forEach((pool) => {
    dailyVolume += pool.dailyVolume;
    weeklyVolume += pool.weeklyVolume;
  });

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
    dailyVolume,
    weeklyVolume,
  };
};

export default transformPool;
