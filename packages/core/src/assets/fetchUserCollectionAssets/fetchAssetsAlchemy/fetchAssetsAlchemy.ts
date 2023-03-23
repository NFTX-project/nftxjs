import type { Address, Asset } from '@nftx/types';
import { parseEther } from 'viem';
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
  assetAddresses: Address[];
  network: number;
  userAddress: Address;
  cursor?: string;
}): Promise<{ assets: Asset[]; cursor?: string }> => {
  if (!assetAddresses.length) {
    return { assets: [] };
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
      tokenId: BigInt(x.id.tokenId).toString() as `${number}`,
      quantity: parseEther(x.balance ?? '1'),
    })),
  });

  const newCursor = createCursor(cursor, assetAddresses, data?.pageKey);

  return { assets, cursor: newCursor };
};

export default fetchAssetsAlchemy;
