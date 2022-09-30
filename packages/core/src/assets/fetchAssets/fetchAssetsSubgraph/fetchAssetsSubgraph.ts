import type { Provider } from '@ethersproject/providers';
import type { Asset, Vault } from '@nftx/types';
import { createCursor, parseCursor } from './cursor';
import erc1155 from './erc1155';
import erc721 from './erc721';
import nonstandard from './nonstandard';

const fetchAssetsSubgraph = async ({
  cursor,
  assetAddresses,
  network,
  userAddress,
  vaults,
  provider,
}: {
  cursor?: string;
  assetAddresses: string[];
  network: number;
  userAddress: string;
  vaults: Pick<Vault, 'vaultId' | 'asset' | 'eligibilityModule' | 'features'>[];
  provider: Provider;
}): Promise<{ cursor: string; assets: Asset[] }> => {
  let { next1155Id, next721Id, nextNonStandardId } = parseCursor(cursor);

  const allAssets: Asset[] = [];

  if (next721Id || !cursor) {
    const { assets, nextId } = await erc721({
      assetAddresses,
      network,
      userAddress,
      vaults,
      lastId: next721Id,
      provider,
    });
    allAssets.push(...assets);
    next721Id = nextId;
  }
  if (next1155Id || !cursor) {
    const { assets, nextId } = await erc1155({
      assetAddresses,
      network,
      userAddress,
      vaults,
      lastId: next1155Id,
      provider,
    });
    assets.push(...assets);
    next1155Id = nextId;
  }
  if (nextNonStandardId || !cursor) {
    const { assets, nextId } = await nonstandard({
      assetAddresses,
      network,
      userAddress,
      vaults,
      lastId: nextNonStandardId,
      provider,
    });
    allAssets.push(...assets);
    nextNonStandardId = nextId;
  }

  const newCursor = createCursor(next721Id, next1155Id, nextNonStandardId);

  return { assets: allAssets, cursor: newCursor };
};

export default fetchAssetsSubgraph;
