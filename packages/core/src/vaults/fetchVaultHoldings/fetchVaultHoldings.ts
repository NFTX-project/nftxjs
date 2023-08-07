import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { NftxV3, Address, VaultHolding } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import transformVaultHolding from './transformVaultHolding';

/** Returns all holdings for a given vault */
const fetchVaultHoldings = async ({
  network = config.network,
  vaultAddresses,
  vaultIds,
}: {
  network?: number;
  vaultAddresses?: Address[];
  vaultIds?: string[];
}): Promise<VaultHolding[]> => {
  const g = createQuery<NftxV3.Query>();

  const rawHoldings: NftxV3.Holding[] = [];
  let lastId: string | undefined;

  do {
    const query = g.holdings
      .first(1000)
      .orderBy('id')
      .where((w) => [
        w.vault.in(vaultAddresses),
        w.id.gt(lastId),
        w.vault((w) => [w.vaultId.in(vaultIds)]),
      ])
      .select((s) => [
        s.amount,
        s.dateAdded,
        s.id,
        s.tokenId,
        s.vault((v) => [v.id, v.vaultId, v.asset((a) => [a.id])]),
      ]);

    const url = getChainConstant(config.subgraph.NFTX_SUBGRAPH, network);

    const data = await querySubgraph({
      url,
      query,
    });

    rawHoldings.push(...data.holdings);
    if (data.holdings.length === 1000) {
      lastId = data.holdings[data.holdings.length - 1].id;
    } else {
      lastId = undefined;
    }
  } while (lastId);

  const holdings = rawHoldings.map(transformVaultHolding);

  return holdings;
};

export default fetchVaultHoldings;
