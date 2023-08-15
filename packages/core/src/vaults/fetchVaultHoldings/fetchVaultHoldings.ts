import config from '@nftx/config';
import { createQuery, querySubgraph } from '@nftx/subgraph';
import type { NftxV3, Address, VaultHolding } from '@nftx/types';
import { getChainConstant } from '@nftx/utils';
import transformVaultHolding from './transformVaultHolding';

const LIMIT = 1000;

/** Returns all holdings for a given vault */
const fetchVaultHoldings = async ({
  network = config.network,
  vaultAddress,
  lastId = '0',
}: {
  network?: number;
  vaultAddress: Address;
  lastId?: string;
}): Promise<VaultHolding[]> => {
  const g = createQuery<NftxV3.Query>();
  const query = g.vault.id(vaultAddress).select(() => [
    g.holdings
      .first(LIMIT)
      .orderBy('tokenId')
      .where((w) => [w.tokenId.gt(lastId)])
      .select((h) => [h.id, h.tokenId, h.amount, h.dateAdded]),
  ]);

  const url = getChainConstant(config.subgraph.NFTX_SUBGRAPH, network);

  const data = await querySubgraph({
    url,
    query,
  });

  let holdings = (data?.vault?.holdings ?? []).map(transformVaultHolding);

  if (holdings.length === LIMIT) {
    const lastId = holdings[holdings.length - 1].tokenId;
    const moreHoldings = await fetchVaultHoldings({
      network,
      vaultAddress,
      lastId,
    });
    holdings = [...holdings, ...moreHoldings];
  }

  return holdings;
};

export default fetchVaultHoldings;
