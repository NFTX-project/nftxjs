import { formatJson } from '@nftx/utils';
import { makeFetchPremiumPaids } from '../fetchPremiumPaids';

let queryResponse: any;
let querySubgraph: jest.Mock;
let fetchPremiumPaids: ReturnType<typeof makeFetchPremiumPaids>;
let args: Parameters<typeof fetchPremiumPaids>[0];
let run: () => ReturnType<typeof fetchPremiumPaids>;

beforeEach(() => {
  queryResponse = {
    premiumPaids: [
      {
        amount: '100000000000000000000',
        date: '1629830400',
        id: '0x000000',
        to: {
          id: '0x0',
        },
        vault: {
          id: '0x0',
          vaultId: '0',
        },
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(queryResponse);
  fetchPremiumPaids = makeFetchPremiumPaids({ querySubgraph });

  args = {
    network: 1,
  };

  run = () => fetchPremiumPaids(args);
});

it('fetches premium paids', async () => {
  const result = await run();

  expect(formatJson(result)).toEqual([
    {
      amount: '100000000000000000000',
      date: 1629830400,
      // to: '0x0',
      vaultAddress: '0x0',
      vaultId: '0',
    },
  ]);
});

describe('when there are more than 1000 premium paids', () => {
  beforeEach(() => {
    querySubgraph.mockResolvedValueOnce({
      premiumPaids: new Array(1000).fill(queryResponse.premiumPaids[0]),
    });
  });

  it('recusrively fetches all premium paids', async () => {
    const result = await run();

    expect(formatJson(result)).toHaveLength(1001);
  });
});
