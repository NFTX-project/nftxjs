import type { GetAll } from '../getAll';
import {
  FetchMints,
  makeFetchMints,
  makeProcessMints,
  Mint,
  ProcessMints,
} from '../mints';
import {
  FetchRedeems,
  makeFetchRedeems,
  makeProcessRedeems,
  ProcessRedeems,
  Redeem,
} from '../redeems';
import {
  FetchSwaps,
  makeFetchSwaps,
  makeProcessSwaps,
  ProcessSwaps,
  Swap,
} from '../swaps';
import makeFetchVaultActivity from '../fetchVaultActivity';
import makeGetAll from '../getAll';
import { getChainConstant } from '@nftx/utils';
import {
  NFTX_MARKETPLACE_0X_ZAP,
  NFTX_STAKING_ZAP,
  Zero,
} from '@nftx/constants';
import { parseEther } from 'viem';

let processRedeems: ProcessRedeems;
let fetchRedeems: FetchRedeems;
let queryRedeems: jest.Mock;
let redeemsResponse: { redeems: Redeem[] };
let processSwaps: ProcessSwaps;
let fetchSwaps: FetchSwaps;
let querySwaps: jest.Mock;
let swapsResponse: { swaps: Swap[] };
let processMints: ProcessMints;
let fetchMints: FetchMints;
let queryMints: jest.Mock;
let mintsResponse: { mints: Mint[] };
let queryResponse: {
  mints: Mint[];
  redeems: Redeem[];
  swaps: Swap[];
};
let querySubgraph: jest.Mock;
let getAll: GetAll;
let fetchVaultActivity: ReturnType<typeof makeFetchVaultActivity>;
let run: () => ReturnType<typeof fetchVaultActivity>;

beforeEach(() => {
  queryResponse = {
    mints: [
      {
        zapAction: null as any,
        amounts: ['0.1'],
        date: '0',
        feeReceipt: {
          date: '0',
          transfers: [
            {
              amount: parseEther('0.1').toString() as `${number}`,
              to: '0x0',
            },
          ],
        },
        id: '0x1',
        nftIds: ['1'],
        source: '',
        user: {
          id: '0x0',
        },
        vault: {
          id: '0x1',
          asset: {
            id: '0x2',
          },
          inventoryStakingPool: null as any,
          token: {
            symbol: 'PUNK',
          },
          vaultId: '0',
        },
      },
    ],
    redeems: [
      {
        date: '1000',
        feeReceipt: {
          date: '1000',
          transfers: [
            {
              amount: parseEther('0.1').toString() as `${number}`,
              to: '0x0',
            },
          ],
        },
        id: '0x1',
        nftIds: ['2'],
        randomCount: '0',
        source: '',
        specificIds: ['2'],
        user: { id: '0x0' },
        zapAction: null as any,
        vault: {
          id: '0x1',
          asset: { id: '0x0' },
          token: { symbol: 'PUNK' },
          vaultId: '0',
        },
      },
    ],
    swaps: [
      {
        id: '0x1',
        date: '2000',
        feeReceipt: {
          date: '2000',
          transfers: [
            { amount: parseEther('0.1').toString() as `${number}`, to: '0x0' },
          ],
        },
        mintedIds: ['3'],
        randomCount: '0',
        redeemedIds: ['4'],
        source: '',
        specificIds: ['4'],
        targetCount: '1',
        zapAction: null as any,
        vault: {
          asset: { id: '0x0' },
          id: '0x1',
          inventoryStakingPool: null as any,
          token: { symbol: 'PUNK' },
          vaultId: '0',
        },
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(queryResponse);

  redeemsResponse = { redeems: queryResponse.redeems };
  queryRedeems = jest.fn().mockResolvedValue(redeemsResponse);
  fetchRedeems = makeFetchRedeems({ querySubgraph: queryRedeems });
  processRedeems = makeProcessRedeems({ fetchRedeems });

  swapsResponse = { swaps: queryResponse.swaps };
  querySwaps = jest.fn().mockResolvedValue(swapsResponse);
  fetchSwaps = makeFetchSwaps({ querySubgraph: querySwaps });
  processSwaps = makeProcessSwaps({ fetchSwaps });

  mintsResponse = { mints: queryResponse.mints };
  queryMints = jest.fn().mockResolvedValue(mintsResponse);
  fetchMints = makeFetchMints({ querySubgraph: queryMints });
  processMints = makeProcessMints({ fetchMints });

  getAll = makeGetAll({
    processMints,
    processRedeems,
    processSwaps,
    querySubgraph,
  });

  fetchVaultActivity = makeFetchVaultActivity({ getAll });
  run = () => fetchVaultActivity({ network: 1 });
});

it('fetches mints redeems and swaps in a single subgraph call', async () => {
  await run();

  expect(querySubgraph).toBeCalledTimes(1);
  expect(queryMints).not.toBeCalled();
  expect(queryRedeems).not.toBeCalled();
  expect(querySwaps).not.toBeCalled();
});

it('returns a list of mints swaps redeems and all activity', async () => {
  const { activity, mints, redeems, swaps } = await run();

  expect(mints).toHaveLength(1);
  expect(redeems).toHaveLength(1);
  expect(swaps).toHaveLength(1);
  expect(activity).toHaveLength(3);
});

it('orders activity by timestamp', async () => {
  const { activity } = await run();

  const timestamps = activity.map((x) => x.date);

  expect(timestamps).toEqual([0, 1000, 2000]);
});

describe('mints', () => {
  it('returns a list of mints', async () => {
    const { mints } = await run();

    expect(mints).toEqual([
      {
        amount: 0.1,
        date: 0,
        ethAmount: Zero,
        feeAmount: parseEther('0.1'),
        source: '',
        tokenId: '1',
        txId: '0x1',
        type: expect.any(String),
        vaultAddress: '0x1',
        vaultId: '0',
      },
    ]);
  });
  describe('when there are multiple NFTs in a single mint', () => {
    beforeEach(() => {
      queryResponse.mints[0].nftIds[1] = '11';
    });

    it('returns a mint for each NFT', async () => {
      const { mints } = await run();

      expect(mints).toHaveLength(2);
    });
  });
  describe('when mint was made by the staking zap', () => {
    beforeEach(() => {
      queryResponse.mints[0].user.id = getChainConstant(NFTX_STAKING_ZAP, 1);
    });

    it('is a liquidity stake', async () => {
      const { mints } = await run();

      expect(mints[0].type).toBe('stake');
      expect(mints[0].stakeType).toBe('liquidity');
    });
  });
  describe('when mint was made by the inventory staking pool', () => {
    beforeEach(() => {
      queryResponse.mints[0].user.id = '0x789';
      queryResponse.mints[0].vault.inventoryStakingPool = { id: '0x789' };
    });

    it('is an inventory stake', async () => {
      const { mints } = await run();

      expect(mints[0].type).toBe('stake');
      expect(mints[0].stakeType).toBe('inventory');
    });
  });
  describe('when mint was made by the 0x marketplace zap', () => {
    beforeEach(() => {
      queryResponse.mints[0].user.id = getChainConstant(
        NFTX_MARKETPLACE_0X_ZAP,
        1
      );
    });

    it('is a sell', async () => {
      const { mints } = await run();

      expect(mints[0].type).toBe('sell');
    });
  });
  describe('when mint was not made by any zaps', () => {
    it('is a mint', async () => {
      const { mints } = await run();

      expect(mints[0].type).toBe('mint');
    });
  });
  describe('when there are more than 1000 mints', () => {
    beforeEach(() => {
      queryResponse.mints = new Array(1000).fill(queryResponse.mints[0]);
    });

    it('fetches more mints', async () => {
      const { mints } = await run();

      expect(querySubgraph).toBeCalledTimes(1);
      expect(queryMints).toBeCalledTimes(1);
      expect(mints).toHaveLength(1001);
    });
  });
});

describe('redeems', () => {
  it('returns a list of redeems', async () => {
    const { redeems } = await run();

    expect(redeems).toEqual([
      {
        amount: 1,
        date: 1000,
        ethAmount: undefined,
        feeAmount: parseEther('0.1'),
        random: false,
        source: '',
        tokenId: '2',
        txId: '0x1',
        type: expect.any(String),
        vaultAddress: '0x1',
        vaultId: '0',
      },
    ]);
  });

  describe('when there are multiple NFTs in a single redeem', () => {
    beforeEach(() => {
      queryResponse.redeems[0].nftIds.push('9');
    });

    it('returns a redeem for each NFT', async () => {
      const { redeems } = await run();

      expect(redeems).toHaveLength(2);
    });
  });
  describe('when a redeem has a zapAction', () => {
    beforeEach(() => {
      queryResponse.redeems[0].zapAction = { ethAmount: '0', id: '' };
    });

    it('is a buy', async () => {
      const { redeems } = await run();

      expect(redeems[0].type).toBe('buy');
    });
  });
  describe('when a redeem was a 0 amount', () => {
    beforeEach(() => {
      queryResponse.redeems[0].feeReceipt.transfers[0].amount = '0';
    });

    it('is an unstake', async () => {
      const { redeems } = await run();

      expect(redeems[0].type).toBe('unstake');
    });
  });
  describe('when a redeem was not made by a zap', () => {
    it('is a redeem', async () => {
      const { redeems } = await run();

      expect(redeems[0].type).toBe('redeem');
    });
  });
  describe('when there are more than 1000 redeems', () => {
    beforeEach(() => {
      queryResponse.redeems = new Array(1000).fill(queryResponse.redeems[0]);
    });

    it('fetches more redeems', async () => {
      const { redeems } = await run();

      expect(querySubgraph).toBeCalledTimes(1);
      expect(queryRedeems).toBeCalledTimes(1);
      expect(redeems).toHaveLength(1001);
    });
  });
});

describe('swaps', () => {
  it('returns a list of swaps', async () => {
    const { swaps } = await run();

    expect(swaps).toEqual([
      {
        amount: 1,
        date: 2000,
        ethAmount: Zero,
        feeAmount: parseEther('0.1'),
        source: '',
        swapTokenId: expect.any(String),
        tokenId: expect.any(String),
        txId: '0x1',
        type: expect.any(String),
        vaultAddress: '0x1',
        vaultId: '0',
      },
    ]);
  });
  it('includes the tokenID that was swapped as well as the id that was received', async () => {
    const { swaps } = await run();

    expect(swaps[0].tokenId).toBe('4');
    expect(swaps[0].swapTokenId).toBe('3');
  });
  describe('when there were multiple NFTs in a single swap', () => {
    beforeEach(() => {
      queryResponse.swaps[0].mintedIds.push('11');
      queryResponse.swaps[0].redeemedIds.push('12');
    });

    it('returns a swap for each NFT', async () => {
      const { swaps } = await run();

      expect(swaps).toHaveLength(2);
    });
  });

  describe('when there are more than 1000 swaps', () => {
    beforeEach(() => {
      queryResponse.swaps = new Array(1000).fill(queryResponse.swaps[0]);
    });

    it('fetches more swaps', async () => {
      const { swaps } = await run();

      expect(querySubgraph).toBeCalledTimes(1);
      expect(querySwaps).toBeCalledTimes(1);
      expect(swaps).toHaveLength(1001);
    });
  });
});
