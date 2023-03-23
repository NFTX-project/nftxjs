import type { Address, Asset } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import erc1155 from './erc1155';
import erc721 from './erc721';
import nonstandard from './nonstandard';

const fetchAssetsSubgraph = async ({
  cursor,
  assetAddresses,
  network,
  userAddress,
}: {
  cursor?: string;
  assetAddresses: Address[];
  network: number;
  userAddress: Address;
}): Promise<{ cursor?: string; assets: Asset[] }> => {
  let { next1155Id, next721Id, nextNonStandardId } = parseCursor(cursor);

  const allAssets: Asset[] = [];

  if (next721Id || !cursor) {
    const { assets, nextId } = await erc721({
      assetAddresses,
      network,
      userAddress,
      lastId: next721Id,
    });
    allAssets.push(...assets);
    next721Id = nextId;
  }
  if (next1155Id || !cursor) {
    const { assets, nextId } = await erc1155({
      assetAddresses,
      network,
      userAddress,
      lastId: next1155Id,
    });
    assets.push(...assets);
    next1155Id = nextId;
  }
  if (nextNonStandardId || !cursor) {
    const { assets, nextId } = await nonstandard({
      assetAddresses,
      network,
      userAddress,
      lastId: nextNonStandardId,
    });
    allAssets.push(...assets);
    nextNonStandardId = nextId;
  }

  const newCursor = createCursor(next721Id, next1155Id, nextNonStandardId);

  return { assets: allAssets, cursor: newCursor };
};

export default fetchAssetsSubgraph;
