import { PoolRouter } from '@nftx/abi';
import config from '@nftx/config';
import { POOL_ROUTER } from '@nftx/constants';
import { CreateLiquidityPositionQuote, Provider, Signer } from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const createLiquidityPosition = ({
  quote: {
    methodParameters: { params, value },
  },
  provider,
  signer,
  network = config.network,
}: {
  quote: Pick<CreateLiquidityPositionQuote, 'methodParameters'>;
  network?: number;
  provider: Provider;
  signer: Signer;
}) => {
  const contract = getContract({
    address: getChainConstant(POOL_ROUTER, network),
    abi: PoolRouter,
    provider,
    signer,
  });

  console.debug({
    method: 'addLiquidity',
    params,
    value,
  });

  return contract.write.addLiquidity({
    args: [params],
    value,
  });
};

export default createLiquidityPosition;
