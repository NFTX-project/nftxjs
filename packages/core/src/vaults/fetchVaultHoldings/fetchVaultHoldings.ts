import { NFTX_SUBGRAPH } from '@nftx/constants';
import { gql, querySubgraph } from '@nftx/subgraph';
import { getChainConstant } from '../../web3';
import type { VaultAddress, VaultHolding } from '../types';
import transformVaultHolding from './transformVaultHolding';

const LIMIT = 1000;

/** Returns all holdings for a given vault */
const fetchVaultHoldings = async ({
  network,
  vaultAddress,
  lastId = '0',
}: {
  network: number;
  vaultAddress: VaultAddress;
  lastId?: string;
}): Promise<VaultHolding[]> => {
  const query = gql`{
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

  const url = getChainConstant(NFTX_SUBGRAPH, network);

  const data = await querySubgraph<{
    vault: {
      holdings: Array<{ id: string; tokenId: string; dateAdded: string }>;
    };
  }>({
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