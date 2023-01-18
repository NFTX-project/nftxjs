import type { Address } from '@nftx/types';
import { parseEther } from 'viem';
import makeFetchUserVaultBalance from '../fetchUserVaultBalance';

const AddressZero = '0x00';

let vaultId: string;
let userAddress: Address;
let response: any;
let fetchUserVaultBalances: jest.Mock;
let balanceOf: jest.Mock;
let fetchUserVaultBalance: ReturnType<typeof makeFetchUserVaultBalance>;
let provider: any;
let run: () => ReturnType<typeof fetchUserVaultBalance>;

beforeEach(() => {
  provider = null;
  vaultId = '0';
  userAddress = '0x001';
  response = {
    slp: [
      {
        type: 'vTokenWETH',
        vaultId,
        address: AddressZero,
      },
    ],
    xSlp: [
      {
        type: 'xTokenWETH',
        vaultId,
        address: AddressZero,
      },
    ],
    vTokens: [
      {
        type: 'vToken',
        vaultId,
        address: AddressZero,
      },
    ],
    xTokens: [
      {
        type: 'xToken',
        vaultId,
        address: AddressZero,
      },
    ],
  };
  fetchUserVaultBalances = jest.fn().mockResolvedValue(response);
  balanceOf = jest.fn().mockResolvedValue(parseEther('1'));
  fetchUserVaultBalance = makeFetchUserVaultBalance({
    balanceOf,
    fetchUserVaultBalances,
  });
  run = () =>
    fetchUserVaultBalance({ network: 1, provider, userAddress, vaultId });
});

it("returns a list of a user's balances for a specific vault", async () => {
  const result = await run();

  expect(result).toHaveLength(4);
});

it('gets the on-chain amount (rather than relying on the subgraph value)', async () => {
  await run();

  expect(balanceOf).toHaveBeenCalledTimes(4);
});

describe('when there are no tokens found', () => {
  beforeEach(() => {
    response.slp = [];
    response.xSlp = [];
    response.vTokens = [];
    response.xTokens = [];
  });

  it('returns an empty array', async () => {
    const result = await run();

    expect(result).toHaveLength(0);
  });
});
