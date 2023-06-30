const PREFIX_KEY = 'ncafuh';

export const parseCursor = (
  type: '721' | '1155' | 'nonstandard',
  cursor: string | undefined
): { lastId: string } => {
  if (cursor) {
    const [prefix, cursorType, lastId] = cursor.split('__');
    if (prefix === PREFIX_KEY && cursorType === type) {
      return { lastId };
    }
  }

  return { lastId: '0' };
};

export const createCursor = (
  type: '721' | '1155' | 'nonstandard',
  lastId: string | undefined
) => {
  if (lastId) {
    return [PREFIX_KEY, type, lastId].join('__');
  }
};

export const getCursorType = (
  cursor: string | undefined
): '721' | '1155' | 'nonstandard' => {
  if (!cursor) {
    return '721';
  }
  const [prefix, type] = cursor.split('__');

  if (prefix !== PREFIX_KEY) {
    return '721';
  }

  return type as '721' | '1155' | 'nonstandard';
};
