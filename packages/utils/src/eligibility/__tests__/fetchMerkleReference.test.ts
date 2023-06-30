import { makeFetchMerkleReference } from '../fetchMerkleReference';

let fetchMerkleReference: ReturnType<typeof makeFetchMerkleReference>;
let run: () => ReturnType<typeof fetchMerkleReference>;
let provider: any;
let vault: Parameters<typeof fetchMerkleReference>[0]['vault'];
let getContract: jest.Mock;
let contract: {
  read: {
    merkleReference: jest.Mock;
  };
};

beforeEach(() => {
  provider = {};
  vault = { eligibilityModule: { id: '0x1234', name: 'MerkleEligibilityFoo' } };
  getContract = jest.fn().mockReturnValue(contract);
  contract = {
    read: {
      merkleReference: jest.fn().mockResolvedValue('merkle-reference'),
    },
  };
  getContract = jest.fn().mockReturnValue(contract);

  fetchMerkleReference = makeFetchMerkleReference({ getContract });
  run = () => fetchMerkleReference({ provider, vault });
});

it('fetches the merkle reference for a vault', async () => {
  const result = await run();

  expect(result).toBe('merkle-reference');
});

describe('when not an eligibility module', () => {
  beforeEach(() => {
    vault.eligibilityModule = null as any;
  });

  it('returns null', async () => {
    const result = await run();

    expect(result).toBe(null);
  });
});

describe('when not a merkle vault', () => {
  beforeEach(() => {
    if (vault.eligibilityModule) {
      vault.eligibilityModule.name = 'Foo';
    }
  });

  it('returns null', async () => {
    const result = await run();

    expect(result).toBe(null);
  });
});
