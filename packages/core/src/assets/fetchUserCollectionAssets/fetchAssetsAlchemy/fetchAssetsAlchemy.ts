import { parseEther } from '@ethersproject/units';
import type { Asset } from '@nftx/types';
import { processAssetItems } from '../utils';
import { createCursor } from './cursor';
import getNextSet from './getNextSet';
import { BigNumber } from '@ethersproject/bignumber';

const fetchAssetsAlchemy = async ({
  assetAddresses,
  cursor,
  network,
  userAddress,
}: {
  assetAddresses: string[];
  network: number;
  userAddress: string;
  cursor: string;
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
    items: data.ownedNfts.map((x) => ({
      assetAddress: x.contract.address,
      tokenId: BigNumber.from(x.id.tokenId).toString(),
      quantity: parseEther(x.balance ?? '1'),
    })),
  });

  const newCursor = createCursor(cursor, assetAddresses, data?.pageKey);

  return { assets, cursor: newCursor };
};

export default fetchAssetsAlchemy;
