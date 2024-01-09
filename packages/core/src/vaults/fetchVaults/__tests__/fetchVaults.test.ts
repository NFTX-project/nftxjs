import { OPENSEA_COLLECTION, WeiPerEther } from '@nftx/constants';
import { makeFetchVaults } from '../fetchVaults';
import { makePopulateVaultPrices } from '../populateVaultPrices';
import { MarketplacePrice } from '@nftx/types';
import { formatEther, parseEther } from 'viem';
import { formatJson } from '@nftx/utils';

let collection: { slug: string };
let fetchCollection: jest.Mock;
let vaultHoldings: any[];
let fetchVaultHoldings: jest.Mock;
let fetchMerkleReference: jest.Mock;
let fetchVTokenToEth: jest.Mock;
let subgraphVaults: any;
let fetchSubgraphVaults: jest.Mock;
let populateVaultPrices: ReturnType<typeof makePopulateVaultPrices>;
let priceVaultBuy: jest.Mock;
let priceVaultSell: jest.Mock;
let priceVaultSwap: jest.Mock;
let fetchVaults: ReturnType<typeof makeFetchVaults>;
let args: Parameters<typeof fetchVaults>[0];
let run: () => ReturnType<typeof fetchVaults>;

beforeEach(() => {
  collection = { slug: 'slug' };
  fetchCollection = jest.fn().mockResolvedValue(collection);
  vaultHoldings = [];
  fetchVaultHoldings = jest.fn().mockResolvedValue(vaultHoldings);
  fetchMerkleReference = jest.fn().mockResolvedValue('merkleRef');
  fetchVTokenToEth = jest.fn().mockResolvedValue(WeiPerEther);
  subgraphVaults = {
    globals: [
      {
        fees: {
          mintFee: parseEther('0.01').toString(),
          redeemFee: parseEther('0.02').toString(),
          swapFee: parseEther('0.03').toString(),
        },
      },
    ],
    vaults: [
      {
        vaultId: '1',
        id: '0x1',
        is1155: false,
        asset: {
          id: '0x1',
          symbol: 'SYMBOL',
          name: 'NAME',
        },
        isFinalized: true,
        totalHoldings: '100',
        totalMints: '1',
        totalRedeems: '1',
        totalFees: '1',
        createdAt: '1',
        shutdownDate: '0',
        usesFactoryFees: false,
        eligibilityModule: null,
        token: {
          id: '0x1',
          symbol: 'SYMBOL',
          name: 'NAME',
        },
        manager: {
          id: '0x1',
        },
        createdBy: {
          id: '0x1',
        },
        holdings: [
          {
            tokenId: '1',
            id: '0x1',
            amount: '1',
            dateAdded: '1',
          },
        ],
        features: {
          enableMint: true,
          enableRedeem: true,
          enableSwap: true,
        },
        fees: {
          mintFee: parseEther('0.02').toString(),
          redeemFee: parseEther('0.03').toString(),
          swapFee: parseEther('0.04').toString(),
        },
      },
    ],
  };
  fetchSubgraphVaults = jest.fn().mockResolvedValue(subgraphVaults);

  const price: MarketplacePrice = {
    type: 'buy',
    price: WeiPerEther,
    vTokenPrice: WeiPerEther,
    feePrice: WeiPerEther,
    premiumPrice: WeiPerEther,
  };
  priceVaultBuy = jest.fn().mockResolvedValue(price);
  priceVaultSell = jest.fn().mockResolvedValue(price);
  priceVaultSwap = jest.fn().mockResolvedValue(price);
  populateVaultPrices = makePopulateVaultPrices({
    priceVaultBuy,
    priceVaultSell,
    priceVaultSwap,
  });
  fetchVaults = makeFetchVaults({
    fetchCollection,
    fetchMerkleReference,
    fetchSubgraphVaults,
    fetchVaultHoldings,
    populateVaultPrices,
    fetchVTokenToEth,
  });
  args = {
    network: 1,
    provider: {} as any,
    enabledOnly: false,
  };
  run = () => fetchVaults(args);
});

it('returns a list of vaults', async () => {
  const vaults = await run();

  expect(vaults).toHaveLength(1);
  expect(vaults[0].id).toBe('0x1');
  expect(vaults[0].vaultId).toBe('1');
});

describe('fees', () => {
  describe('when vault has custom fees set', () => {
    it('sets the vault fees to the custom fees, overriding the global fees', async () => {
      const vaults = await run();

      expect(formatJson(vaults[0].fees)).toEqual({
        mintFee: parseEther('0.02').toString(),
        redeemFee: parseEther('0.03').toString(),
        swapFee: parseEther('0.04').toString(),
      });
    });
  });

  describe('when vault has no fees set', () => {
    beforeEach(() => {
      subgraphVaults.vaults[0].usesFactoryFees = true;
    });

    it('sets the vault fees to the global fees', async () => {
      const vaults = await run();

      expect(formatJson(vaults[0].fees)).toEqual({
        mintFee: parseEther('0.01').toString(),
        redeemFee: parseEther('0.02').toString(),
        swapFee: parseEther('0.03').toString(),
      });
    });
  });
});

describe('when vault is a merkle vault', () => {
  beforeEach(() => {
    subgraphVaults.vaults[0].eligibilityModule = {
      name: 'MerkleEligibilityModule',
    };
  });

  it('fetches the merkle reference for the vault', async () => {
    const vaults = await run();

    expect(fetchMerkleReference).toHaveBeenCalled();
    expect(vaults[0].eligibilityModule.merkleReference).toBe('merkleRef');
  });
});

it('sets the vault TWAP price', async () => {
  const vaults = await run();

  expect(vaults[0].vTokenToEth).toBe(WeiPerEther);
});

describe('state', () => {
  describe('when vault is shutdown', () => {
    beforeEach(() => {
      subgraphVaults.vaults[0].shutdownDate = '1000';
    });

    it('sets the vault state to shutdown and sets the shutdown date to the shutdown date', async () => {
      const vaults = await run();

      expect(vaults[0].state).toBe('shutdown');
      expect(vaults[0].shutdownDate).toBe(1000);
    });
  });

  describe('when vault is not finalized', () => {
    beforeEach(() => {
      subgraphVaults.vaults[0].isFinalized = false;
    });

    it('sets the vault state to unfinalized', async () => {
      const vaults = await run();

      expect(vaults[0].state).toBe('unfinalized');
      expect(vaults[0].isFinalized).toBe(false);
    });
  });

  describe('when vault is finalized', () => {
    it('sets the vault state to active', async () => {
      const vaults = await run();

      expect(vaults[0].state).toBe('active');
    });
  });

  describe('when vault is empty', () => {
    beforeEach(() => {
      subgraphVaults.vaults[0].totalHoldings = '0';
    });

    it('sets the vault state to empty', async () => {
      const vaults = await run();

      expect(vaults[0].state).toBe('empty');
    });
  });
});

it('creates a slug for the vault', async () => {
  const vaults = await run();

  expect(vaults[0].slug).toBe('symbol-1');
});

describe('prices', () => {
  it('calculates the price to mint 1-5 items in the vault', async () => {
    const vaults = await run();
    const mintPrices = vaults[0].prices.map((p) => formatEther(p.mint.price));

    expect(mintPrices).toHaveLength(5);
    expect(mintPrices.every((p) => p === '1')).toBe(true);
  });
  it('calculates the price to redeem 1-5 items in the vault', async () => {
    const vaults = await run();
    const redeemPrices = vaults[0].prices.map((p) =>
      formatEther(p.redeem.price)
    );

    expect(redeemPrices).toHaveLength(5);
    expect(redeemPrices.every((p) => p === '1')).toBe(true);
  });
  it('calculates the price to swap 1-5 items in the vault', async () => {
    const vaults = await run();
    const swapPrices = vaults[0].prices.map((p) => formatEther(p.swap.price));

    expect(swapPrices).toHaveLength(5);
    expect(swapPrices.every((p) => p === '1')).toBe(true);
  });
  describe('when price calculations fail', () => {
    let consoleWarn: any;

    beforeEach(() => {
      priceVaultBuy.mockRejectedValue(new Error('Failed to calculate price'));
      consoleWarn = console.warn;
      console.warn = () => void 0;
    });
    afterEach(() => {
      console.warn = consoleWarn;
    });

    it('defaults the price to 0', async () => {
      const vaults = await run();

      const prices = vaults[0].prices
        .map((p) => p.redeem.price)
        .map((p) => formatEther(p));

      expect(prices).toHaveLength(5);
      expect(prices.every((p) => p === '0')).toBe(true);
    });
  });
});

describe('when enabledOnly is true', () => {
  beforeEach(() => {
    args.enabledOnly = true;
  });

  it('filters out vaults that are not finalised', async () => {
    subgraphVaults.vaults[0].isFinalized = false;
    const vaults = await run();

    expect(vaults).toHaveLength(0);
  });
  it('filters out vaults that cannot be minted or redeemed', async () => {
    subgraphVaults.vaults[0].features.enableMint = false;
    subgraphVaults.vaults[0].features.enableRedeem = false;
    const vaults = await run();

    expect(vaults).toHaveLength(0);
  });
  it('filters out opensea assets that do not have an eligibility module', async () => {
    subgraphVaults.vaults[0].asset.id = OPENSEA_COLLECTION;
    subgraphVaults.vaults[0].eligibilityModule = null;
    const vaults = await run();

    expect(vaults).toHaveLength(0);
  });
});
