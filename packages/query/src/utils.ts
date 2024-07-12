export const normalizeIfAddress = <T>(t: T): T => {
  if (typeof t === 'string' && t.toLowerCase().startsWith('0x')) {
    return t.toLowerCase() as unknown as T;
  }
  return t;
};
