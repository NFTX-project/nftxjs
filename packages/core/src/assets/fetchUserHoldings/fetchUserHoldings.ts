import type { Address } from '@nftx/types';
import type { Holding } from './types';
import config from '@nftx/config';
import fetchAll from './fetchAll';
import { addressEqual } from '@nftx/utils';

type FetchAll = typeof fetchAll;

export const makeFetchUserHoldings =
  ({ fetchAll }: { fetchAll: FetchAll }) =>
  async ({
    assetAddresses,
    userAddress,
    cursor,
    network = config.network,
  }: {
    assetAddresses?: Address[];
    userAddress: Address;
    network?: number;
    cursor?: string;
  }): Promise<{ holdings: Holding[]; cursor?: string }> => {
    const result = await fetchAll({
      userAddress,
      cursor,
      network,
    });

    const { cursor: nextCursor } = result;
    let { holdings } = result;

    if (assetAddresses) {
      holdings = holdings.filter((holding) => {
        return assetAddresses.some((address) =>
          addressEqual(address, holding.assetAddress)
        );
      });
    }

    return { cursor: nextCursor, holdings };
  };

export default makeFetchUserHoldings({ fetchAll });
