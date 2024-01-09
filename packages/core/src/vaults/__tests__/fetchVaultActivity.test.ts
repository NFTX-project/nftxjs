import { formatJson } from '@nftx/utils';
import { makeFetchVaultActivity } from '../fetchVaultActivity';

let subgraphResponse: any;
let querySubgraph: jest.Mock;
let fetchVaultActivity: ReturnType<typeof makeFetchVaultActivity>;
let args: Parameters<typeof fetchVaultActivity>[0];
let run: () => ReturnType<typeof fetchVaultActivity>;

beforeEach(() => {
  const defaultActivityEvent = {
    source: 'source',
    date: '1',
    vault: {
      id: '0x1',
      vaultId: '1',
    },
    feeReceipt: {
      transfers: [
        {
          amount: '1',
        },
      ],
    },
  };

  subgraphResponse = {
    activityEvents: [
      // Mint
      {
        ...defaultActivityEvent,
        id: 'MINT-0x0',
        type: 'Mint',
        mintIds: ['1'],
      },
      // Sell
      {
        ...defaultActivityEvent,
        id: 'MINT-0x0',
        type: 'ZapSell',
        mintIds: ['1'],
      },
      // Rdeem
      {
        ...defaultActivityEvent,
        id: 'REDEEM-0x0',
        type: 'Redeem',
        redeemIds: ['1'],
      },
      // Buy
      {
        ...defaultActivityEvent,
        id: 'REDEEM-0x0',
        type: 'ZapBuy',
        redeemIds: ['1'],
      },
      // Swap
      {
        ...defaultActivityEvent,
        id: 'SWAP-0x0',
        type: 'Swap',
        swapMintIds: ['1'],
        swapRedeemIds: ['2'],
      },
      // LP Stake
      {
        ...defaultActivityEvent,
        id: 'DEPOSIT-0x0',
        type: 'AddLiquidity',
      },
      // IP Stake
      {
        ...defaultActivityEvent,
        id: 'DEPOSIT-0x0',
        type: 'InventoryDeposit',
      },
      // LP Unstake
      {
        ...defaultActivityEvent,
        id: 'WITHDRAW-0x0',
        type: 'RemoveLiquidity',
      },
      // IP Unstake
      {
        ...defaultActivityEvent,
        id: 'WITHDRAW-0x0',
        type: 'InventoryWithdraw',
      },
      // Created
      {
        ...defaultActivityEvent,
        id: 'VAULT_CREATED-0x0',
        type: 'VaultCreated',
      },
      // Updated
      {
        ...defaultActivityEvent,
        id: 'VAULT_FEE_UPDATE-0x0',
        type: 'VaultFeeUpdate',
      },
      // Shutdown
      {
        ...defaultActivityEvent,
        id: 'VAULT_SHUTDOWN-0x0',
        type: 'VaultShutdown',
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(subgraphResponse);
  fetchVaultActivity = makeFetchVaultActivity({ querySubgraph });
  args = {
    network: 1,
  };
  run = () => fetchVaultActivity(args);
});

it('returns a list of vault activity', async () => {
  const result = await run();

  const expected = [
    {
      type: 'mint',
      vaultId: '1',
      vaultAddress: '0x1',
      date: 1,
      eventType: 'Mint',
      source: 'source',
      tokenIds: ['1'],
      txId: '0x0',
      feeAmount: '0',
    },
    {
      type: 'sell',
      vaultId: '1',
      vaultAddress: '0x1',
      date: 1,
      eventType: 'ZapSell',
      source: 'source',
      tokenIds: ['1'],
      txId: '0x0',
      feeAmount: '1',
    },
    {
      type: 'redeem',
      vaultId: '1',
      vaultAddress: '0x1',
      date: 1,
      eventType: 'Redeem',
      source: 'source',
      tokenIds: ['1'],
      txId: '0x0',
      feeAmount: '1',
    },
    {
      type: 'buy',
      vaultId: '1',
      vaultAddress: '0x1',
      date: 1,
      eventType: 'ZapBuy',
      source: 'source',
      tokenIds: ['1'],
      txId: '0x0',
      feeAmount: '1',
    },
    {
      type: 'swap',
      vaultId: '1',
      vaultAddress: '0x1',
      date: 1,
      eventType: 'Swap',
      source: 'source',
      tokenIds: ['1'],
      txId: '0x0',
      feeAmount: '1',
      swapTokenIds: ['2'],
    },
    {
      type: 'stake',
      vaultId: '1',
      vaultAddress: '0x1',
      date: 1,
      eventType: 'AddLiquidity',
      source: 'source',
      txId: '0x0',
      stakeType: 'liquidity',
      amount: '0',
    },
    {
      type: 'stake',
      vaultId: '1',
      vaultAddress: '0x1',
      date: 1,
      eventType: 'InventoryDeposit',
      source: 'source',
      txId: '0x0',
      stakeType: 'inventory',
      amount: '0',
    },
  ];

  expect(result.length).toBe(7);
  expect(formatJson(result)).toEqual(expected);
});

describe('when includeAllActivity is true', () => {
  beforeEach(() => {
    args.includeAllActivity = true;
  });

  it('returns create update and shutdown events', async () => {
    const result = (await run()).slice(7);

    const expected = [
      {
        type: 'create',
        vaultId: '1',
        vaultAddress: '0x1',
        date: 1,
        eventType: 'VaultCreated',
        source: 'source',
        txId: '0x0',
      },
      {
        type: 'update',
        vaultId: '1',
        vaultAddress: '0x1',
        date: 1,
        eventType: 'VaultFeeUpdate',
        source: 'source',
        txId: '0x0',
      },
      {
        type: 'shutdown',
        vaultId: '1',
        vaultAddress: '0x1',
        date: 1,
        eventType: 'VaultShutdown',
        source: 'source',
        txId: '0x0',
      },
    ];

    expect(formatJson(result)).toEqual(expected);
  });
});

describe('when there are more than 1000 events', () => {
  beforeEach(() => {
    querySubgraph.mockResolvedValueOnce({
      ...subgraphResponse,
      activityEvents: Array(1000).fill(subgraphResponse.activityEvents[0]),
    });
  });

  it('recursively fetches more activity', async () => {
    const result = await run();

    expect(result.length).toBe(1007);
    expect(querySubgraph).toHaveBeenCalledTimes(2);
  });
});
