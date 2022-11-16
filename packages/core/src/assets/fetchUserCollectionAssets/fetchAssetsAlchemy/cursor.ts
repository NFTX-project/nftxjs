export const parseCursor = (cursor: string, assetAddresses: string[]) => {
  let source: string;
  let firstAssetId: string = assetAddresses[0];
  let pageKey: string;
  let startIndex = 0;
  let endIndex = Math.min(10, assetAddresses.length);

  if (cursor) {
    [source, firstAssetId, pageKey] = cursor.split('__');
    if (source !== 'a') {
      throw new Error('Cursor is not alchemy-based, falling back to subgraph');
    }
    startIndex = assetAddresses.indexOf(firstAssetId);
    endIndex = Math.min(startIndex + 10, assetAddresses.length);
  }

  return { firstAssetId, pageKey, startIndex, endIndex };
};

export const createCursor = (
  cursor: string,
  assetAddresses: string[],
  pageKey: string
) => {
  const { endIndex, firstAssetId } = parseCursor(cursor, assetAddresses);
  const parts = ['a'];

  if (pageKey == null) {
    const nextAssetId = assetAddresses[endIndex];
    if (nextAssetId) {
      parts[1] = nextAssetId;
    } else {
      return null;
    }
  } else {
    parts[1] = firstAssetId;
    parts[2] = pageKey;
  }

  return parts.join('__');
};
