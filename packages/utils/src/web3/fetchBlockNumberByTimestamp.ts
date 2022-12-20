type Fetch = typeof fetch;

export default ({ fetch }: { fetch: Fetch }) =>
  /**
   * Returns an approximate block number for a given timestamp
   */
  async function fetchBlockNumberByTimestamp({
    timestamp,
  }: {
    /** Timestamp in seconds */
    timestamp: number;
  }) {
    const response = await fetch(
      `https://etherscan-api-proxy.nftx.workers.dev/?timestamp=${timestamp}`
    );
    const data = await response.json();
    const block = Number(data.result);
    return block;
  };
