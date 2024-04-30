import { WeiPerEther, Zero } from '@nftx/constants';
import { makeQuoteVaultSell } from '../quoteVaultSell';
import { formatEther, parseEther } from 'viem';

let fetchAmmQuote: jest.Mock;
let fetchVTokenToEth: jest.Mock;
let quoteVaultSell: ReturnType<typeof makeQuoteVaultSell>;
type QuoteVaultSell = typeof quoteVaultSell;
type Args = Parameters<QuoteVaultSell>[0];
let run: () => ReturnType<QuoteVaultSell>;

let tokenIds: Args['tokenIds'];
let userAddress: Args['userAddress'];
let vault: Args['vault'];
let slippagePercentage: Args['slippagePercentage'];
let provider: any;

beforeEach(() => {
  fetchAmmQuote = jest.fn(async ({ sellAmount }) => ({
    price: sellAmount,
    methodParameters: { calldata: '0x9' },
  }));
  fetchVTokenToEth = jest.fn().mockResolvedValue(WeiPerEther / 2n);

  tokenIds = ['0', '1'];
  userAddress = '0x0';
  vault = {
    vaultId: '0',
    id: '0x1',
    asset: { id: '0x02', name: '', symbol: '' },
    fees: { redeemFee: Zero, swapFee: Zero, mintFee: parseEther('0.05') },
    is1155: false,
  };
  slippagePercentage = 0;
  provider = {
    estimateContractGas: jest.fn().mockResolvedValue(0n),
  };

  quoteVaultSell = makeQuoteVaultSell({
    fetchAmmQuote,
    fetchVTokenToEth,
  });
  run = () =>
    quoteVaultSell({
      provider,
      tokenIds,
      userAddress,
      vault,
      network: 1,
      slippagePercentage,
    });
});

it('gets the price of minting the requested amount of vTokens', async () => {
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

  // vTokenPrice - feePrice
  expect(formatEther(result.price)).toBe('1.95');
});

it('returns a list of individual item costs', async () => {
  const result = await run();

  expect(result.items).toHaveLength(2);

  expect(result.items[0].tokenId).toBe('0');
  expect(formatEther(result.items[0].vTokenPrice)).toBe('1');
  expect(formatEther(result.items[0].feePrice)).toBe('0.025');

  expect(result.items[1].tokenId).toBe('1');
  expect(formatEther(result.items[1].vTokenPrice)).toBe('1');
  expect(formatEther(result.items[1].feePrice)).toBe('0.025');
});

describe('when slippage percentage is not set', () => {
  it('does not adjust the payable amount', async () => {
    const result = await run();

    expect(result.methodParameters.value).toBe('50000000000000000');
  });
});

describe('when slippage percentage is set', () => {
  beforeEach(() => {
    slippagePercentage = 0.1;
  });

  it('adjusts the payable amount', async () => {
    const result = await run();

    expect(result.methodParameters.value).toBe('55000000000000000');
  });
});
