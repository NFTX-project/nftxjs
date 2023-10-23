import { formatEther, parseEther } from 'viem';
import { makePriceVaultSwap } from '../priceVaultSwap';
import { Zero } from '@nftx/constants';

type PriceVaultSwap = ReturnType<typeof makePriceVaultSwap>;
let priceVaultSwap: PriceVaultSwap;
let run: () => ReturnType<PriceVaultSwap>;

let quoteVaultSwap: jest.Mock;
let buyTokenIds: `${number}`[];
let sellTokenIds: `${number}`[];
let vault: Parameters<PriceVaultSwap>[0]['vault'];
let holdings: Parameters<PriceVaultSwap>[0]['holdings'];

beforeEach(() => {
  quoteVaultSwap = jest.fn().mockResolvedValue({});
  buyTokenIds = ['0', '1'];
  sellTokenIds = ['100', '101'];
  vault = {
    fees: {
      mintFee: Zero,
      redeemFee: Zero,
      swapFee: parseEther('0.05'), // 5%
    },
    vTokenToEth: parseEther('0.5'),
    asset: { id: '0x', name: '', symbol: '' },
    id: '0x01',
    vaultId: '0',
    is1155: false,
    prices: [
      {
        mint: null as any,
        redeem: null as any,
        swap: {
          vTokenPrice: Zero,
          feePrice: parseEther('0.05'),
          premiumPrice: Zero,
          price: parseEther('0.05'),
          type: 'swap',
        },
      },
      {
        mint: null as any,
        redeem: null as any,
        swap: {
          vTokenPrice: Zero,
          feePrice: parseEther('0.1'),
          premiumPrice: Zero,
          price: parseEther('0.1'),
          type: 'swap',
        },
      },
    ] as any,
  };
  holdings = [
    {
      tokenId: '0',
      dateAdded: Date.now() / 1000 - 60 * 60 * 24,
      amount: 1n,
    },
    {
      tokenId: '1',
      dateAdded: Date.now() / 1000 - 60 * 60 * 24,
      amount: 1n,
    },
  ];

  priceVaultSwap = makePriceVaultSwap({ quoteVaultSwap });
  run = () =>
    priceVaultSwap({
      holdings,
      buyTokenIds,
      sellTokenIds,
      vault,
      network: 1,
      provider: null as any,
    });
});

describe('when there are more than 5 token ids', () => {
  beforeEach(() => {
    buyTokenIds = ['0', '1', '2', '3', '4', '5'];
    sellTokenIds = ['100', '101', '102', '103', '104', '105'];
  });

  it('returns a rough price estimate', async () => {
    const result = await run();

    // vTokenPrice + feePrice + premiumPrice
    // 6 + 0.15 + 0
    expect(result.price).toBe(parseEther('0.15'));
  });
  it('vTokenPrice is 0 (as we are directly swapping NFTs without purchasing vToken)', async () => {
    const result = await run();

    expect(result.vTokenPrice).toBe(Zero);
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
      expect(result.premiumPrice).toBeLessThan(5010034472084955136n); // Max premium
    });
    it('adds the premium price to the total', async () => {
      const result = await run();

      expect(Number(formatEther(result.price))).toBeGreaterThan(0.15);
      expect(Number(formatEther(result.price))).toBeLessThan(5.1);
    });
  });
});

describe('when there are 5 or less token ids', () => {
  it('returns a price estimate', async () => {
    const result = await run();

    // vault.prices[1].redeem.price
    expect(formatEther(result.price)).toBe('0.1');
  });
  it('uses the price stored on the vault', async () => {
    const result = await run();

    expect(result).toEqual(vault.prices[1].swap);
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

      expect(Number(formatEther(result.price))).toBeGreaterThan(0.1);
      expect(Number(formatEther(result.price))).toBeLessThan(5.1);
    });
  });
});

describe('when vault is an 1155', () => {
  beforeEach(() => {
    vault.is1155 = true;
    holdings[1].amount = 2n;
  });

  it('gets an on-chain quote', async () => {
    const result = await run();

    expect(quoteVaultSwap).toBeCalled();
    expect(result).toEqual({});
  });
});
