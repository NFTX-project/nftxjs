/** Extracts the ids given an array of target ids.
 * If an id has multiple quantities, the id is included multiple times in the output
 * @example ['1', '2', '3'] -> ['1', '2', '3']
 * @example [['1', 1], ['2', 2], ['3', 3]] -> ['1', '2', '2', '3', '3', '3']
 */
export const getExactTokenIds = (
  tokenIds: Array<string> | Array<[string, number]>
): string[] => {
  return tokenIds
    .map((item: string | [string, number]) => {
      if (Array.isArray(item)) {
        const [id, quantity] = item;
        return Array(quantity ?? 1).fill(id);
      }
      return item;
    })
    .flat();
};

/** Returns an array of unique target ids.
 * If an id has multiple quantities, it is only included once in the output
 * @example ['1', '2', '3'] -> ['1', '2', '3']
 * @example [['1', 1], ['2', 2], ['3', 3]] -> ['1', '2', '3']
 */
export const getUniqueTokenIds = (
  tokenIds: Array<string> | Array<[string, number]>
): string[] => {
  return tokenIds
    .map((item: string | [string, number]) => {
      if (Array.isArray(item)) {
        return item[0];
      }
      return item;
    })
    .filter((x) => x != null);
};

/** Returns an array of amounts for each token id
 * @example ['1', '2', '3'] -> [1, 1, 1]
 * @example [['1', 1], ['2', 2], ['3', 3]] -> [1, 2, 3]
 */
export const getTokenIdAmounts = (
  tokenIds: Array<string> | Array<[string, number]>
): number[] => {
  return tokenIds.map((item: string | [string, number]) => {
    if (Array.isArray(item)) {
      return item[1] ?? 1;
    }
    return 1;
  });
};

/** Returns the total amount of ids.
 * If an id has multiple quantities, it adds up the total quantity
 * @example ['1', '2', '3'] -> 3
 * @example [['1', 1], ['2', 2], ['3', 3]] -> 6
 */
export const getTotalTokenIds = (
  tokenIds: Array<string> | Array<[string, number]>
): number => {
  return getExactTokenIds(tokenIds).length;
};
