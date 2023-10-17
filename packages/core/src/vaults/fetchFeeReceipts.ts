import config from '@nftx/config';
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
    const query = q.vaultFees
      .first(1000)
      .orderBy('id')
      .orderDirection('asc')
      .where((w) => [w.vault.in(vaultAddresses), w.amount.gt('0')])
      .select((s) => [
        s.vault((vault) => [vault.vaultId, vault.id]),
        s.timestamp,
        s.amount,
      ]);

    const data = await querySubgraph({
      url,
      query,
    });

    const receipts = data.vaultFees.map((x): VaultFeeReceipt => {
      const amount = BigInt(x.amount);
      const date = Number(x.timestamp);

      return {
        vaultId: x.vault.vaultId,
        vaultAddress: x.vault.id,
        date,
        amount,
      };
    });

    feeReceipts.push(...receipts);

    if (data.vaultFees.length === 1000) {
      lastId = data.vaultFees[data.vaultFees.length - 1].id;
    }
  } while (lastId);

  return feeReceipts;
};

export default fetchFeeReceipts;
