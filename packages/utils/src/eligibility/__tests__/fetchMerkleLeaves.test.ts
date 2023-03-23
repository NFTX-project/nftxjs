import makeFetchMerkleLeaves from '../fetchMerkleLeaves';

let fetchMerkleLeaves: ReturnType<typeof makeFetchMerkleLeaves>;
let run: () => ReturnType<typeof fetchMerkleLeaves>;
let vault: Parameters<typeof fetchMerkleLeaves>[0]['vault'];
let provider: any;
let getContract: jest.Mock;
let contract: {
  read: {
    merkleLeavesURI: jest.Mock;
  };
};
let fetch: jest.Mock;

beforeEach(() => {
  vault = {
    eligibilityModule: {
      id: '0x1234',
      merkleReference: 'example-merkle-ref',
    },
  };
  provider = {};
  contract = {
    read: {
      merkleLeavesURI: jest.fn().mockResolvedValue('http://example.com'),
    },
  };
  getContract = jest.fn().mockReturnValue(contract);
  fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(['1', '2', '3']),
  });

  fetchMerkleLeaves = makeFetchMerkleLeaves({ getContract, fetch });
  run = () => fetchMerkleLeaves({ provider, vault });
});

it('returns a list of merkle leaves for a vault', async () => {
  const result = await run();

  expect(result).toEqual(['1', '2', '3']);
});
it('fetches merkle leaves from the uri returned from the merkle leaves uri contract method', async () => {
  await run();

  expect(getContract.mock.calls[0][0].address).toBe(
    vault.eligibilityModule?.id
  );
  expect(contract.read.merkleLeavesURI).toBeCalled();
  expect(fetch).toBeCalled();
  expect(fetch).toBeCalledWith('http://example.com');
});

describe("when the vault's eligibility module has no merkle reference", () => {
  beforeEach(() => {
    if (vault.eligibilityModule) {
      vault.eligibilityModule.merkleReference = null as any;
    }
  });

  it('returns an empty list', async () => {
    const result = await run();

    expect(result).toEqual([]);
  });
  it('does not call any contract methods', async () => {
    await run();

    expect(getContract).not.toBeCalled();
    expect(contract.read.merkleLeavesURI).not.toBeCalled();
    expect(fetch).not.toBeCalled();
  });
});

describe('when the vault has no eligibility module', () => {
  beforeEach(() => {
    vault.eligibilityModule = null as any;
  });

  it('returns an empty list', async () => {
    const result = await run();

    expect(result).toEqual([]);
  });
  it('does not call any contract methods', async () => {
    await run();

    expect(getContract).not.toBeCalled();
    expect(contract.read.merkleLeavesURI).not.toBeCalled();
    expect(fetch).not.toBeCalled();
  });
});
