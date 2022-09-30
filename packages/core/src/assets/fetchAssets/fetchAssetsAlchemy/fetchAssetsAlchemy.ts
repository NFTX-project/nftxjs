import type { Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import type { Asset, Vault } from '@nftx/types';
import { processAssetItems } from '../utils';
import { createCursor } from './cursor';
import getNextSet from './getNextSet';

const fetchAssetsAlchemy = async ({
  assetAddresses,
  cursor,
  network,
  provider,
  userAddress,
  vaults,
}: {
  assetAddresses: string[];
  network: number;
  userAddress: string;
  cursor: string;
  vaults: Pick<Vault, 'vaultId' | 'asset' | 'features' | 'eligibilityModule'>[];
  provider: Provider;
}): Promise<{ assets: Asset[]; cursor: string }> => {
  if (!assetAddresses.length) {
    return { assets: [], cursor: null };
  }
  const data = await getNextSet({
    assetAddresses,
    cursor,
    network,
    userAddress,
  });

  const assets = await processAssetItems({
    network,
    provider,
    vaults,
    items: data.ownedNfts.map((x) => ({
      assetAddress: x.contract.address,
      tokenId: parseInt(x.id.tokenId, 16).toString(),
      quantity: parseEther(x.balance ?? '1'),
    })),
  });

  const newCursor = createCursor(cursor, assetAddresses, data?.pageKey);

  return { assets, cursor: newCursor };
};

export default fetchAssetsAlchemy;
