import { makeFetchLiquidityPools } from '../fetchLiquidityPools';

let fetchPoolsSet: jest.Mock;
let stubMissingPools: jest.Mock;
let fetchFeeReceipts: jest.Mock;
let fetchPremiumPaids: jest.Mock;
let fetchLiquidityPools: ReturnType<typeof makeFetchLiquidityPools>;
let args: Parameters<typeof fetchLiquidityPools>[0];
let run: () => ReturnType<typeof fetchLiquidityPools>;

beforeEach(() => {
  fetchPoolsSet = jest.fn().mockResolvedValue([[{}, {}, {}], undefined]);
  stubMissingPools = jest.fn().mockResolvedValue([{}, {}, {}]);
  fetchFeeReceipts = jest.fn().mockResolvedValue([]);
  fetchPremiumPaids = jest.fn().mockResolvedValue([]);
  args = { vaults: [], provider: {} as any };
  fetchLiquidityPools = makeFetchLiquidityPools({
    fetchFeeReceipts,
    fetchPoolsSet,
    fetchPremiumPaids,
    stubMissingPools,
  });
  run = () => fetchLiquidityPools(args);
});

it('returns a list of liquidity pools', async () => {
  const pools = await run();
  expect(pools).toHaveLength(6);
});

describe('when there are more than 1000 pools', () => {
  beforeEach(() => {
    fetchPoolsSet.mockResolvedValueOnce([new Array(1000).fill({}), 'nextId']);
  });

  it('recursively fetches all pools', async () => {
    const pools = await run();

    expect(pools).toHaveLength(1006);
    expect(fetchPoolsSet).toHaveBeenCalledTimes(2);
  });
});

describe('when exists is true', () => {
  beforeEach(() => {
    args.exists = true;
  });

  it('does not stub missing pools', async () => {
    await run();
    expect(stubMissingPools).not.toHaveBeenCalled();
  });
});

describe('when exists is false', () => {
  beforeEach(() => {
    args.exists = false;
  });

  it('stubs missing pools', async () => {
    await run();
    expect(stubMissingPools).toHaveBeenCalled();
  });
});
