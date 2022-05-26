import config from '@nftx/config';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { VaultHolding } from '@nftx/types';
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
  vaultAddress: string;
  lastId?: string;
}): Promise<VaultHolding[]> => {
  const query = gql<{
    vault: {
      holdings: Array<{ id: string; tokenId: string; dateAdded: string }>;
    };
  }>`{
    vault(id: $vaultAddress) {
      holdings(
        first: ${LIMIT},
        orderBy: tokenId,
        orderDirection: asc,
        where: {
          tokenId_gt: $lastId
        }
      ) {
        id
        tokenId
        dateAdded
        amount
      }
    }
  }`;

  const url = getChainConstant(config.subgraph.NFTX_SUBGRAPH, network);

  const data = await querySubgraph({
    url,
    query,
    variables: { vaultAddress, lastId },
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
