const PREFIX_KEY = 'ncafua';

export const parseCursor = (cursor: string | undefined) => {
  if (cursor) {
    const [prefix, continuation] = cursor.split('__');
    if (prefix === PREFIX_KEY && continuation) {
      return continuation;
    }
  }
};

export const createCursor = (continuation: string | undefined) => {
  if (continuation) {
    return [PREFIX_KEY, continuation].join('__');
  }
};
