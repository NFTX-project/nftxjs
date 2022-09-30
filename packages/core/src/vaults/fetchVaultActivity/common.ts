import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import type { VaultFeeReceipt } from '@nftx/types';

export const transformFeeReceipt = (
  receipt: { transfers: Array<{ amount: string; to: string }>; date: string },
  vaultAddress: string,
  vaultId: string
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

  return { vaultAddress, vaultId, date, transfers, amount };
};
