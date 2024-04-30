import { formatEther, parseEther } from 'viem';
import { makePriceVaultSell } from '../priceVaultSell';
import { WeiPerEther, Zero } from '@nftx/constants';

type PriceVaultSell = ReturnType<typeof makePriceVaultSell>;
let priceVaultSell: PriceVaultSell;
let run: () => ReturnType<PriceVaultSell>;

let fetchAmmQuote: jest.Mock;
let tokenIds: `${number}`[];
let vault: Parameters<PriceVaultSell>[0]['vault'];

beforeEach(() => {
  fetchAmmQuote = jest.fn(({ sellAmount }: { sellAmount: bigint }) => ({
    price: sellAmount,
  }));
  tokenIds = ['0', '1'];
  vault = {
    fees: {
      redeemFee: Zero,
      swapFee: Zero,
      mintFee: parseEther('0.05'), // 5%
    },
    id: '0x01',
    vTokenToEth: parseEther('0.5'),
    prices: [
      {
        redeem: null as any,
        swap: null as any,
        mint: {
          vTokenPrice: parseEther('1'),
          feePrice: parseEther('0.05'),
          premiumPrice: Zero,
          price: parseEther('0.95'),
          type: 'sell',
        },
      },
      {
        redeem: null as any,
        swap: null as any,
        mint: {
          vTokenPrice: parseEther('2'),
          feePrice: parseEther('0.1'),
          premiumPrice: Zero,
          price: parseEther('1.9'),
          type: 'sell',
        },
      },
    ] as any,
  };

  priceVaultSell = makePriceVaultSell({ fetchAmmQuote });
  run = () => priceVaultSell({ network: 1, tokenIds, vault });
});

describe('when there are more than 5 token ids', () => {
  beforeEach(() => {
    tokenIds = ['0', '1', '2', '3', '4', '5'];
  });

  it('returns a rough price estimate', async () => {
    const result = await run();

    // vTokenPrice + feePrice
    // 6 + 0.15 + 0
    expect(result.price).toBe(parseEther('5.85'));
  });
  it('fetches the price of selling the required vToken', async () => {
    const result = await run();

    expect(fetchAmmQuote).toBeCalled();
    expect(fetchAmmQuote.mock.calls[0][0].sellToken).toBe('0x01');
    expect(fetchAmmQuote.mock.calls[0][0].sellAmount).toBe(WeiPerEther * 6n);
    expect(result.vTokenPrice).toBe(parseEther('6'));
  });
  it('gets the vault fee price for buying n items', async () => {
    const result = await run();

    // fee * vTokenToEth * count
    // 0.05 * 0.5 * 6
    expect(result.feePrice).toBe(parseEther('0.15'));
  });
});

describe('when there are 5 or less token ids', () => {
  it('returns a price estimate', async () => {
    const result = await run();

    // vault.prices[1].redeem.price
    expect(formatEther(result.price)).toBe('1.9');
  });
  it('does not fetch any prices', async () => {
    await run();

    expect(fetchAmmQuote).not.toBeCalled();
  });
  it('uses the price stored on the vault', async () => {
    const result = await run();

    expect(result).toEqual(vault.prices[1].mint);
  });
});
