import { Zero } from '@nftx/constants';
import type { Address, VaultFeeReceipt } from '@nftx/types';

export const transformFeeReceipt = (
  receipt: { transfers: Array<{ amount: string; to: string }>; date: string },
  vaultAddress: Address,
  vaultId: string
): VaultFeeReceipt => {
  const date = Number(receipt.date);
  const transfers = receipt.transfers.map((transfer) => {
    const amount = BigInt(transfer.amount);
    const to = transfer.to;
    return { amount, to };
  });
  const amount = transfers.reduce((total, { amount }) => total + amount, Zero);

  return { vaultAddress, vaultId, date, transfers, amount };
};
