import { WeiPerEther, Zero } from '@nftx/constants';
import { makeQuoteVaultBuy } from '../quoteVaultBuy';
import { formatEther, parseEther } from 'viem';

let fetchTokenBuyPrice: jest.Mock;
let fetchVTokenToEth: jest.Mock;
let fetchPremiumPrice: jest.Mock;
let quoteVaultBuy: ReturnType<typeof makeQuoteVaultBuy>;
type QuoteVaultBuy = typeof quoteVaultBuy;
type Args = Parameters<QuoteVaultBuy>[0];
let run: () => ReturnType<QuoteVaultBuy>;

let tokenIds: Args['tokenIds'];
let userAddress: Args['userAddress'];
let vault: Args['vault'];
let holdings: Args['holdings'];

beforeEach(() => {
  fetchTokenBuyPrice = jest.fn(async ({ amount }) => ({
    price: amount,
    methodParameters: { calldata: '0x9' },
  }));
  fetchVTokenToEth = jest.fn().mockResolvedValue(WeiPerEther / 2n);
  fetchPremiumPrice = jest.fn().mockResolvedValue(Zero);

  tokenIds = ['0', '1'];
  userAddress = '0x0';
  vault = {
    vaultId: '0',
    id: '0x1',
    fees: { mintFee: Zero, swapFee: Zero, redeemFee: parseEther('0.05') },
  };
  holdings = [
    {
      dateAdded: 0,
      tokenId: '0',
    },
    {
      dateAdded: 0,
      tokenId: '1',
    },
  ];

  quoteVaultBuy = makeQuoteVaultBuy({
    fetchPremiumPrice,
    fetchTokenBuyPrice,
    fetchVTokenToEth,
  });
  run = () =>
    quoteVaultBuy({
      holdings,
      provider: null as any,
      tokenIds,
      userAddress,
      vault,
      network: 1,
    });
});

it('gets the price of buying the requested amount of vTokens', async () => {
  const result = await run();

  expect(formatEther(result.vTokenPrice)).toBe('2');
});

it('returns the total fee amount to be paid', async () => {
  const result = await run();

  // mintFee * vTokenToEth * count
  // 0.05 * 0.5 * 2
  expect(formatEther(result.feePrice)).toBe('0.05');
});

it('returns the total price to be paid', async () => {
  const result = await run();

  // vTokenPrice + feePrice
  expect(formatEther(result.price)).toBe('2.05');
});

it('returns a list of individual item costs', async () => {
  const result = await run();

  expect(result.items).toHaveLength(2);

  expect(result.items[0].tokenId).toBe('0');
  expect(formatEther(result.items[0].vTokenPrice)).toBe('1');
  expect(formatEther(result.items[0].feePrice)).toBe('0.025');
  expect(formatEther(result.items[0].premiumPrice)).toBe('0');

  expect(result.items[1].tokenId).toBe('1');
  expect(formatEther(result.items[1].vTokenPrice)).toBe('1');
  expect(formatEther(result.items[1].feePrice)).toBe('0.025');
  expect(formatEther(result.items[1].premiumPrice)).toBe('0');
});

describe('when items are in the premium window', () => {
  beforeEach(() => {
    fetchPremiumPrice.mockResolvedValueOnce(WeiPerEther);
  });

  it('returns a premium amount', async () => {
    const result = await run();

    expect(formatEther(result.premiumPrice)).toBe('1');
  });
  it('adds a premium to the item breakdowns', async () => {
    const result = await run();

    expect(formatEther(result.items[0].premiumPrice)).toBe('1');
    expect(formatEther(result.items[1].premiumPrice)).toBe('0');
  });
  it('adds the premium to the final price', async () => {
    const result = await run();

    expect(formatEther(result.price)).toBe('3.05');
  });
});

describe('when items are outside the premium window', () => {
  it('has a 0 premium amount', async () => {
    const result = await run();

    expect(formatEther(result.premiumPrice)).toBe('0');
  });
});
