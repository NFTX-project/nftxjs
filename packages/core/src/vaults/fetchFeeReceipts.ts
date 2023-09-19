import config from '@nftx/config';
import { Zero } from '@nftx/constants';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { Address, NftxV3, VaultFeeReceipt } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';

const fetchFeeReceipts = async ({
  network,
  vaultAddresses,
}: {
  network: number;
  vaultAddresses: Address[];
}) => {
  const url = getChainConstant(config.subgraph.NFTX_SUBGRAPH, network);
  const q = createQuery<NftxV3.Query>();

  const feeReceipts: VaultFeeReceipt[] = [];
  let lastId: string | undefined;

  do {
    const query = q.feeReceipts
      .first(1000)
      .orderBy('id')
      .orderDirection('asc')
      .where((w) => [
        w.vault.in(vaultAddresses),
        w.transfers((transfer) => [transfer.amount.gt('0')]),
      ])
      .select((s) => [
        s.vault((vault) => [vault.vaultId, vault.id]),
        s.date,
        s.transfers((transfer) => [transfer.amount, transfer.to]),
      ]);

    const data = await querySubgraph({
      url,
      query,
    });

    const receipts = data.feeReceipts.map((x): VaultFeeReceipt => {
      const transfers = x.transfers.map(
        (y): VaultFeeReceipt['transfers'][0] => {
          return {
            amount: BigInt(y.amount),
            to: y.to,
          };
        }
      );
      const amount = transfers.reduce((total, t) => total + t.amount, Zero);

      return {
        vaultId: x.vault.vaultId,
        vaultAddress: x.vault.id,
        date: Number(x.date),
        transfers,
        amount,
      };
    });

    feeReceipts.push(...receipts);

    if (data.feeReceipts.length === 1000) {
      lastId = data.feeReceipts[data.feeReceipts.length - 1].id;
    }
  } while (lastId);

  return feeReceipts;
};

export default fetchFeeReceipts;
