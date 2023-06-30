import { makeCheckEligible } from '../checkEligible';
import type { getContract as _getContract } from '../../web3';
import type { TokenId } from '@nftx/types';

type GetContract = typeof _getContract;

let checkEligible: ReturnType<typeof makeCheckEligible>;
let run: () => ReturnType<typeof checkEligible>;
let vault: Parameters<typeof checkEligible>[0]['vault'];
let provider: any;
let tokenIds: TokenId[];
let getContract: GetContract;
let contract: {
  read: {
    checkEligible: jest.Mock;
  };
};

beforeEach(() => {
  vault = {
    eligibilityModule: {
      eligibleIds: [],
      eligibleRange: ['0', '9999'],
      id: '0x1234',
      merkleReference: '',
      name: 'module',
    },
  };
  provider = {} as any;
  tokenIds = ['1', '2', '3'];
  contract = {
    read: {
      checkEligible: jest.fn(async () => tokenIds.map((_, i) => !!(i % 2))),
    },
  };
  getContract = jest.fn().mockReturnValue(contract);

  checkEligible = makeCheckEligible({ getContract });
  run = () => checkEligible({ provider, tokenIds, vault });
});

it('returns whether a set of tokens are eligible for minting into a vault', async () => {
  const result = await run();

  expect(result).toEqual([
    { tokenId: '1', eligible: false },
    { tokenId: '2', eligible: true },
    { tokenId: '3', eligible: false },
  ]);
});

it('calls the eligibility contract method', async () => {
  await run();

  expect(contract.read.checkEligible).toBeCalled();
  expect(contract.read.checkEligible).toBeCalledWith({ args: [[1n, 2n, 3n]] });
});

describe('when the vault does not have an eligibility module', () => {
  beforeEach(() => {
    vault.eligibilityModule = null as any;
  });

  it('returns true for all tokens', async () => {
    const result = await run();

    expect(result).toEqual([
      { tokenId: '1', eligible: true },
      { tokenId: '2', eligible: true },
      { tokenId: '3', eligible: true },
    ]);
  });
});
