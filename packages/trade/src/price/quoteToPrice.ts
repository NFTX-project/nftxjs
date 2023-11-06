import type { Price } from '@nftx/types';
import type { NftxQuote } from './fetchQuote';
import {
  MaxUint256,
  NFTX_ROUTER,
  PERMIT2,
  WeiPerEther,
  Zero,
} from '@nftx/constants';
import { formatEther } from 'viem';
import { getChainConstant } from '@nftx/utils';

const nftxQuoteToPrice = (quote: NftxQuote) => {
  const { network, sellToken } = quote;
  const isEth = `${sellToken}` === 'ETH';

  const totalAmountIn = quote.route.reduce((total, r) => {
    return total + BigInt(r[0].amountIn);
  }, Zero);

  const route: Price['route'] = quote.route.map((route) => {
    const type = route[0].type;
    const amountIn = BigInt(route[0].amountIn);
    const amountOut = BigInt(route[route.length - 1].amountOut);
    const proportion = formatEther((amountIn * WeiPerEther) / totalAmountIn);

    return {
      type,
      amountIn,
      amountOut,
      proportion,
      tokenIn: {
        id: route[0].tokenIn.address,
        name: '',
        symbol: route[0].tokenIn.symbol,
      },
      tokenOut: {
        id: route[route.length - 1].tokenOut.address,
        name: '',
        symbol: route[route.length - 1].tokenOut.symbol,
      },
      path: route.map((r) => ({
        tokenIn: { id: r.tokenIn.address, name: '', symbol: r.tokenIn.symbol },
        tokenOut: {
          id: r.tokenOut.address,
          name: '',
          symbol: r.tokenOut.symbol,
        },
        amount: BigInt(r.amountIn || r.amountOut || '0'),
      })),
    };
  });

  const approveContracts: Price['approveContracts'] = [];

  // If you're paying ETH we don't need any approvals
  if (!isEth) {
    // First you need to approve permit2 to spend your token on your behalf
    approveContracts.push({
      type: 'on-chain',
      spenderAddress: getChainConstant(PERMIT2, network),
      tokenAddress: sellToken,
      standard: 'ERC20',
      amount: MaxUint256,
    });

    // Next you need to approve the transaction itself via permit2
    approveContracts.push({
      type: 'permit2',
      tokenAddress: sellToken,
      spenderAddress: getChainConstant(NFTX_ROUTER, network),
      amount: BigInt(quote.amount),
    });
  }

  const price: Price = {
    price: BigInt(quote.quote),
    estimatedGas: BigInt(quote.gasUseEstimate),
    gasPrice: BigInt(quote.gasPriceWei),
    methodParameters: {
      ...quote.methodParameters,
    },
    approveContracts,
    route,
    routeString: quote.routeString,
  };

  return price;
};

export default nftxQuoteToPrice;
