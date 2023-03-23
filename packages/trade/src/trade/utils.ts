import type { TokenId } from '@nftx/types';

export const normalizeTokenIds = (
  tokenIds: Array<TokenId> | Array<[TokenId, number]>
): Array<[TokenId, number]> => {
  return (tokenIds as any[]).reduce((acc, item) => {
    if (Array.isArray(item) && item[0]) {
      return [...acc, [item[0], item[1] ?? 1]];
    }
    if (item) {
      return [...acc, [item, 1]];
    }
    return acc;
  }, [] as Array<[TokenId, number]>);
};

/** Extracts the ids given an array of target ids.
 * If an id has multiple quantities, the id is included multiple times in the output
 * @example ['1', '2', '3'] -> ['1', '2', '3']
 * @example [['1', 1], ['2', 2], ['3', 3]] -> ['1', '2', '2', '3', '3', '3']
 */
export const getExactTokenIds = (
  tokenIds: Array<TokenId> | Array<[TokenId, number]>
): TokenId[] => {
  return normalizeTokenIds(tokenIds)
    .map(([id, quantity]) => {
      return Array<TokenId>(quantity).fill(id);
    })
    .flat();
};

/** Returns an array of unique target ids.
 * If an id has multiple quantities, it is only included once in the output
 * @example ['1', '2', '3'] -> ['1', '2', '3']
 * @example [['1', 1], ['2', 2], ['3', 3]] -> ['1', '2', '3']
 */
export const getUniqueTokenIds = (
  tokenIds: Array<TokenId> | Array<[TokenId, number]>
): TokenId[] => {
  return normalizeTokenIds(tokenIds).map(([id]) => id);
};

/** Returns an array of amounts for each token id
 * @example ['1', '2', '3'] -> [1, 1, 1]
 * @example [['1', 1], ['2', 2], ['3', 3]] -> [1, 2, 3]
 */
export const getTokenIdAmounts = (
  tokenIds: Array<TokenId> | Array<[TokenId, number]>
): number[] => {
  return normalizeTokenIds(tokenIds).map(([, amount]) => {
    return amount;
  });
};

/** Returns the total amount of ids.
 * If an id has multiple quantities, it adds up the total quantity
 * @example ['1', '2', '3'] -> 3
 * @example [['1', 1], ['2', 2], ['3', 3]] -> 6
 */
export const getTotalTokenIds = (
  tokenIds: Array<TokenId> | Array<[TokenId, number]>
): number => {
  return getExactTokenIds(tokenIds).length;
};
