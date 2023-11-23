import type { Price } from '@nftx/types';
import type { NftxQuote } from './fetchQuote';
import { NFTX_ROUTER, WeiPerEther, Zero } from '@nftx/constants';
import { formatEther } from 'viem';
import { getChainConstant } from '@nftx/utils';
import { getApproveContracts } from '../approve';

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
    approveContracts.push(
      ...getApproveContracts({
        network,
        label: `Approve ${route[0].tokenIn.symbol}`,
        spenderAddress: getChainConstant(NFTX_ROUTER, network),
        tokenAddress: sellToken,
        amount: BigInt(quote.amount),
        standard: 'ERC20',
        usePermit2: true,
      })
    );
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
