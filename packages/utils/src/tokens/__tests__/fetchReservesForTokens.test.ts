import { WETH_TOKEN, Zero } from '@nftx/constants';
import { parseEther } from 'viem';
import makeFetchReservesFortokens, {
  Response,
} from '../fetchReservesForTokens';

let response: Response;
let querySubgraph: jest.Mock;
let fetchReservesForTokens: ReturnType<typeof makeFetchReservesFortokens>;
let run: () => ReturnType<typeof fetchReservesForTokens>;

beforeEach(() => {
  response = {
    tokens: [
      {
        id: '',
        derivedETH: '',
        basePairs: [],
        quotePairs: [],
      },
    ],
  };
  querySubgraph = jest.fn().mockResolvedValue(response);
  fetchReservesForTokens = makeFetchReservesFortokens({ querySubgraph });
  run = () => fetchReservesForTokens({ network: 1, tokenAddresses: ['0x'] });
});

it('fetches reserves for a group of tokens', async () => {
  const [result] = await run();

  expect(result).toHaveProperty('tokenId');
  expect(result).toHaveProperty('derivedEth');
  expect(result).toHaveProperty('reserveVtoken');
  expect(result).toHaveProperty('reserveWeth');
});

it('fetches the reserves from the sushi subgraph', async () => {
  await run();

  expect(querySubgraph).toBeCalled();
});

describe('when reserves are TOKEN-ETH', () => {
  beforeEach(() => {
    response.tokens[0].basePairs[0] = {
      id: 'TOKEN-ETH',
      reserve0: '10',
      reserve1: '1',
      token0: { id: '0xTOKEN' },
      token1: { id: WETH_TOKEN[1] },
    };
  });

  it('allocates the reserve pair', async () => {
    const [result] = await run();

    expect(`${result.reserveVtoken}`).toBe(parseEther('10').toString());
    expect(`${result.reserveWeth}`).toBe(parseEther('1').toString());
    expect(`${result.midPrice}`).toBe(parseEther('0.1').toString());
  });
});

describe('when reserves are WETH-TOKEN', () => {
  beforeEach(() => {
    response.tokens[0].quotePairs[0] = {
      id: 'ETH-TOKEN',
      reserve0: '1',
      reserve1: '10',
      token0: { id: WETH_TOKEN[1] },
      token1: { id: '0xTOKEN' },
    };
  });

  it('allocates teh reserve pair', async () => {
    const [result] = await run();

    expect(`${result.reserveVtoken}`).toBe(parseEther('10').toString());
    expect(`${result.reserveWeth}`).toBe(parseEther('1').toString());
    expect(`${result.midPrice}`).toBe(parseEther('0.1').toString());
  });
});

describe('when there are no reserves', () => {
  it('returns an empty reserve', async () => {
    const [result] = await run();

    expect(result.reserveVtoken).toBe(null);
    expect(result.reserveWeth).toBe(null);
    expect(result.midPrice).toEqual(Zero);
  });
});
