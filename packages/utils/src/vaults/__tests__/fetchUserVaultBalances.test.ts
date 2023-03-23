import type { NftxTokenType } from '@nftx/types';
import { parseEther } from 'viem';
import makeFetchUserVaultBalances, {
  type Response,
} from '../fetchUserVaultBalances';

const AddressZero = '0x00';

let userAddress: string;
let response: Response;
let querySubgraph: jest.Mock;
let fetchUserVaultBalances: ReturnType<typeof makeFetchUserVaultBalances>;
let run: () => ReturnType<typeof fetchUserVaultBalances>;

beforeEach(() => {
  const one = parseEther('1').toString() as `${number}`;

  response = {
    account: {
      ERC20balances: [
        {
          contract: {
            asVaultAsset: {
              type: 'vToken' as NftxTokenType,
              vaultId: '0',
            },
            id: AddressZero,
            name: 'vToken',
            symbol: 'vToken',
          },
          valueExact: one,
        },
        {
          contract: {
            asVaultAsset: {
              type: 'vTokenWETH' as NftxTokenType,
              vaultId: '0',
            },
            id: AddressZero,
            name: 'vTokenWeth',
            symbol: 'vTokenWETH',
          },
          valueExact: one,
        },
        {
          contract: {
            asVaultAsset: {
              type: 'xToken' as NftxTokenType,
              vaultId: '0',
            },
            id: AddressZero,
            name: 'xToken',
            symbol: 'xToken',
          },
          valueExact: one,
        },
        {
          contract: {
            asVaultAsset: {
              type: 'xTokenWETH' as NftxTokenType,
              vaultId: '0',
            },
            id: AddressZero,
            name: 'xTokenWeth',
            symbol: 'xTokenWETH',
          },
          valueExact: one,
        },
      ],
    },
  };
  querySubgraph = jest.fn().mockResolvedValue(response);
  fetchUserVaultBalances = makeFetchUserVaultBalances({ querySubgraph });
  userAddress = '0x001';

  run = () => fetchUserVaultBalances({ network: 1, userAddress });
});

it('fetches balances from the token balance subgraph', async () => {
  await run();

  expect(querySubgraph).toHaveBeenCalled();
});

it('returns the balances grouped by type', async () => {
  const result = await run();

  expect(result).toEqual({
    slp: [
      {
        address: AddressZero,
        balance: parseEther('1'),
        name: 'vTokenWeth',
        symbol: 'vTokenWETH',
        type: 'vTokenWETH',
        vaultId: '0',
      },
    ],
    vTokens: [
      {
        address: AddressZero,
        balance: parseEther('1'),
        name: 'vToken',
        symbol: 'vToken',
        type: 'vToken',
        vaultId: '0',
      },
    ],
    xSlp: [
      {
        address: AddressZero,
        balance: parseEther('1'),
        name: 'xTokenWeth',
        symbol: 'xTokenWETH',
        type: 'xTokenWETH',
        vaultId: '0',
      },
    ],
    xTokens: [
      {
        address: AddressZero,
        balance: parseEther('1'),
        name: 'xToken',
        symbol: 'xToken',
        type: 'xToken',
        vaultId: '0',
      },
    ],
  });
});

describe('if the value is 0', () => {
  beforeEach(() => {
    response.account.ERC20balances[0].valueExact = '0';
  });

  it('excludes it from the response', async () => {
    const { vTokens, slp, xSlp, xTokens } = await run();

    expect(vTokens).toHaveLength(0);
    expect(slp).toHaveLength(1);
    expect(xSlp).toHaveLength(1);
    expect(xTokens).toHaveLength(1);
  });
});

describe('when response fails or is empty', () => {
  beforeEach(() => {
    response.account = null as any;
  });

  it('returns empty groups', async () => {
    const response = await run();

    expect(response).toEqual({
      vTokens: [],
      xTokens: [],
      slp: [],
      xSlp: [],
    });
  });
});
