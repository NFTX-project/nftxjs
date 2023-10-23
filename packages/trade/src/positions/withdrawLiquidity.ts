import { PoolRouter } from '@nftx/abi';
import config from '@nftx/config';
import { POOL_ROUTER } from '@nftx/constants';
import { Provider, Signer, WithdrawLiquidityQuote } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const withdrawLiquidity = ({
  network = config.network,
  provider,
  quote: {
    methodParameters: { params, value },
  },
  signer,
}: {
  network?: number;
  quote: Pick<WithdrawLiquidityQuote, 'methodParameters'>;
  provider: Provider;
  signer: Signer;
}) => {
  const contract = getContract({
    abi: PoolRouter,
    address: getChainConstant(POOL_ROUTER, network),
    provider,
    signer,
  });

  console.debug({
    method: 'removeLiquidity',
    params,
    value,
  });

  return contract.write.removeLiquidity({
    args: [params],
    value,
  });
};

export default withdrawLiquidity;
