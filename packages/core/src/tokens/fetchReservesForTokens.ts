import { parseEther } from '@ethersproject/units';
import { SUSHI_SUBGRAPH, WETH_TOKEN } from '@nftx/constants';
import { addressEqual, getChainConstant } from '../web3';
import { gql, querySubgraph } from '@nftx/subgraph';
import type { Address } from '../web3/types';
import type { TokenReserve } from './types';
import type { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
import { compareByAlpha, toLowerCase } from '../utils';

function midQuote(
  amountA: BigNumber,
  reserveA: BigNumber,
  reserveB: BigNumber
) {
  if (!amountA.gt(0)) {
    return Zero;
  }
  if (!reserveA.gt(0) || !reserveB.gt(0)) {
    return Zero;
  }

  const amountB = amountA.mul(reserveB).div(reserveA);

  return amountB;
}

const calcMidPrice = (reserveVtoken: BigNumber, reserveWeth: BigNumber) => {
  if (reserveVtoken && reserveWeth) {
    return midQuote(WeiPerEther, reserveVtoken, reserveWeth);
  }

  return Zero;
};

const LIMIT = 1000;

type TokenPair = {
  id?: Address;
  derivedETH: string;
  basePairs: {
    id: string;
    reserve0: string;
    reserve1: string;
    token0: {
      id: string;
    };
    token1: {
      id: string;
    };
  }[];
  quotePairs: {
    id: string;
    reserve0: string;
    reserve1: string;
    token0: {
      id: string;
    };
    token1: {
      id: string;
    };
  }[];
};

type Response = {
  tokens: TokenPair[];
};

function formatTokenReserves(token: TokenPair, network: number): TokenReserve {
  const weth = getChainConstant(WETH_TOKEN, network).toLowerCase();
  // check to see if basePair is vtoken
  // PUNK-ETH
  if (token?.basePairs?.length) {
    const wethPair = token.basePairs.find((p) =>
      addressEqual(p.token1.id, weth)
    );

    if (wethPair) {
      const reserveVtoken = parseEther(wethPair.reserve0 || '0');
      const reserveWeth = parseEther(wethPair.reserve1 || '0');
      const midPrice = calcMidPrice(reserveVtoken, reserveWeth);

      return {
        tokenId: token.id,
        derivedEth: token.derivedETH || '0',
        reserveVtoken,
        reserveWeth,
        midPrice,
      };
    }
  }

  // check to see if it's the quote pair
  // ETH-PUNK
  if (token?.quotePairs?.length) {
    const wethPair = token.quotePairs.find((p) =>
      addressEqual(p.token0.id, weth)
    );

    if (wethPair) {
      const reserveVtoken = parseEther(wethPair.reserve1 || '0');
      const reserveWeth = parseEther(wethPair.reserve0 || '0');
      const midPrice = calcMidPrice(reserveVtoken, reserveWeth);

      return {
        tokenId: token.id,
        derivedEth: token.derivedETH || '0',
        reserveVtoken,
        reserveWeth,
        midPrice,
      };
    }
  }

  return {
    tokenId: token?.id,
    derivedEth: token?.derivedETH,
    reserveVtoken: null,
    reserveWeth: null,
    midPrice: Zero,
  };
}

/** Fetch token/weth reserves for the given addresses */
const fetchReservesForTokens = async ({
  network,
  tokenAddresses,
}: {
  network: number;
  tokenAddresses?: Address[];
}) => {
  const query = gql`{
    tokens(
      first: ${LIMIT},
      where: {
        id_in: $tokenAddresses
      }
    ) {
      id
      derivedETH
      quotePairs {
        id
        token0 {
          id
        }
        reserve0
        token1 {
          id
        }
        reserve1
      }
      basePairs {
        id
        token0 {
          id
        }
        reserve0
        token1 {
          id
        }
        reserve1
      }
    }
  }`;
  const response = await querySubgraph<Response>({
    url: getChainConstant(SUSHI_SUBGRAPH, network),
    query,
    variables: {
      tokenAddresses: tokenAddresses
        .map(toLowerCase)
        .sort((a, b) => compareByAlpha(a, b)),
    },
  });

  const reserves =
    response?.tokens?.map(
      (token): TokenReserve => formatTokenReserves(token, network)
    ) ?? [];

  // TODO: handle cases where more than 1000 tokens are found

  return reserves;
};

export default fetchReservesForTokens;
