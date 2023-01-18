import type {
  Address,
  TokenReserve,
  UserVaultBalance,
  Vault,
} from '@nftx/types';
import { formatEther, parseEther } from 'viem';
import type { LiquidityPool } from '../../pools';
import makeFetchPositon from '../fetchPosition';

let fetchClaimableTokens: jest.Mock;
let fetchPool: jest.Mock;
let fetchTotalSupply: jest.Mock;
let fetchUserVaultBalance: jest.Mock;
let fetchVault: jest.Mock;
let fetchVaultAprs: jest.Mock;
let fetchXTokenShare: jest.Mock;
let fetchReservesForToken: jest.Mock;
let liquidityPool: {
  stakingToken: {
    id: LiquidityPool['stakingToken']['id'];
  };
  dividendToken: {
    id: LiquidityPool['dividendToken']['id'];
  };
};
let userVaultBalances: UserVaultBalance[];
let balanceOf: jest.Mock;
let fetchVaultFees: jest.Mock;
let vault: {
  id: Vault['id'];
  vaultId: Vault['vaultId'];
  inventoryStakingPool?: {
    id: Vault['inventoryStakingPool']['id'];
  };
  createdAt: Vault['createdAt'];
};
let reserves: TokenReserve;
let userAddress: Address;
let provider: any;
let fetchPosition: ReturnType<typeof makeFetchPositon>;
let run: () => ReturnType<typeof fetchPosition>;

beforeEach(() => {
  provider = {};
  userAddress = '0x00';
  vault = {
    createdAt: new Date('2022-01-01').getTime() / 1000,
    id: '0x01',
    vaultId: '999',
    inventoryStakingPool: {
      id: '0x02',
    },
  };
  liquidityPool = {
    dividendToken: {
      id: '0x03',
    },
    stakingToken: {
      id: '0x04',
    },
  };
  reserves = {
    derivedEth: '',
    midPrice: parseEther('0.01'),
    reserveVtoken: parseEther('10'),
    reserveWeth: parseEther('10'),
    tokenId: vault.id,
  };
  userVaultBalances = [
    {
      type: 'xToken' as any,
      address: '0x',
      name: '',
      symbol: '',
      vaultId: vault.vaultId,
      balance: parseEther('1'),
    },
    {
      type: 'xTokenWETH' as any,
      address: '0x',
      name: '',
      symbol: '',
      vaultId: vault.vaultId,
      balance: parseEther('1'),
    },
  ];

  // The Staking Contract's LP balance (amount of staked lp in the pool)
  balanceOf = jest.fn().mockResolvedValue(parseEther('10'));
  // Amount of vToken the user can claim
  fetchClaimableTokens = jest.fn().mockResolvedValue(parseEther('0.1'));
  fetchPool = jest.fn().mockResolvedValue(liquidityPool);
  fetchReservesForToken = jest.fn().mockResolvedValue(reserves);
  fetchTotalSupply = jest.fn(
    async ({ tokenAddress }: { tokenAddress: string }) => {
      switch (tokenAddress) {
        // Total LP in the pool (for this test we're just saying that 100% of the LP in the pool is staked)
        case liquidityPool.stakingToken.id:
          return parseEther('10');
        // The total amount of IP in the pool
        case vault.inventoryStakingPool?.id:
          return parseEther('5');
        // xSlpSupply
        case liquidityPool.dividendToken.id:
          return parseEther('10');
      }
    }
  );
  fetchUserVaultBalance = jest.fn().mockResolvedValue(userVaultBalances);
  fetchVault = jest.fn().mockResolvedValue(vault);
  fetchVaultAprs = jest.fn().mockResolvedValue([
    {
      vaultAddress: vault.id,
      inventoryApr: 0.2,
      liquidityApr: 0.8,
    },
  ]);
  fetchVaultFees = jest.fn().mockResolvedValue([
    {
      amount: parseEther('0.001'),
    },
  ]);
  fetchXTokenShare = jest.fn().mockResolvedValue(parseEther('1'));

  fetchPosition = makeFetchPositon({
    balanceOf,
    fetchClaimableTokens,
    fetchPool,
    fetchReservesForToken,
    fetchTotalSupply,
    fetchUserVaultBalance,
    fetchVault,
    fetchVaultAprs,
    fetchVaultFees,
    fetchXTokenShare,
  });
  run = () =>
    fetchPosition({
      provider,
      userAddress,
      vaultAddress: vault.id,
    });
});

it('returns a single position for a user/vault', async () => {
  const position = await run();

  expect(formatEther(position.claimableAmount)).toBe('0.1');
  expect(formatEther(position.claimableValue)).toBe('0.1');
  expect(position.inventoryApr).toBe(0.2);
  expect(formatEther(position.inventoryShare)).toBe('0.2');
  expect(position.inventorySplit).toBe(1 / 3);
  expect(formatEther(position.inventoryTokens)).toBe('1');
  expect(formatEther(position.inventoryValue)).toBe('0.01');
  expect(position.liquidityApr).toBe(0.8);
  expect(formatEther(position.liquidityEth)).toBe('1');
  expect(formatEther(position.liquidityShare)).toBe('0.1');
  expect(position.liquiditySplit).toBe(1 - 1 / 3);
  expect(formatEther(position.liquidityTokens)).toBe('1');
  expect(formatEther(position.liquidityValue)).toBe('2');
});
