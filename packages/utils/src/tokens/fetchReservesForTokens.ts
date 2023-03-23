import { WeiPerEther, WETH_TOKEN, Zero } from '@nftx/constants';
import { addressEqual, getChainConstant } from '../web3';
import { gql, querySubgraph } from '@nftx/subgraph';
import { compareByAlpha, toLowerCase } from '../utils';
import config from '@nftx/config';
import type { Address, BigIntString, TokenReserve } from '@nftx/types';
import { parseEther } from 'viem';

function midQuote(amountA: bigint, reserveA: bigint, reserveB: bigint) {
  if (amountA <= Zero) {
    return Zero;
  }
  if (reserveA <= Zero || reserveB <= Zero) {
    return Zero;
  }

  const amountB = (amountA * reserveB) / reserveA;

  return amountB;
}

const calcMidPrice = (reserveVtoken: bigint, reserveWeth: bigint) => {
  if (reserveVtoken && reserveWeth) {
    return midQuote(WeiPerEther, reserveVtoken, reserveWeth);
  }

  return Zero;
};

const LIMIT = 1000;

type TokenPair = {
  id?: string;
  derivedETH: string;
  basePairs: {
    id: string;
    reserve0: BigIntString;
    reserve1: BigIntString;
    token0: {
      id: Address;
    };
    token1: {
      id: Address;
    };
  }[];
  quotePairs: {
    id: string;
    reserve0: BigIntString;
    reserve1: BigIntString;
    token0: {
      id: Address;
    };
    token1: {
      id: Address;
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
      const reserveVtoken = parseEther(
        (wethPair.reserve0 as BigIntString) || '0'
      );
      const reserveWeth = parseEther(
        (wethPair.reserve1 as BigIntString) || '0'
      );
      const midPrice = calcMidPrice(reserveVtoken, reserveWeth);

      return {
        tokenId: token.id as Address,
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
        tokenId: token.id as Address,
        derivedEth: token.derivedETH || '0',
        reserveVtoken,
        reserveWeth,
        midPrice,
      };
    }
  }

  return {
    tokenId: token?.id as Address,
    derivedEth: token?.derivedETH,
    reserveVtoken: null as any,
    reserveWeth: null as any,
    midPrice: Zero,
  };
}

/**
 * Fetch token/weth reserves for the given addresses
 * The reserves are pulled from the Sushi subgraph
 * @returns Promise<{@link @nftx/types!TokenReserve}[]>
 */
const fetchReservesForTokens = async (args: {
  network?: number;
  tokenAddresses?: Address[];
}) => {
  const { network = config.network, tokenAddresses } = args;
  const query = gql<Response>`{
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
  const response = await querySubgraph({
    url: getChainConstant(config.subgraph.SUSHI_SUBGRAPH, network),
    query,
    variables: {
      tokenAddresses: (tokenAddresses ?? [])
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
