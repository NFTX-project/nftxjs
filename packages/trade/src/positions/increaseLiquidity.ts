import { PoolRouter } from '@nftx/abi';
import config from '@nftx/config';
import { POOL_ROUTER } from '@nftx/constants';
import {
  IncreaseLiquidityQuote,
  Permit2Quote,
  Provider,
  Signer,
} from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const increaseLiquidity = ({
  provider,
  quote: {
    methodParameters: { params, value, usePermit2 },
  },
  signer,
  network = config.network,
  permit2,
}: {
  network?: number;
  provider: Provider;
  signer: Signer;
  quote: IncreaseLiquidityQuote;
  permit2?: Permit2Quote;
}) => {
  const contract = getContract({
    address: getChainConstant(POOL_ROUTER, network),
    abi: PoolRouter,
    provider,
    signer,
  });

  if (permit2 && usePermit2) {
    return contract.write.increaseLiquidityWithPermit2({
      args: [params, permit2.permit2encoded],
      value,
    });
  }

  return contract.write.increaseLiquidity({
    args: [params],
    value,
  });
};

export default increaseLiquidity;
