import type { Price } from '@nftx/types';
import type { NftxQuote } from './fetchNftxQuote';
import { WeiPerEther, Zero } from '@nftx/constants';
import { formatEther } from 'viem';

const nftxQuoteToPrice = (quote: NftxQuote) => {
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

  const price: Price = {
    price: BigInt(quote.quote),
    estimatedGas: BigInt(quote.gasUseEstimate),
    gasPrice: BigInt(quote.gasPriceWei),
    route,
  };

  return price;
};

export default nftxQuoteToPrice;
