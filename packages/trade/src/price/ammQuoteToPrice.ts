import type { ApproveContract, MarketplaceQuote } from '@nftx/types';
import { NFTX_ROUTER, WeiPerEther, Zero } from '@nftx/constants';
import { formatEther } from 'viem';
import { getChainConstant } from '@nftx/utils';
import { getApproveContracts } from '../approve';
import { NftxQuote } from './types';

const ammQuoteToPrice = (quote: NftxQuote) => {
  const { network, sellToken } = quote;
  const isEth = `${sellToken}` === 'ETH';

  const totalAmountIn = quote.route.reduce((total, r) => {
    return total + BigInt(r[0].amountIn);
  }, Zero);

  const route: MarketplaceQuote['route'] = quote.route.map((route) => {
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

  const approveContracts: ApproveContract[] = [];

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

  let methodParameters =
    undefined as any as MarketplaceQuote['methodParameters'];

  if (quote.methodParameters) {
    methodParameters = {
      amountsIn: [],
      amountsOut: [],
      premiumLimit: '',
      standard: 'ERC20',
      tokenIdsIn: [],
      tokenIdsOut: [],
      vaultAddress: '0x',
      vaultId: '',
      executeCalldata: quote.methodParameters.calldata,
      to: quote.methodParameters.to,
      value: quote.methodParameters.value,
    };
  }

  const price: MarketplaceQuote = {
    approveContracts,
    estimatedGas: BigInt(quote.gasUseEstimate),
    feePrice: Zero,
    items: [],
    premiumPrice: Zero,
    price: BigInt(quote.quote),
    route,
    type: 'erc20',
    vTokenPrice: BigInt(quote.quote),
    routeString: quote.routeString,
    methodParameters: methodParameters,
  };

  return price;
};

export default ammQuoteToPrice;
