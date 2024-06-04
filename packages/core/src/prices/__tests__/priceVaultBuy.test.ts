import { formatEther, parseEther } from 'viem';
import { makePriceVaultBuy } from '../priceVaultBuy';
import { WeiPerEther, Zero } from '@nftx/constants';
import { InsufficientLiquidityError } from '@nftx/errors';

type PriceVaultBuy = ReturnType<typeof makePriceVaultBuy>;
let priceVaultBuy: PriceVaultBuy;
let run: () => ReturnType<PriceVaultBuy>;

let fetchAmmQuote: jest.Mock;
let quoteVaultBuy: jest.Mock;
let tokenIds: `${number}`[];
let vault: Parameters<PriceVaultBuy>[0]['vault'];
let holdings: Parameters<PriceVaultBuy>[0]['holdings'];
let bypassLiquidityCheck: boolean;

beforeEach(() => {
  fetchAmmQuote = jest.fn(({ buyAmount }: { buyAmount: bigint }) => ({
    price: buyAmount,
  }));
  quoteVaultBuy = jest.fn().mockResolvedValue({ vTokenPrice: 0.6 });
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
      dateAdded: Date.now() / 1000 - 60 * 60 * 24,
      quantity: 1n,
    },
    {
      tokenId: '1',
      dateAdded: Date.now() / 1000 - 60 * 60 * 24,
      quantity: 1n,
    },
  ];
  bypassLiquidityCheck = false;

  priceVaultBuy = makePriceVaultBuy({ fetchAmmQuote, quoteVaultBuy });
  run = () =>
    priceVaultBuy({
      holdings,
      network: 1,
      tokenIds,
      vault,
      provider: null as any,
      bypassLiquidityCheck,
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

    expect(fetchAmmQuote).toBeCalled();
    expect(fetchAmmQuote.mock.calls[0][0].buyToken).toBe('0x01');
    expect(fetchAmmQuote.mock.calls[0][0].buyAmount).toBe(WeiPerEther * 6n);
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
      expect(result.premiumPrice).toBeLessThan(5062997539289817600n); // Max premium
    });
    it('adds the premium price to the total', async () => {
      const result = await run();

      expect(Number(formatEther(result.price))).toBeGreaterThan(6.15);
      expect(Number(formatEther(result.price))).toBeLessThan(20);
    });
  });

  describe('when there is no price', () => {
    beforeEach(() => {
      fetchAmmQuote.mockResolvedValue({ price: 0n });
    });

    it('throw an insufficient liquidity error', async () => {
      const promise = run();

      await expect(promise).rejects.toThrow(InsufficientLiquidityError);
    });

    describe('when bypassLiquidityCheck is true', () => {
      beforeEach(() => {
        bypassLiquidityCheck = true;
      });

      it('returns a zero value price', async () => {
        const promise = run();

        await expect(promise).resolves.toBeTruthy();

        const result = await promise;

        expect(`${result.price}`).toBe('150000000000000000');
        expect(`${result.vTokenPrice}`).toBe('0');
      });
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

    expect(fetchAmmQuote).not.toBeCalled();
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
      expect(result.premiumPrice).toBeLessThan(5062997539289817600n); // Max premium
    });
    it('adds the premium price to the total', async () => {
      const result = await run();

      expect(Number(formatEther(result.price))).toBeGreaterThan(2.1);
      expect(Number(formatEther(result.price))).toBeLessThan(7.1);
    });
  });

  describe('when there is no price stored on the vault', () => {
    beforeEach(() => {
      vault.prices = undefined as any;
    });

    it('returns a rough price estimate', async () => {
      const result = await run();

      expect(`${result.price}`).toBe('2050000000000000000');
      expect(fetchAmmQuote).toBeCalled();
    });
  });

  describe('when there is no price', () => {
    beforeEach(() => {
      vault.prices[1].redeem.price = Zero;
      vault.prices[1].redeem.vTokenPrice = Zero;
      vault.prices[1].redeem.feePrice = Zero;
      vault.prices[1].redeem.premiumPrice = Zero;
    });

    it('throws an insufficient liquidity error', async () => {
      const promise = run();

      await expect(promise).rejects.toThrow(InsufficientLiquidityError);
    });

    describe('when bypassLiquidityCheck is true', () => {
      beforeEach(() => {
        bypassLiquidityCheck = true;
      });

      it('returns a zero value price', async () => {
        const promise = run();

        await expect(promise).resolves.toBeTruthy();

        const result = await promise;

        expect(`${result.price}`).toBe('0');
        expect(`${result.vTokenPrice}`).toBe('0');
      });
    });
  });
});

describe('when vault is an 1155', () => {
  beforeEach(() => {
    vault.is1155 = true;
    holdings[0].quantity = 2n;
  });

  it('gets an on-chain quote', async () => {
    const result = await run();

    expect(quoteVaultBuy).toBeCalled();
    expect(result).toEqual({ vTokenPrice: 0.6 });
  });
  it('does not fetch any prices', async () => {
    await run();

    expect(fetchAmmQuote).not.toBeCalled();
  });
});
