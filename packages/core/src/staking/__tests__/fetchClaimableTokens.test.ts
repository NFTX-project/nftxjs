import { AddressZero } from '@ethersproject/constants';
import { parseEther } from '@ethersproject/units';
import type { BigNumber } from '@ethersproject/bignumber';
import fetchClaimableTokens from '../fetchClaimableTokens';
import { getContract as GetContract, toEthersNumber } from '../../web3';
import type { LiquidityPool } from '../../pools';
import { Network } from '@nftx/constants';

let tokens: BigNumber;
let contract: { dividendOf: jest.Mock };
let getContract: typeof GetContract;
let pool: LiquidityPool;
let run: () => ReturnType<ReturnType<typeof fetchClaimableTokens>>;

beforeEach(() => {
  tokens = parseEther('1');
  contract = {
    dividendOf: jest.fn().mockResolvedValue(tokens),
  };
  getContract = jest.fn().mockReturnValue(contract);
  pool = { dividendToken: { id: '0x123' } } as LiquidityPool;
  run = () =>
    fetchClaimableTokens({ getContract })({
      network: Network.Mainnet,
      pool,
      provider: null,
      userAddress: AddressZero,
    });
});

it('returns the amount of claimable tokens due to the user', async () => {
  const tokens = await run();

  expect(toEthersNumber(tokens)).toBe(1);
});

describe('when there is no pool', () => {
  beforeEach(() => {
    pool = null;
  });

  it('returns 0', async () => {
    const tokens = await run();

    expect(toEthersNumber(tokens)).toBe(0);
  });
});
