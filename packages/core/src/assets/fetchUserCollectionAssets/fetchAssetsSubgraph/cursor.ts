export const parseCursor = (cursor: string) => {
  let next721Id: string;
  let next1155Id: string;
  let nextNonStandardId: number;

  if (cursor) {
    const [source, n7, n1, nn] = cursor.split('__');
    if (source !== 's') {
      throw new Error('Cursor is not subgraph-based');
    }
    next721Id = n7 ? n7 : undefined;
    next1155Id = n1 ? n1 : undefined;
    nextNonStandardId = nn ? Number(nn) : undefined;
  }

  return { next1155Id, next721Id, nextNonStandardId };
};

export const createCursor = (
  next721Id: string,
  next1155Id: string,
  nextNonStandardId: number
) => {
  if (next721Id || next1155Id || nextNonStandardId != null) {
    return [
      's',
      next721Id ?? '',
      next1155Id ?? '',
      nextNonStandardId ?? '',
    ].join('__');
  }
};
