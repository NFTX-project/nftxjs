import { PoolRouter } from '@nftx/abi';
import config from '@nftx/config';
import { POOL_ROUTER } from '@nftx/constants';
import { IncreaseLiquidityQuote, Provider, Signer } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const increaseLiquidity = ({
  provider,
  quote: {
    methodParameters: { params, value },
  },
  signer,
  network = config.network,
}: {
  network?: number;
  provider: Provider;
  signer: Signer;
  quote: IncreaseLiquidityQuote;
}) => {
  const contract = getContract({
    address: getChainConstant(POOL_ROUTER, network),
    abi: PoolRouter,
    provider,
    signer,
  });

  console.debug({
    method: 'increaseLiquidity',
    params,
    value,
  });

  return contract.write.increaseLiquidity({
    args: [params],
    value,
  });
};

export default increaseLiquidity;
