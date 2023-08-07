import { formatEther, parseEther } from 'viem';
import { makePriceVaultBuy } from '../priceVaultBuy';
import { WeiPerEther, Zero } from '@nftx/constants';

type PriceVaultBuy = ReturnType<typeof makePriceVaultBuy>;
let priceVaultBuy: PriceVaultBuy;
let run: () => ReturnType<PriceVaultBuy>;

let fetchTokenBuyPrice: jest.Mock;
let quoteVaultBuy: jest.Mock;
let tokenIds: `${number}`[];
let vault: Parameters<PriceVaultBuy>[0]['vault'];
let holdings: Parameters<PriceVaultBuy>[0]['holdings'];

beforeEach(() => {
  fetchTokenBuyPrice = jest.fn(({ amount }: { amount: bigint }) => ({
    price: amount,
  }));
  quoteVaultBuy = jest.fn().mockResolvedValue({});
  tokenIds = ['0', '1'];
  vault = {
    fees: {
      mintFee: Zero,
      swapFee: Zero,
      redeemFee: parseEther('0.05'), // 5%
    },
    id: '0x01',
    is1155: false,
    vaultId: '0',
    vTokenToEth: parseEther('0.5'),
    prices: [
      {
        mint: null as any,
        swap: null as any,
        redeem: {
          vTokenPrice: parseEther('1'),
          feePrice: parseEther('0.05'),
          premiumPrice: Zero,
          price: parseEther('1.05'),
          type: 'buy',
        },
      },
      {
        mint: null as any,
        swap: null as any,
        redeem: {
          vTokenPrice: parseEther('2'),
          feePrice: parseEther('0.1'),
          premiumPrice: Zero,
          price: parseEther('2.1'),
          type: 'buy',
        },
      },
    ] as any,
  };
  holdings = [
    {
      tokenId: '0',
      dateAdded: Date.now() / 1000 - 4000,
      amount: 1n,
    },
    {
      tokenId: '1',
      dateAdded: Date.now() / 1000 - 4000,
      amount: 1n,
    },
  ];

  priceVaultBuy = makePriceVaultBuy({ fetchTokenBuyPrice, quoteVaultBuy });
  run = () =>
    priceVaultBuy({
      holdings,
      network: 1,
      tokenIds,
      vault,
      provider: null as any,
    });
});

describe('when there are more than 5 token ids', () => {
  beforeEach(() => {
    tokenIds = ['0', '1', '2', '3', '4', '5'];
  });

  it('returns a rough price estimate', async () => {
    const result = await run();

    // vTokenPrice + feePrice + premiumPrice
    // 6 + 0.15 + 0
    expect(result.price).toBe(parseEther('6.15'));
  });
  it('fetches the price of buying the required vToken', async () => {
    const result = await run();

    expect(fetchTokenBuyPrice).toBeCalled();
    expect(fetchTokenBuyPrice.mock.calls[0][0].tokenAddress).toBe('0x01');
    expect(fetchTokenBuyPrice.mock.calls[0][0].amount).toBe(WeiPerEther * 6n);
    expect(result.vTokenPrice).toBe(parseEther('6'));
  });
  it('gets the vault fee price for buying n items', async () => {
    const result = await run();

    // fee * vTokenToEth * count
    // 0.05 * 0.5 * 6
    expect(result.feePrice).toBe(parseEther('0.15'));
  });
  it('gets the premium price', async () => {
    const result = await run();

    expect(result.premiumPrice).toBe(Zero);
  });

  describe('when there is a premium', () => {
    beforeEach(() => {
      holdings[0].dateAdded = Date.now() / 1000;
      holdings[1].dateAdded = Date.now() / 1000 - 1800;
    });

    it('returns the premium price', async () => {
      const result = await run();

      expect(result.premiumPrice).toBeGreaterThan(Zero);
      expect(result.premiumPrice).toBeLessThan(4362997539289817600n); // Max premium
    });
    it('adds the premium price to the total', async () => {
      const result = await run();

      expect(Number(formatEther(result.price))).toBeGreaterThan(6.15);
      expect(Number(formatEther(result.price))).toBeLessThan(20);
    });
  });
});

describe('when there are 5 or less token ids', () => {
  it('returns a price estimate', async () => {
    const result = await run();

    // vault.prices[1].redeem.price
    expect(formatEther(result.price)).toBe('2.1');
  });
  it('does not fetch any prices', async () => {
    await run();

    expect(fetchTokenBuyPrice).not.toBeCalled();
  });
  it('uses the price stored on the vault', async () => {
    const result = await run();

    expect(result).toEqual(vault.prices[1].redeem);
  });

  describe('when there is a premium', () => {
    beforeEach(() => {
      holdings[0].dateAdded = Date.now() / 1000;
      holdings[1].dateAdded = Date.now() / 1000 - 1800;
    });

    it('returns the premium price', async () => {
      const result = await run();

      expect(result.premiumPrice).toBeGreaterThan(Zero);
      expect(result.premiumPrice).toBeLessThan(4362997539289817600n); // Max premium
    });
    it('adds the premium price to the total', async () => {
      const result = await run();

      expect(Number(formatEther(result.price))).toBeGreaterThan(2.1);
      expect(Number(formatEther(result.price))).toBeLessThan(7);
    });
  });
});

describe('when vault is an 1155', () => {
  beforeEach(() => {
    vault.is1155 = true;
    holdings[0].amount = 2n;
  });

  it('gets an on-chain quote', async () => {
    const result = await run();

    expect(quoteVaultBuy).toBeCalled();
    expect(result).toEqual({});
  });
  it('does not fetch any prices', async () => {
    await run();

    expect(fetchTokenBuyPrice).not.toBeCalled();
  });
});
