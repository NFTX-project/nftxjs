import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import type { VaultAddress, VaultFeeReceipt } from '../types';

export const transformFeeReceipt = (
  receipt: { transfers: Array<{ amount: string; to: string }>; date: string },
  vaultAddress: VaultAddress
): VaultFeeReceipt => {
  const date = Number(receipt.date);
  const transfers = receipt.transfers.map((transfer) => {
    const amount = BigNumber.from(transfer.amount);
    const to = transfer.to;
    return { amount, to };
  });
  const amount = transfers.reduce(
    (total, { amount }) => total.add(amount),
    Zero
  );

  return { vaultAddress, date, transfers, amount };
};
