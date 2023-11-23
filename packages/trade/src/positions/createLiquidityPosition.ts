import { PoolRouter } from '@nftx/abi';
import config from '@nftx/config';
import { POOL_ROUTER } from '@nftx/constants';
import {
  CreateLiquidityPositionQuote,
  Permit2Quote,
  Provider,
  Signer,
} from '@nftx/types';
import { getChainConstant, getContract } from '@nftx/utils';

const createLiquidityPosition = ({
  quote: {
    methodParameters: { params, value, usePermit2 },
  },
  provider,
  signer,
  network = config.network,
  permit2,
}: {
  quote: Pick<CreateLiquidityPositionQuote, 'methodParameters'>;
  network?: number;
  provider: Provider;
  signer: Signer;
  permit2?: Permit2Quote;
}) => {
  const address = getChainConstant(POOL_ROUTER, network);

  const contract = getContract({
    address: address,
    abi: PoolRouter,
    provider,
    signer,
  });

  if (permit2 && usePermit2) {
    return contract.write.addLiquidityWithPermit2({
      args: [params, permit2.permit2encoded],
      value,
    });
  }

  return contract.write.addLiquidity({
    args: [params],
    value,
  });
};

export default createLiquidityPosition;
