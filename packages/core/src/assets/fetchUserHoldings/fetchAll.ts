import type { Address } from '@nftx/types';
import { getCursorType } from './cursor';
import fetchErc1155s from './fetchErc1155s';
import fetchErc721s from './fetchErc721s';
import fetchNonstandards from './fetchNonstandards';
import type { Holding } from './types';
import config from '@nftx/config';

type FetchErc1155s = typeof fetchErc1155s;
type FetchErc721s = typeof fetchErc721s;
type FetchNonStandards = typeof fetchNonstandards;

export const makeFetchAll =
  ({
    fetchErc1155s,
    fetchErc721s,
    fetchNonstandards,
  }: {
    fetchErc1155s: FetchErc1155s;
    fetchErc721s: FetchErc721s;
    fetchNonstandards: FetchNonStandards;
  }) =>
  async ({
    userAddress,
    cursor,
    network = config.network,
  }: {
    userAddress: Address;
    network?: number;
    cursor?: string;
  }): Promise<{ holdings: Holding[]; cursor?: string }> => {
    // Get the starting type
    let type = getCursorType(cursor);
    let holdings: Holding[] = [];

    if (type === '721') {
      const result = await fetchErc721s({
        network,
        userAddress,
        cursor,
      });
      holdings = [...holdings, ...result.holdings];
      const nextCursor = result.cursor;

      // If we have more than 1k results we need to stop processing and return the cursor
      if (nextCursor) {
        return { holdings, cursor: nextCursor };
      }

      // Move on to the next type
      type = '1155';
    }

    if (type === '1155') {
      const result = await fetchErc1155s({
        network,
        userAddress,
        cursor,
      });
      holdings = [...holdings, ...result.holdings];
      const nextCursor = result.cursor;

      // If we have more than 1k results we need to stop processing and return the cursor
      if (nextCursor) {
        return { holdings, cursor: nextCursor };
      }

      // Move on to the next type
      type = 'nonstandard';
    }

    if (type === 'nonstandard') {
      const result = await fetchNonstandards({
        network,
        userAddress,
        cursor,
      });
      holdings = [...holdings, ...result.holdings];
      const nextCursor = result.cursor;

      // If we have more than 1k results we need to stop processing and return the cursor
      if (nextCursor) {
        return { holdings, cursor: nextCursor };
      }
    }

    return { holdings };
  };

export default makeFetchAll({
  fetchErc1155s,
  fetchErc721s,
  fetchNonstandards,
});
