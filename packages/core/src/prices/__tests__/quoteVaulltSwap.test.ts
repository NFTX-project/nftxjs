import { WeiPerEther, Zero } from '@nftx/constants';
import { makeQuoteVaultSwap } from '../quoteVaultSwap';
import { formatEther, parseEther } from 'viem';

let fetchVTokenToEth: jest.Mock;
let fetchPremiumPrice: jest.Mock;
let quoteVaultSwap: ReturnType<typeof makeQuoteVaultSwap>;
type QuoteVaultSwap = typeof quoteVaultSwap;
type Args = Parameters<QuoteVaultSwap>[0];
let run: () => ReturnType<QuoteVaultSwap>;

let sellTokenIds: Args['sellTokenIds'];
let buyTokenIds: Args['buyTokenIds'];
let userAddress: Args['userAddress'];
let vault: Args['vault'];
let holdings: Args['holdings'];

beforeEach(() => {
  fetchVTokenToEth = jest.fn().mockResolvedValue(WeiPerEther / 2n);
  fetchPremiumPrice = jest.fn().mockResolvedValue(Zero);

  sellTokenIds = ['10', '11'];
  buyTokenIds = ['0', '1'];
  userAddress = '0x0';
  vault = {
    is1155: false,
    vaultId: '0',
    id: '0x1',
    asset: { id: '0x2', name: '', symbol: '' },
    fees: { mintFee: Zero, redeemFee: Zero, swapFee: parseEther('0.05') },
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

  quoteVaultSwap = makeQuoteVaultSwap({
    fetchPremiumPrice,
    fetchVTokenToEth,
  });
  run = () =>
    quoteVaultSwap({
      holdings,
      provider: null as any,
      userAddress,
      vault,
      network: 1,
      buyTokenIds,
      sellTokenIds,
    });
});

it('vTokenPrice is 0 as there are no vTokens being traded', async () => {
  const result = await run();

  expect(formatEther(result.vTokenPrice)).toBe('0');
});

it('returns the total fee amount to be paid', async () => {
  const result = await run();

  // mintFee * vTokenToEth * count
  // 0.05 * 0.5 * 2
  expect(formatEther(result.feePrice)).toBe('0.05');
});

it('returns the total price to be paid', async () => {
  const result = await run();

  //  feePrice
  expect(formatEther(result.price)).toBe('0.05');
});

it('returns a list of individual item costs', async () => {
  const result = await run();

  expect(result.items).toHaveLength(2);

  expect(result.items[0].tokenId).toBe('0');
  expect(formatEther(result.items[0].vTokenPrice)).toBe('0');
  expect(formatEther(result.items[0].feePrice)).toBe('0.025');
  expect(formatEther(result.items[0].premiumPrice)).toBe('0');

  expect(result.items[1].tokenId).toBe('1');
  expect(formatEther(result.items[1].vTokenPrice)).toBe('0');
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

    expect(formatEther(result.price)).toBe('1.05');
  });
});

describe('when items are outside the premium window', () => {
  it('has a 0 premium amount', async () => {
    const result = await run();

    expect(formatEther(result.premiumPrice)).toBe('0');
  });
});
