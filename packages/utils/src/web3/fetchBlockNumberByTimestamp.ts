type Fetch = typeof fetch;

export default ({ fetch }: { fetch: Fetch }) =>
  async function fetchBlockNumberByTimestamp({
    timestamp,
  }: {
    timestamp: number;
  }) {
    const response = await fetch(
      `https://etherscan-api-proxy.nftx.workers.dev/?timestamp=${timestamp}`
    );
    const data = await response.json();
    const block = Number(data.result);
    return block;
  };
