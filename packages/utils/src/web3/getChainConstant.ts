/** Takes a network/value key pair and returns the value for the current network */
const getChainConstant = <T>(
  obj: Record<number, T>,
  network: number,
  fallback?: T
): T => {
  return obj[network] ?? (fallback as T);
};

export default getChainConstant;
